export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = "5500375533";

  const { date, time, idea } = req.body;

  const text = `💖 НОВЫЙ ОТВЕТ 💖
Дата: ${date}
Время: ${time}
Выбор: ${idea}`;

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed" });
  }
}
