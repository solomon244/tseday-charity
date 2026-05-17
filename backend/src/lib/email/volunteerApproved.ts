import { ORGANIZATION } from "@/config";
import { isEmailConfigured, sendMail, siteBaseUrl } from "@/lib/email/mailer";
import type { VolunteerApplication } from "@/lib/volunteerTypes";

export type EmailSendResult = { sent: boolean; error?: string };

export async function sendVolunteerApprovedEmail(
  application: VolunteerApplication,
): Promise<EmailSendResult> {
  if (!isEmailConfigured()) {
    console.warn("[email] SMTP not configured — skipping volunteer approval notification");
    return { sent: false, error: "Email is not configured on the server" };
  }

  const statusUrl = `${siteBaseUrl()}/volunteer/status?ref=${encodeURIComponent(application.refId)}`;
  const firstName = application.name.trim().split(/\s+/)[0] || application.name;

  const subject = `Your volunteer application was approved — ${ORGANIZATION.name}`;
  const text = [
    `Dear ${application.name},`,
    "",
    `Congratulations! Your volunteer application (${application.refId}) with ${ORGANIZATION.name} has been approved.`,
    "",
    "Our volunteer coordinator may contact you by email or phone with next steps, orientation details, and scheduling.",
    "",
    "You can check your application status anytime:",
    statusUrl,
    "",
    `Thank you for serving communities in ${ORGANIZATION.location}.`,
    "",
    ORGANIZATION.name,
    ORGANIZATION.email,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#1e293b;max-width:560px">
      <p>Dear ${escapeHtml(firstName)},</p>
      <p>
        Congratulations! Your volunteer application
        <strong>${escapeHtml(application.refId)}</strong>
        with <strong>${escapeHtml(ORGANIZATION.name)}</strong> has been <strong>approved</strong>.
      </p>
      <p>
        Our volunteer coordinator may contact you by email or phone with next steps,
        orientation details, and scheduling.
      </p>
      <p style="margin:24px 0">
        <a href="${statusUrl}" style="display:inline-block;background:#0f4c81;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">
          View application status
        </a>
      </p>
      <p style="font-size:14px;color:#64748b">
        Reference ID: ${escapeHtml(application.refId)}<br />
        ${escapeHtml(ORGANIZATION.location)}
      </p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0" />
      <p style="font-size:13px;color:#64748b">
        ${escapeHtml(ORGANIZATION.name)} ·
        <a href="mailto:${escapeHtml(ORGANIZATION.email)}">${escapeHtml(ORGANIZATION.email)}</a>
      </p>
    </div>
  `;

  try {
    await sendMail({
      to: application.email,
      subject,
      html,
      text,
    });
    return { sent: true };
  } catch (err) {
    console.error("[email] volunteer approved notification failed", err);
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Failed to send email",
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
