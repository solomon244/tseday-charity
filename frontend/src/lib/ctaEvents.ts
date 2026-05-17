export const DONATION_MODAL_EVENT = "open-donation-modal";
export const VOLUNTEER_MODAL_EVENT = "open-volunteer-modal";

export function openDonationModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(DONATION_MODAL_EVENT));
}

export function openVolunteerModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(VOLUNTEER_MODAL_EVENT));
}
