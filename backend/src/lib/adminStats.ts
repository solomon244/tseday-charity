import { connectDB, isDbConfigured } from "@/lib/db/connect";
import { ContactMessageModel } from "@/lib/db/models/ContactMessage";
import { DonationModel } from "@/lib/db/models/Donation";
import { NewsletterSubscriptionModel } from "@/lib/db/models/NewsletterSubscription";
import { VolunteerApplicationModel } from "@/lib/db/models/VolunteerApplication";
import { readApplications } from "@/lib/volunteerStore";

export async function getAdminStats() {
  const volunteers = await readApplications();
  const volunteerByStatus = volunteers.reduce<Record<string, number>>((acc, v) => {
    acc[v.status] = (acc[v.status] ?? 0) + 1;
    return acc;
  }, {});

  if (!isDbConfigured()) {
    return {
      volunteers: { total: volunteers.length, byStatus: volunteerByStatus },
      contacts: { total: 0, new: 0 },
      donations: { total: 0, recorded: 0, completed: 0, amountTotal: 0 },
      newsletter: { total: 0 },
    };
  }

  await connectDB();

  const [contactTotal, contactNew, donationStats, newsletterTotal] = await Promise.all([
    ContactMessageModel.countDocuments(),
    ContactMessageModel.countDocuments({ status: "new" }),
    DonationModel.aggregate<{ total: number; amount: number; recorded: number; completed: number }>([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          amount: { $sum: "$amount" },
          recorded: { $sum: { $cond: [{ $eq: ["$status", "recorded"] }, 1, 0] } },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        },
      },
    ]),
    NewsletterSubscriptionModel.countDocuments(),
  ]);

  const d = donationStats[0] ?? { total: 0, amount: 0, recorded: 0, completed: 0 };

  return {
    volunteers: { total: volunteers.length, byStatus: volunteerByStatus },
    contacts: { total: contactTotal, new: contactNew },
    donations: {
      total: d.total,
      recorded: d.recorded,
      completed: d.completed,
      amountTotal: d.amount,
    },
    newsletter: { total: newsletterTotal },
  };
}
