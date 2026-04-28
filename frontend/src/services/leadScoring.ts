const genericDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"];

export type LeadFormInput = {
  fullName: string;
  company: string;
  position: string;
  email: string;
  whatsapp: string;
  companyType: string;
  companySize: string;
  mainNeed: string;
  budget: string;
  implementationTime: string;
  challenge: string;
  verification: string;
  consent: boolean;
  honeypot: string;
};

export type LeadClassification = "curious" | "initial" | "potential" | "expansion";

export type LeadScore = {
  score: number;
  classification: LeadClassification;
  businessEmail: boolean;
  verificationOk: boolean;
  antiBotOk: boolean;
  reasons: string[];
};

export function isBusinessEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return Boolean(domain) && !genericDomains.includes(domain);
}

export function scoreLead(input: LeadFormInput): LeadScore {
  let score = 0;
  const reasons: string[] = [];
  const businessEmail = isBusinessEmail(input.email);
  const verificationOk = input.verification.trim() === "7";
  const antiBotOk = !input.honeypot.trim();

  if (input.company.trim()) {
    score += 15;
    reasons.push("company");
  }

  if (businessEmail) {
    score += 18;
    reasons.push("business-email");
  } else if (input.email.trim()) {
    score -= 6;
  }

  if (input.whatsapp.trim().length >= 10) {
    score += 10;
    reasons.push("phone");
  }

  if (input.budget.includes("500")) {
    score += 18;
    reasons.push("budget-high");
  } else if (input.budget.trim()) {
    score += 10;
  }

  if (input.implementationTime === "Inmediato" || input.implementationTime === "Immediate") {
    score += 16;
    reasons.push("urgent");
  } else if (
    input.implementationTime === "1 a 3 meses" ||
    input.implementationTime === "1 to 3 months"
  ) {
    score += 10;
  }

  if (input.challenge.trim().length >= 80) {
    score += 18;
    reasons.push("clear-challenge");
  } else if (input.challenge.trim().length >= 30) {
    score += 10;
  } else {
    score -= 4;
  }

  if (input.mainNeed.trim().length >= 12) {
    score += 10;
  }

  if (input.companySize === "201 a 500" || input.companySize === "500+" || input.companySize === "201 to 500") {
    score += 6;
  }

  if (!verificationOk || !antiBotOk) {
    score = 0;
  }

  const classification: LeadClassification =
    score >= 75 ? "expansion" : score >= 55 ? "potential" : score >= 32 ? "initial" : "curious";

  return {
    score,
    classification,
    businessEmail,
    verificationOk,
    antiBotOk,
    reasons,
  };
}
