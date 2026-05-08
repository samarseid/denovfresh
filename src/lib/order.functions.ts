import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// --- SOZLAMALAR (TOKENLARNI SHU YERGA YOZING) ---
const CONFIG = {
  ADMIN_BOT_TOKEN: "8684464820:AAHVFHvIaePwtJzjaVm4xYDsJs1bjQOO5zg", // BotFather'dan olingan token
  ADMIN_CHAT_ID: "6518975266",           // Boya olingan ID (masalan: 12345678)
  USER_BOT_TOKEN: "8647866483:AAEUNDslugg_NxxNB1MnZMywUa62Td-pQWQ",   // Agar foydalanuvchi boti alohida bo'lsa
};
// ----------------------------------------------

const OrderSchema = z.object({
  initData: z.string().optional().default(""),
  customer: z.object({
    name: z.string().min(1).max(80),
    phone: z.string().min(7).max(30),
    address: z.string().min(2).max(200),
    note: z.string().max(300).optional().default(""),
  }),
  tgUser: z
    .object({
      id: z.number().optional(),
      username: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
    })
    .optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        qty: z.number().int().min(1),
        price: z.number().int().min(0),
      }),
    )
    .min(1),
  total: z.number().int().min(0),
});

export type OrderPayload = z.infer<typeof OrderSchema>;

const fmtSum = (n: number) => `${n.toLocaleString("ru-RU")} so'm`;

function buildAdminText(o: OrderPayload, orderId: string) {
  const lines = o.items
    .map((i, idx) => `${idx + 1}. <b>${i.name}</b> ×${i.qty} — ${fmtSum(i.price * i.qty)}`)
    .join("\n");
  const tg = o.tgUser;
  const tgLine = tg
    ? `\n👤 TG: ${tg.first_name ?? ""} ${tg.last_name ?? ""}${tg.username ? ` (@${tg.username})` : ""}${tg.id ? ` · <code>${tg.id}</code>` : ""}`
    : "";
  return [
    `🆕 <b>YANGI BUYURTMA</b>`,
    `🧾 № <code>${orderId}</code>`,
    ``,
    `👤 <b>${o.customer.name}</b>`,
    `📞 ${o.customer.phone}`,
    `📍 ${o.customer.address}`,
    o.customer.note ? `📝 ${o.customer.note}` : "",
    tgLine,
    ``,
    `<b>🛒 Mahsulotlar:</b>`,
    lines,
    ``,
    `💰 <b>Jami: ${fmtSum(o.total)}</b>`,
    `⏰ ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildUserText(o: OrderPayload, orderId: string) {
  const lines = o.items
    .map((i) => `• ${i.name} ×${i.qty} — ${fmtSum(i.price * i.qty)}`)
    .join("\n");
  return [
    `✅ <b>Buyurtmangiz qabul qilindi!</b>`,
    `🧾 № <code>${orderId}</code>`,
    ``,
    lines,
    ``,
    `💰 <b>Jami: ${fmtSum(o.total)}</b>`,
    `📍 ${o.customer.address}`,
    ``,
    `Tez orada operator siz bilan bog'lanadi 🌿`,
    `<i>Denov Fresh — Freshness in every sip</i>`,
  ].join("\n");
}

async function tgSend(token: string, chatId: string | number, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[telegram] send failed", res.status, body);
    return false;
  }
  return true;
}

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => OrderSchema.parse(data))
  .handler(async ({ data }) => {
    // Endi o'zgaruvchilar yuqoridagi CONFIG obyektidan olinadi
    const ADMIN_TOKEN = CONFIG.ADMIN_BOT_TOKEN;
    const ADMIN_CHAT = CONFIG.ADMIN_CHAT_ID;
    const USER_TOKEN = CONFIG.USER_BOT_TOKEN;

    const orderId = `DF-${Date.now().toString(36).toUpperCase()}`;

    // Admin bot tokeni kiritilganligini tekshirish
    if (!ADMIN_TOKEN || ADMIN_TOKEN === "SIZNING_ADMIN_BOT_TOKENINGIZ") {
      console.error("[order] admin bot tokeni kiritilmagan");
      return { ok: false, orderId, error: "Bot sozlamalari to'liq emas" };
    }

    const adminText = buildAdminText(data, orderId);
    const adminOk = await tgSend(ADMIN_TOKEN, ADMIN_CHAT, adminText);

    // Agar foydalanuvchi boti sozlangan bo'lsa va foydalanuvchi IDsi bo'lsa
    if (USER_TOKEN && USER_TOKEN !== "SIZNING_USER_BOT_TOKENINGIZ" && data.tgUser?.id) {
      const userText = buildUserText(data, orderId);
      await tgSend(USER_TOKEN, data.tgUser.id, userText).catch(() => {});
    }

    return { ok: adminOk, orderId };
  });