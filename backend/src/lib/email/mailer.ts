import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { ORGANIZATION } from "@/config";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

let transporter: Transporter | null = null;

const PLACEHOLDER_MARKERS = [
  "your-email@gmail.com",
  "your-16-char-app-password",
  "your-app-password",
  "your@gmail.com",
];

function envValue(key: string): string {
  const raw = process.env[key]?.trim() ?? "";
  return raw.replace(/^['"]|['"]$/g, "");
}

/** Gmail app passwords are often copied with spaces — remove them. */
function normalizeSmtpPassword(pass: string): string {
  return pass.replace(/\s+/g, "");
}

export function getSmtpConfig() {
  const host = envValue("SMTP_HOST");
  const user = envValue("SMTP_USER");
  const pass = normalizeSmtpPassword(envValue("SMTP_PASS"));
  const port = Number(envValue("SMTP_PORT") || "587");
  const secure = envValue("SMTP_SECURE") === "true" || port === 465;
  const from = envValue("SMTP_FROM") || user;
  const fromName = envValue("SMTP_FROM_NAME") || ORGANIZATION.name;

  return { host, user, pass, port, secure, from, fromName };
}

export function isEmailConfigured(): boolean {
  const { host, user, pass } = getSmtpConfig();
  return Boolean(host && user && pass);
}

export function assertSmtpReady(): void {
  if (!isEmailConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local.");
  }

  const { user, pass } = getSmtpConfig();
  const lowerUser = user.toLowerCase();
  const looksLikePlaceholder =
    PLACEHOLDER_MARKERS.some((p) => lowerUser === p) ||
    lowerUser.includes("your-email") ||
    pass.toLowerCase().includes("your-") ||
    pass.toLowerCase().includes("app-password");

  if (looksLikePlaceholder) {
    throw new Error(
      "SMTP_USER and SMTP_PASS in .env.local are still placeholders. Use your real Gmail address and a Google App Password (not your normal Gmail password).",
    );
  }
}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  assertSmtpReady();
  const { host, user, pass, port, secure } = getSmtpConfig();

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  return transporter;
}

export function mailFromAddress(): string {
  return getSmtpConfig().from;
}

export function mailFromLabel(): string {
  return getSmtpConfig().fromName;
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  const transport = getTransporter();
  await transport.sendMail({
    from: `"${mailFromLabel()}" <${mailFromAddress()}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: ORGANIZATION.email,
  });
}

export function siteBaseUrl(): string {
  const explicit =
    process.env.FRONTEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  return "http://localhost:3000";
}
