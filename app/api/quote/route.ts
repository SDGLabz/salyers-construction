import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";

/**
 * Quote-request submission endpoint for the multistep <QuoteWizard>.
 * Sends the qualified lead to the Belzona Baton Rouge team via Resend.
 *
 * Required env (set in Vercel → Project → Environment Variables):
 *   RESEND_API_KEY  — your Resend API key
 *   RESEND_FROM     — verified sender, e.g. "Belzona BR <quotes@belzonabatonrouge.com>"
 *   RESEND_TO       — (optional) inbox; defaults to the distributor email
 */
export const runtime = "nodejs";

type Body = {
  path?: string;
  pathLabel?: string;
  products?: string;
  worked?: string;
  use?: string;
  learn?: string;
  audience?: string;
  goals?: string;
  problem?: string;
  asset?: string;
  industry?: string;
  scope?: string;
  details?: string;
  product?: string;
  marketingOptIn?: boolean;
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  website?: string; // honeypot — must be empty
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
  return `<tr><td style="padding:6px 14px 6px 0;color:#5b6675;font:600 13px system-ui;white-space:nowrap;vertical-align:top">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#0b1f33;font:14px system-ui">${esc(v)}</td></tr>`;
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "email_not_configured" }, { status: 503 });
  }
  const from = process.env.RESEND_FROM || "Belzona Baton Rouge <onboarding@resend.dev>";
  const to = process.env.RESEND_TO || CONTACT.email;

  const html = `
  <div style="font:14px system-ui;color:#0b1f33;max-width:620px">
    <div style="background:#003C71;color:#fff;padding:18px 22px;border-radius:10px 10px 0 0">
      <div style="font:700 18px system-ui">New ${esc(body.pathLabel || "request")}</div>
      <div style="font:13px system-ui;color:#bcd0e6;margin-top:2px">Belzona of Baton Rouge — website</div>
    </div>
    <div style="border:1px solid #e4e9ef;border-top:0;border-radius:0 0 10px 10px;padding:18px 22px">
      <table style="border-collapse:collapse;width:100%">
        ${row("Request type", body.pathLabel)}
        <tr><td colspan="2" style="padding:6px 0 4px;border-top:1px solid #eef2f6"></td></tr>
        ${row("Name", name)}
        ${row("Company", body.company)}
        ${row("Role", body.role)}
        ${row("Email", email)}
        ${row("Phone", phone)}
        <tr><td colspan="2" style="padding:10px 0 4px;border-top:1px solid #eef2f6"></td></tr>
        ${row("Products / kits", body.products)}
        ${row("Worked with Belzona", body.worked)}
        ${row("Use", body.use)}
        ${row("Problem", body.problem)}
        ${row("Equipment", body.asset)}
        ${row("Industry", body.industry)}
        ${row("Scope", body.scope)}
        ${row("Wants to learn", body.learn)}
        ${row("Attendance", body.audience)}
        ${row("Goals", body.goals)}
        ${row("Details", body.details)}
        ${row("From product page", body.product)}
        ${row("Marketing opt-in", body.marketingOptIn ? "Yes" : "No")}
      </table>
    </div>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${body.pathLabel || "Quote request"} — ${name}${body.company ? ` (${body.company})` : ""}`,
        html,
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
