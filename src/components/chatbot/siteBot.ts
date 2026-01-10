import { BLOG_POSTS, CASE_STUDIES, SERVICES, TEAM_MEMBERS } from "@/lib/data";
export type SiteBotLink = { label: string; href: string };
export type SiteBotAction =
  | {
      type: "consultation";
      prefillReason: string;
    }
  | {
      type: "none";
    };
export type SiteBotResult = {
  text: string;
  confidence: number;
  links?: SiteBotLink[];
  action?: SiteBotAction;
  matched?: {
    kind: "service" | "team" | "case-study" | "blog" | "contact" | "page-topic";
    id?: string;
    title?: string;
  };
};
type KnowledgeDoc = {
  kind: SiteBotResult["matched"]["kind"];
  id: string;
  title: string;
  href?: string;
  text: string;
  tokens: string[];
};
const CONTACT = {
  address: "One World Trade Center, Suite 85, New York, NY 10007",
  phone: "+1 (212) 555-0198",
  email: "counsel@lexcorp.law",
};
const PAGE_TOPICS: Array<{ id: string; title: string; href: string; text: string }> = [
  {
    id: "about",
    title: "About LexCorp",
    href: "/about",
    text: "About the firm, leadership, principles, global reach, history since 1994, global hubs and locations (New York, London, Singapore and more).",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    href: "/privacy",
    text: "Privacy policy, information we collect, use of information, client confidentiality, GDPR and international transfers, your rights and legal inquiries.",
  },
  {
    id: "services",
    title: "Services",
    href: "/services",
    text: "Practice areas including Corporate Law, Intellectual Property, and Dispute Resolution. Partner consultations and strategic outcomes (case studies).",
  },
  {
    id: "blog",
    title: "Insights (Blog)",
    href: "/blog",
    text: "Knowledge & Insights: legal trends, regulatory shifts, commercial strategy, article authors, categories and dates.",
  },
];
const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "at",
  "by",
  "from",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "i",
  "you",
  "we",
  "they",
  "it",
  "this",
  "that",
  "these",
  "those",
  "my",
  "your",
  "our",
  "their",
  "me",
  "us",
  "can",
  "could",
  "should",
  "would",
  "do",
  "does",
  "did",
  "about",
  "tell",
  "please",
  "help",
  "need",
  "want",
  "looking",
  "find",
  "show",
  "what",
  "who",
  "where",
  "when",
  "how",
]);
function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function tokenize(input: string): string[] {
  const normalized = normalizeText(input);
  if (!normalized) return [];
  return normalized
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => t.length >= 2)
    .filter((t) => !STOPWORDS.has(t));
}
function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
function buildIndex(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];
  for (const s of SERVICES) {
    const featureText = (s.features ?? []).join(". ");
    const text = `${s.title}. ${s.description} ${s.longDescription ?? ""} ${featureText}`.trim();
    docs.push({
      kind: "service",
      id: s.id,
      title: s.title,
      href: "/services",
      text,
      tokens: tokenize(text),
    });
  }
  for (const m of TEAM_MEMBERS) {
    const text = `${m.name}. ${m.role}. ${m.expertise}. ${m.bio}`.trim();
    docs.push({
      kind: "team",
      id: m.id,
      title: m.name,
      href: "/about",
      text,
      tokens: tokenize(text),
    });
  }
  for (const c of CASE_STUDIES) {
    const text = `${c.title}. Client: ${c.client}. Brief: ${c.brief}. Outcome: ${c.outcome}`.trim();
    docs.push({
      kind: "case-study",
      id: c.id,
      title: c.title,
      href: "/services",
      text,
      tokens: tokenize(text),
    });
  }
  for (const p of BLOG_POSTS) {
    const text = `${p.title}. ${p.excerpt}. Category: ${p.category}. Date: ${p.date}. Author: ${p.author.name}.`.trim();
    docs.push({
      kind: "blog",
      id: p.id,
      title: p.title,
      href: `/blog/${p.id}`,
      text,
      tokens: tokenize(text),
    });
  }
  // Contact + pages as searchable docs
  docs.push({
    kind: "contact",
    id: "contact",
    title: "Contact Information",
    href: "/about",
    text: `Address: ${CONTACT.address}. Phone: ${CONTACT.phone}. Email: ${CONTACT.email}.`,
    tokens: tokenize(`address ${CONTACT.address} phone ${CONTACT.phone} email ${CONTACT.email}`),
  });
  for (const t of PAGE_TOPICS) {
    docs.push({
      kind: "page-topic",
      id: t.id,
      title: t.title,
      href: t.href,
      text: t.text,
      tokens: tokenize(`${t.title}. ${t.text}`),
    });
  }
  return docs;
}
const INDEX = buildIndex();
function containsAny(haystack: string, needles: string[]): boolean {
  const n = normalizeText(haystack);
  return needles.some((w) => n.includes(normalizeText(w)));
}
function bestDocByTokenOverlap(queryTokens: string[]): { doc: KnowledgeDoc | null; score: number } {
  if (queryTokens.length === 0) return { doc: null, score: 0 };
  const querySet = new Set(queryTokens);
  let best: KnowledgeDoc | null = null;
  let bestScore = 0;
  for (const doc of INDEX) {
    if (!doc.tokens.length) continue;
    let overlap = 0;
    for (const t of doc.tokens) {
      if (querySet.has(t)) overlap += 1;
    }
    // Basic normalization: overlap relative to query size, with a small boost for title hits
    const base = overlap / Math.max(1, queryTokens.length);
    const titleTokens = new Set(tokenize(doc.title));
    let titleBoost = 0;
    for (const t of queryTokens) {
      if (titleTokens.has(t)) titleBoost += 0.06;
    }
    const score = Math.min(1, base + titleBoost);
    if (score > bestScore) {
      bestScore = score;
      best = doc;
    }
  }
  return { doc: best, score: bestScore };
}
function shapeResponseFromDoc(doc: KnowledgeDoc, score: number, userMessage: string): SiteBotResult {
  const links: SiteBotLink[] = [];
  if (doc.href) links.push({ label: "Open", href: doc.href });
  if (doc.kind === "service") {
    return {
      confidence: score,
      text: `LexCorp offers "${doc.title}". ${SERVICES.find((s) => s.id === doc.id)?.description ?? ""} You can review practice details on the Services page.`,
      links: [{ label: "View Services", href: "/services" }],
      matched: { kind: doc.kind, id: doc.id, title: doc.title },
    };
  }
  if (doc.kind === "team") {
    const member = TEAM_MEMBERS.find((m) => m.id === doc.id);
    return {
      confidence: score,
      text: member
        ? `${member.name} is ${member.role} with expertise in ${member.expertise}. You can see the full leadership roster on the About page.`
        : `You can find LexCorp leadership details on the About page.`,
      links: [{ label: "Meet the Team", href: "/about" }],
      matched: { kind: doc.kind, id: doc.id, title: doc.title },
    };
  }
  if (doc.kind === "case-study") {
    const cs = CASE_STUDIES.find((c) => c.id === doc.id);
    return {
      confidence: score,
      text: cs
        ? `Case study: "${cs.title}" for ${cs.client}. Outcome: ${cs.outcome}`
        : `LexCorp has case studies highlighting strategic outcomes on the Services page.`,
      links: [{ label: "View Strategic Outcomes", href: "/services" }],
      matched: { kind: doc.kind, id: doc.id, title: doc.title },
    };
  }
  if (doc.kind === "blog") {
    const post = BLOG_POSTS.find((p) => p.id === doc.id);
    return {
      confidence: score,
      text: post
        ? `Insight: "${post.title}" (${post.date}) — ${post.excerpt}`
        : `You can browse LexCorp insights on the blog.`,
      links: post ? [{ label: "Read Article", href: `/blog/${post.id}` }, { label: "All Insights", href: "/blog" }] : [{ label: "All Insights", href: "/blog" }],
      matched: { kind: doc.kind, id: doc.id, title: doc.title },
    };
  }
  if (doc.kind === "contact") {
    return {
      confidence: score,
      text: `You can reach LexCorp at ${CONTACT.email} or ${CONTACT.phone}. Office: ${CONTACT.address}.`,
      links: [{ label: "About / Contact", href: "/about" }],
      matched: { kind: doc.kind, id: doc.id, title: doc.title },
    };
  }
  // page-topic
  return {
    confidence: score,
    text: `For "${doc.title}", the most relevant page is: ${doc.href ?? "/"}.`,
    links: doc.href ? [{ label: `Open ${doc.title}`, href: doc.href }] : undefined,
    matched: { kind: doc.kind, id: doc.id, title: doc.title },
  };
}
function consultationFallback(userMessage: string): SiteBotResult {
  return {
    confidence: 0.2,
    text: "I don’t have the exact answer here. Would you like to schedule a consultation?",
    action: { type: "consultation", prefillReason: userMessage.trim() || "Consultation request" },
    links: [{ label: "Services", href: "/services" }, { label: "About", href: "/about" }, { label: "Insights", href: "/blog" }],
    matched: { kind: "page-topic", id: "fallback", title: "Consultation" },
  };
}
export function respondToUserMessage(userMessage: string): SiteBotResult {
  const raw = userMessage ?? "";
  const msg = raw.trim();
  if (!msg) {
    return {
      confidence: 0.1,
      text: "Tell me what you’re looking for — services, team info, insights, or scheduling a consultation.",
      matched: { kind: "page-topic", id: "empty", title: "Prompt" },
    };
  }
  const normalized = normalizeText(msg);
  // High-confidence intent triggers
  const consultIntent = containsAny(normalized, ["consultation", "schedule", "book", "appointment", "talk to", "speak with", "call back", "contact"]);
  if (consultIntent && containsAny(normalized, ["consultation", "schedule", "book", "appointment"])) {
    return {
      confidence: 0.95,
      text: "I can help you get that scheduled. If you share a one-line summary, I’ll pass it into the consultation request form.",
      action: { type: "consultation", prefillReason: msg },
      links: [{ label: "Services", href: "/services" }],
      matched: { kind: "page-topic", id: "consultation", title: "Consultation" },
    };
  }
  const contactIntent = containsAny(normalized, ["email", "phone", "call", "address", "location", "office", "contact", "reach"]);
  if (contactIntent) {
    return {
      confidence: 0.95,
      text: `Contact details: email ${CONTACT.email} • phone ${CONTACT.phone} • office ${CONTACT.address}.`,
      links: [{ label: "About / Contact", href: "/about" }],
      matched: { kind: "contact", id: "contact", title: "Contact Information" },
    };
  }
  // Exact title/name triggers
  for (const s of SERVICES) {
    if (normalized.includes(normalizeText(s.title)) || normalized.includes(normalizeText(s.id.replace(/-/g, " ")))) {
      return shapeResponseFromDoc(
        {
          kind: "service",
          id: s.id,
          title: s.title,
          href: "/services",
          text: `${s.title}. ${s.description} ${s.longDescription ?? ""} ${(s.features ?? []).join(". ")}`,
          tokens: tokenize(`${s.title} ${s.description} ${s.longDescription ?? ""} ${(s.features ?? []).join(" ")}`),
        },
        0.95,
        msg,
      );
    }
  }
  for (const m of TEAM_MEMBERS) {
    if (normalized.includes(normalizeText(m.name))) {
      return shapeResponseFromDoc(
        {
          kind: "team",
          id: m.id,
          title: m.name,
          href: "/about",
          text: `${m.name}. ${m.role}. ${m.expertise}. ${m.bio}`,
          tokens: tokenize(`${m.name} ${m.role} ${m.expertise} ${m.bio}`),
        },
        0.95,
        msg,
      );
    }
  }
  // Lightweight similarity lookup
  const queryTokens = unique(tokenize(msg));
  const { doc, score } = bestDocByTokenOverlap(queryTokens);
  // Confidence thresholds:
  // - >= 0.55 => answer directly
  // - 0.35..0.55 => answer but with a gentle hedge + include more navigation links
  // - < 0.35 => consultation fallback
  if (!doc || score < 0.35) {
    return consultationFallback(msg);
  }
  const shaped = shapeResponseFromDoc(doc, score, msg);
  if (score < 0.55) {
    return {
      ...shaped,
      text: `${shaped.text} If this isn’t quite what you meant, I can help route you to the right partner via a consultation request.`,
      links: unique([
        ...(shaped.links ?? []),
        { label: "Services", href: "/services" },
        { label: "Meet the Team", href: "/about" },
        { label: "Insights", href: "/blog" },
      ]).slice(0, 4),
      action: { type: "consultation", prefillReason: msg },
      confidence: score,
    };
  }
  return shaped;
}