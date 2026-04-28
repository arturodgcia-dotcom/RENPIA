import { notifyTelegram } from "./telegramService";
import { readCollection, writeCollection } from "./storage";
import { scoreLead, type LeadClassification, type LeadFormInput } from "./leadScoring";

const LEADS_KEY = "reinpia-leads";

export type LeadRecord = LeadFormInput & {
  id: string;
  createdAt: string;
  score: number;
  classification: LeadClassification;
};

export async function submitLead(input: LeadFormInput) {
  const scoring = scoreLead(input);

  const record: LeadRecord = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    score: scoring.score,
    classification: scoring.classification,
  };

  const leads = [record, ...readCollection<LeadRecord>(LEADS_KEY)];
  writeCollection(LEADS_KEY, leads);

  await notifyTelegram(
    scoring.classification === "expansion" ? "hot_lead" : "new_lead",
    `Nuevo lead REINPIA: ${record.company || record.fullName} | ${record.classification} | ${record.score}`,
  );

  return {
    record,
    scoring,
  };
}

export function getLeads() {
  return readCollection<LeadRecord>(LEADS_KEY);
}
