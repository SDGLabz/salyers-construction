import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";

/**
 * Bid / contact submission endpoint for the multistep <QuoteWizard>.
 * Sends the qualified lead to Salyers Construction via Resend.
 *
 * Required env (set in Vercel → Project → Environment Variables):
 *   RESEND_API_KEY  — your Resend API key
 *   RESEND_FROM     — verified sender, e.g. "Salyers Construction <bids@salyersconstruction.com>"
 *   RESEND_TO       — (optional) inbox; defaults to the company email
 */
export const runtime = "nodejs";

type Body = {
  path?: string;
  pathLabel?: string;
  // bid
  serviceLine?: string;
  projectType?: string;
  location?: string;
  // drawings
  drawingStage?: string;
  // samples / coatings
  market?: string;
  system?: string;
  squareFootage?: string;
  facilityType?: string;
  // inquiry
  topic?: string;
  // shared
  details?: string;
  context?: string; // page that opened the wizard, if any
  // contact step
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string; // honeypot — must be empty
  ageConfirmed?: boolean; // required 18+ affirmation (COPPA / eligibility)
  // drawings upload — base64 file contents, emailed inline via Resend
  attachments?: { filename: string; content: string; type?: string }[];
  attachmentNames?: string;
};

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function row(label: string, value: unknown) {
  const v = Array.isArray(value) ? value.join(", ") : value;
  if (!v) return "";
  return `<tr><td style="padding:6px 14px 6px 0;color:#3f3f3f;font:600 13px system-ui;white-space:nowrap;vertical-align:top">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#15263F;font:14px system-ui">${esc(v)}</td></tr>`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: silently accept bots without sending.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  if (!name || !EMAIL_RE.test(email) || !phone) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  // Require the 18+ / eligibility affirmation (also enforced client-side).
  if (body.ageConfirmed !== true) {
    return NextResponse.json({ ok: false, error: "age_not_confirmed" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }
  const from = process.env.RESEND_FROM || "Salyers Construction <onboarding@resend.dev>";
  const to = process.env.RESEND_TO || CONTACT.email;

  const html = `
  <div style="font:14px system-ui;color:#15263F;max-width:620px">
    <div style="background:#15263F;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0">
      <div style="font:700 18px system-ui">New ${esc(body.pathLabel || "request")}</div>
      <div style="font:13px system-ui;color:#c8d2e0;margin-top:2px">Salyers Construction — website</div>
    </div>
    <div style="border:1px solid #e5e4e1;border-top:0;border-radius:0 0 10px 10px;padding:18px 22px">
      <table style="border-collapse:collapse;width:100%">
        ${row("Request type", body.pathLabel)}
        <tr><td colspan="2" style="padding:6px 0 4px;border-top:1px solid #eef0f3"></td></tr>
        ${row("Name", name)}
        ${row("Company", body.company)}
        ${row("Role", body.role)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        ${row("Age confirmed", "Yes — confirmed 18 or older")}
        <tr><td colspan="2" style="padding:10px 0 4px;border-top:1px solid #eef0f3"></td></tr>
        ${row("Service line", body.serviceLine)}
        ${row("Project type", body.projectType)}
        ${row("Project location", body.location)}
        ${row("Drawing stage", body.drawingStage)}
        ${row("Facility / market", body.market)}
        ${row("System interest", body.system)}
        ${row("Approx. square footage", body.squareFootage)}
        ${row("Facility type", body.facilityType)}
        ${row("Inquiry topic", body.topic)}
        ${row("Scope / details", body.details)}
        ${row("Message", body.message)}
        ${row("Attachments", body.attachmentNames)}
        ${row("Opened from", body.context)}
      </table>
    </div>
  </div>`;

  const attachments = Array.isArray(body.attachments)
    ? body.attachments
        .filter((a) => a && typeof a.filename === "string" && typeof a.content === "string" && a.content.length > 0)
        .slice(0, 10)
        .map((a) => ({ filename: a.filename, content: a.content }))
    : [];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Salyers — ${body.pathLabel || "request"} from ${name}${body.company ? ` (${body.company})` : ""}`,
        html,
        ...(attachments.length ? { attachments } : {}),
      }),
    });
    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      return NextResponse.json({ ok: false, error: "send_failed", detail }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
