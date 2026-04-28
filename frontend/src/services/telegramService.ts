export type TelegramEventType =
  | "new_lead"
  | "new_newsletter_subscription"
  | "new_appointment"
  | "hot_lead";

export type TelegramNotification = {
  eventType: TelegramEventType;
  message: string;
  createdAt: string;
  status: "mocked" | "ready";
};

export async function notifyTelegram(eventType: TelegramEventType, message: string) {
  const notification: TelegramNotification = {
    eventType,
    message,
    createdAt: new Date().toISOString(),
    status:
      import.meta.env.VITE_TELEGRAM_BOT_TOKEN && import.meta.env.VITE_TELEGRAM_CHAT_ID
        ? "ready"
        : "mocked",
  };

  console.info("[telegramService]", notification);

  return notification;
}
