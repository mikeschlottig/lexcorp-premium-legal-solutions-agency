import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, Copy, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { respondToUserMessage, type SiteBotResult } from "@/components/chatbot/siteBot";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useConsultation } from "@/components/consultation/useConsultation";
type ChatRole = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: string; // ISO
  links?: Array<{ label: string; href: string }>;
  action?: SiteBotResult["action"];
};
const STORAGE_TRANSCRIPT_KEY = "lexcorp_chat_transcript_v1";
const STORAGE_GREETED_KEY = "lexcorp_chat_greeted_v1";
function safeNowIso(): string {
  return new Date().toISOString();
}
function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function safeSessionGet(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.sessionStorage.getItem(key);
  } catch (e) {
    console.warn("[ChatBubble] sessionStorage get failed:", e);
    return null;
  }
}
function safeSessionSet(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(key, value);
  } catch (e) {
    console.warn("[ChatBubble] sessionStorage set failed:", e);
  }
}
function safeSessionRemove(key: string): void {
  try {
    if (typeof window === "undefined") return;
    window.sessionStorage.removeItem(key);
  } catch (e) {
    console.warn("[ChatBubble] sessionStorage remove failed:", e);
  }
}
function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function greetingMessage(): ChatMessage {
  return {
    id: makeId("greet"),
    role: "assistant",
    text: "Hi — I’m LexCorp’s virtual clerk. Need help finding services, team info, or scheduling a consultation?",
    timestamp: safeNowIso(),
  };
}
function buildTranscriptText(messages: ChatMessage[]): string {
  return messages
    .map((m) => {
      const who = m.role === "user" ? "You" : "LexCorp Virtual Clerk";
      const t = formatTime(m.timestamp);
      return `[${t}] ${who}: ${m.text}`;
    })
    .join("\n");
}
export function ChatBubble(): JSX.Element {
  const openConsultation = useConsultation().openConsultation;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const raw = safeSessionGet(STORAGE_TRANSCRIPT_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as ChatMessage[];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((m) => m && typeof m.text === "string" && (m.role === "user" || m.role === "assistant"));
    } catch (e) {
      console.warn("[ChatBubble] Failed to parse transcript:", e);
      return [];
    }
  });
  const [input, setInput] = useState("");
  const lastUserQuestion = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i]?.role === "user") return messages[i]?.text ?? "";
    }
    return "";
  }, [messages]);
  const lastAssistantText = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i]?.role === "assistant") return messages[i]?.text ?? "";
    }
    return "";
  }, [messages]);
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    safeSessionSet(STORAGE_TRANSCRIPT_KEY, JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    if (!open) return;
    // Scroll to bottom on open (and when messages change while open).
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }));
  }, [open, messages.length]);
  useEffect(() => {
    if (!open) return;
    console.log("[analytics] chatbot_open", { timestamp: safeNowIso() });
    const greeted = safeSessionGet(STORAGE_GREETED_KEY) === "1";
    if (greeted) return;
    // If transcript already exists, mark greeted to avoid repeating.
    if (messages.length > 0) {
      safeSessionSet(STORAGE_GREETED_KEY, "1");
      return;
    }
    setMessages((prev) => (prev.length === 0 ? [...prev, greetingMessage()] : prev));
    safeSessionSet(STORAGE_GREETED_KEY, "1");
  }, [open, messages.length]);
  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: makeId("user"),
      role: "user",
      text,
      timestamp: safeNowIso(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    console.log("[analytics] chatbot_message_sent", { text });
    const result = respondToUserMessage(text);
    const assistantMsg: ChatMessage = {
      id: makeId("assistant"),
      role: "assistant",
      text: result.text,
      timestamp: safeNowIso(),
      links: result.links,
      action: result.action,
    };
    setMessages((prev) => [...prev, assistantMsg]);
    console.log("[analytics] chatbot_message_received", { confidence: result.confidence, matched: result.matched ?? null });
  }, [input]);
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        send();
      }
    },
    [send],
  );
  const copyTranscript = useCallback(async () => {
    const text = buildTranscriptText(messages);
    if (!text.trim()) {
      toast.message("Transcript is empty.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Transcript copied.");
    } catch (e) {
      console.error("[ChatBubble] Clipboard copy failed:", e);
      toast.error("Copy failed. Your browser may block clipboard access.");
    }
  }, [messages]);
  const clearTranscript = useCallback(() => {
    setMessages([]);
    safeSessionRemove(STORAGE_TRANSCRIPT_KEY);
    toast.message("Transcript cleared for this tab.");
  }, []);
  const handleConsultFromChat = useCallback(() => {
    console.log("[analytics] chatbot_lead_prompted", { question: lastUserQuestion || null, timestamp: safeNowIso() });
    openConsultation({
      source: "chatbot",
      context: { channel: "virtual-clerk" },
      prefill: {
        reason: lastUserQuestion
          ? `Chatbot handoff — question:\n${lastUserQuestion}`
          : "Chatbot handoff — consultation requested",
      },
    });
    setOpen(false);
  }, [openConsultation, lastUserQuestion]);
  return (
    <>
      {/* Floating bubble */}
      <div className="fixed bottom-5 right-5 z-50">
        <Button
          type="button"
          size="icon"
          onClick={() => setOpen(true)}
          className={cn(
            "h-14 w-14 rounded-full shadow-glow bg-[#B45309] hover:bg-[#92400E] text-white border-none",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B45309]/60",
          )}
          aria-label="Open LexCorp Virtual Clerk"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full sm:w-[420px] p-0 border-l-border/70 bg-background/95 backdrop-blur-lg"
        >
          <SheetHeader className="px-6 pt-8 pb-4">
            <SheetTitle className="font-serif tracking-tight text-2xl">
              LexCorp Virtual Clerk
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              I can help you find services, team info, case studies, and insights — or route you to a partner consultation.
            </SheetDescription>
          </SheetHeader>
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyTranscript}
                  className="rounded-full"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy transcript
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearTranscript}
                  className="rounded-full"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
              <SheetClose asChild>
                <Button type="button" variant="ghost" size="sm" className="rounded-full">
                  Close
                </Button>
              </SheetClose>
            </div>
          </div>
          <Separator />
          {/* aria-live: announce incoming assistant messages */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {lastAssistantText}
          </div>
          <ScrollArea className="h-[60vh] sm:h-[62vh] px-6">
            <div className="py-6 space-y-5">
              {messages.length === 0 ? (
                <div className="rounded-2xl border border-border/70 bg-secondary/40 p-4 text-sm text-muted-foreground">
                  Open the chat to see a greeting. Ask about “Corporate Law”, “Elena Vance”, “address”, or “AI regulation”.
                </div>
              ) : null}
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}
                  >
                    {/* Avatar placeholder:
                        This assistant avatar is a temporary placeholder and must be replaced before production use. */}
                    <div
                      className={cn(
                        "mt-1 h-8 w-8 rounded-2xl flex items-center justify-center border",
                        isUser
                          ? "order-2 bg-[#0F172A] text-white border-white/10"
                          : "bg-[#B45309]/10 text-[#B45309] border-[#B45309]/20",
                      )}
                      aria-hidden="true"
                      title={isUser ? "You" : "Virtual Clerk"}
                    >
                      {isUser ? "Y" : "L"}
                    </div>
                    <div className={cn("max-w-[85%] sm:max-w-[78%]", isUser ? "order-1" : "")}>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-3 shadow-sm border",
                          isUser
                            ? "bg-[#0F172A] text-white border-white/10"
                            : "bg-secondary text-secondary-foreground border-border/70",
                        )}
                      >
                        <p className={cn("text-sm leading-relaxed", !isUser ? "text-foreground" : "")}>{m.text}</p>
                        {m.links && m.links.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {m.links.slice(0, 3).map((l) => (
                              <a
                                key={l.href + l.label}
                                href={l.href}
                                className={cn(
                                  "text-xs font-semibold rounded-full px-3 py-1 border transition-colors",
                                  "hover:bg-accent/10 hover:border-[#B45309]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B45309]/40",
                                  "border-border/70 text-muted-foreground",
                                )}
                              >
                                {l.label}
                              </a>
                            ))}
                          </div>
                        ) : null}
                        {m.role === "assistant" && m.action?.type === "consultation" ? (
                          <div className="mt-4">
                            <Button
                              type="button"
                              onClick={handleConsultFromChat}
                              className="rounded-full bg-[#B45309] hover:bg-[#92400E] text-white border-none shadow-glow"
                            >
                              Schedule a consultation
                            </Button>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={cn(
                          "mt-1 text-[11px] text-muted-foreground",
                          isUser ? "text-right" : "text-left",
                        )}
                      >
                        {formatTime(m.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>
          </ScrollArea>
          <Separator />
          {/* Composer */}
          <div className="p-6 space-y-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask a question…"
                className="h-12 bg-secondary text-secondary-foreground border border-input placeholder:text-muted-foreground"
                aria-label="Chat message"
              />
              <Button
                type="button"
                onClick={send}
                disabled={!input.trim()}
                className="h-12 rounded-xl bg-[#0F172A] hover:bg-[#B45309] text-white border-none"
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Client-side only. I answer from LexCorp’s on-site content and may suggest a consultation if I’m not confident.
            </p>
          </div>
          {/*
            QA checklist:
            - Greeting appears only once per session (open chat, close, re-open: no re-greet).
            - Keyword retrieval works: ask "Corporate Law", "Elena Vance", "address", "phone", "email".
            - Low-confidence fallback shows “Schedule a consultation” and opens the Consultation modal with prefilled reason.
            - Transcript persists across navigation within the same tab (sessionStorage).
            - Copy transcript + Clear actions work.
          */}
        </SheetContent>
      </Sheet>
    </>
  );
}