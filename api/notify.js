/**
 * Vercel serverless function: forwards a submitted movie-date booking to
 * Telegram. Secrets (bot token + chat id) live in Vercel env vars and never
 * reach the browser. The frontend calls this fire-and-forget from handleSubmit.
 *
 * Required env vars (set in the Vercel dashboard → Settings → Environment Variables):
 *   TG_BOT_TOKEN  — token from @BotFather
 *   TG_CHAT_ID    — your chat id (from getUpdates after messaging the bot once)
 */

/** Escape the few characters Telegram's HTML parse mode treats as markup. */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { TG_BOT_TOKEN, TG_CHAT_ID } = process.env;
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
    return res.status(500).json({ error: 'Telegram is not configured' });
  }

  const { theater, time, date, snack, message, guest, serial } = req.body ?? {};

  // Minimal validation — the required booking fields must be present.
  if (!theater || !time || !date || !snack) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const text =
    `🎟️ <b>New movie date booked!</b>\n\n` +
    `👤 <b>Guest:</b> ${escapeHtml(guest) || '—'}\n` +
    `📍 <b>Theater:</b> ${escapeHtml(theater)}\n` +
    `⏰ <b>Showtime:</b> ${escapeHtml(time)}\n` +
    `📅 <b>Date:</b> ${escapeHtml(date)}\n` +
    `🍿 <b>Snack:</b> ${escapeHtml(snack)}\n` +
    `💌 <b>Message:</b> ${escapeHtml(message) || '—'}\n` +
    `🔖 <b>Ticket:</b> ${escapeHtml(serial) || '—'}`;

  try {
    const tg = await fetch(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tg.ok) {
      const detail = await tg.text();
      return res.status(502).json({ error: 'Telegram rejected the message', detail });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach Telegram' });
  }
}
