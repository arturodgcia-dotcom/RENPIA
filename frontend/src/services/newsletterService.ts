import { notifyTelegram } from "./telegramService";
import { readCollection, writeCollection } from "./storage";

const NEWSLETTER_KEY = "reinpia-newsletter";

export type NewsletterSubscriptionInput = {
  email: string;
  consent: boolean;
  source: string;
};

export type NewsletterSubscriber = NewsletterSubscriptionInput & {
  id: string;
  createdAt: string;
  status: "pending_confirmation" | "active";
};

export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export async function subscribeNewsletter(input: NewsletterSubscriptionInput) {
  const record: NewsletterSubscriber = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending_confirmation",
  };

  const subscribers = [record, ...readCollection<NewsletterSubscriber>(NEWSLETTER_KEY)];
  writeCollection(NEWSLETTER_KEY, subscribers);

  await notifyTelegram(
    "new_newsletter_subscription",
    `Nueva suscripcion newsletter REINPIA: ${record.email}`,
  );

  return record;
}

export function getNewsletterSubscribers() {
  return readCollection<NewsletterSubscriber>(NEWSLETTER_KEY);
}
