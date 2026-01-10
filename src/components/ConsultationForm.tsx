import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, XCircle, CheckCircle2, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export type ConsultationMeta = {
  source?: string;
  context?: Record<string, unknown>;
  prefill?: {
    reason?: string;
    name?: string;
    contact?: string;
  };
};
type ConsultationFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  page: string;
  meta?: ConsultationMeta | null;
};
type FormState = {
  name: string;
  contact: string;
  reason: string;
};
type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";
function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.contact.trim()) errors.contact = "Please provide an email or phone number.";
  if (!values.reason.trim()) errors.reason = "Please share the reason for your appointment.";
  return errors;
}
export function ConsultationForm({ open, onOpenChange, page, meta }: ConsultationFormProps): JSX.Element {
  const [values, setValues] = useState<FormState>({ name: "", contact: "", reason: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string>("");
  const prefillAppliedRef = useRef(false);
  const titleId = useMemo(() => "consultation-dialog-title", []);
  const descId = useMemo(() => "consultation-dialog-desc", []);
  const reset = useCallback(() => {
    setValues({ name: "", contact: "", reason: "" });
    setErrors({});
    setStatus("idle");
    setSubmitError("");
    prefillAppliedRef.current = false;
  }, []);
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);
  // Prefill reason (and optionally other fields) once per open-cycle.
  useEffect(() => {
    if (!open) return;
    const prefill = meta?.prefill;
    if (!prefill || prefillAppliedRef.current) return;
    setValues((prev) => {
      const next: FormState = { ...prev };
      if (prefill.name && !next.name.trim()) next.name = prefill.name;
      if (prefill.contact && !next.contact.trim()) next.contact = prefill.contact;
      if (prefill.reason && !next.reason.trim()) next.reason = prefill.reason;
      return next;
    });
    prefillAppliedRef.current = true;
  }, [open, meta?.prefill]);
  const setField = useCallback((field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const nextErrors = validate(values);
      setErrors(nextErrors);
      setSubmitError("");
      if (Object.keys(nextErrors).length > 0) return;
      const payload = {
        name: values.name.trim(),
        contact: values.contact.trim(),
        reason: values.reason.trim(),
        page: page || "/",
        timestamp: new Date().toISOString(),
      };
      console.log("[analytics] consultation_form_submitted", {
        page: payload.page,
        source: meta?.source ?? "unknown",
        context: meta?.context ?? null,
      });
      setStatus("loading");
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("[ConsultationForm] /api/leads failed:", { status: res.status, text });
          setStatus("error");
          setSubmitError("We couldn’t submit your request right now. Please try again in a moment.");
          return;
        }
        const json = (await res.json().catch(() => null)) as { success?: boolean; error?: string } | null;
        if (!json?.success) {
          console.error("[ConsultationForm] /api/leads returned non-success:", json);
          setStatus("error");
          setSubmitError(json?.error || "We couldn’t submit your request right now. Please try again.");
          return;
        }
        setStatus("success");
        toast.success("Request received. A partner will contact you shortly.");
      } catch (err) {
        console.error("[ConsultationForm] Network error submitting lead:", err);
        setStatus("error");
        setSubmitError("Network error. Please check your connection and retry.");
      }
    },
    [values, page, meta],
  );
  const content = (
    <AnimatePresence mode="wait" initial={false}>
      {status !== "success" ? (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6" aria-describedby={descId}>
            <div className="grid gap-2">
              <Label htmlFor="consultation-name">Name</Label>
              <Input
                id="consultation-name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Your full name"
                className={cn("h-11", errors.name ? "border-destructive focus-visible:ring-destructive" : "")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "consultation-name-error" : undefined}
                autoComplete="name"
                disabled={status === "loading"}
              />
              {errors.name ? (
                <p id="consultation-name-error" className="text-sm text-destructive">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="consultation-contact">Contact</Label>
              <Input
                id="consultation-contact"
                value={values.contact}
                onChange={(e) => setField("contact", e.target.value)}
                placeholder="Email or phone number"
                className={cn("h-11", errors.contact ? "border-destructive focus-visible:ring-destructive" : "")}
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? "consultation-contact-error" : undefined}
                autoComplete="email"
                disabled={status === "loading"}
              />
              {errors.contact ? (
                <p id="consultation-contact-error" className="text-sm text-destructive">
                  {errors.contact}
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="consultation-reason">Reason for Appointment</Label>
              <Textarea
                id="consultation-reason"
                value={values.reason}
                onChange={(e) => setField("reason", e.target.value)}
                placeholder="Briefly describe what you need help with…"
                className={cn(
                  "min-h-[110px] resize-none",
                  errors.reason ? "border-destructive focus-visible:ring-destructive" : "",
                )}
                aria-invalid={!!errors.reason}
                aria-describedby={errors.reason ? "consultation-reason-error" : undefined}
                disabled={status === "loading"}
              />
              {errors.reason ? (
                <p id="consultation-reason-error" className="text-sm text-destructive">
                  {errors.reason}
                </p>
              ) : null}
            </div>
            {status === "error" ? (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-foreground" role="alert">
                <div className="flex gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 text-destructive" />
                  <div className="space-y-1">
                    <p className="font-semibold">Submission failed</p>
                    <p className="text-muted-foreground">{submitError || "Please try again."}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="rounded-full" disabled={status === "loading"}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="rounded-full bg-[#B45309] hover:bg-[#92400E] text-white border-none shadow-glow"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Request Consultation
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By submitting, you agree to be contacted by LexCorp regarding your inquiry. Do not send sensitive or privileged information through this form.
            </p>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-[#B45309]/25 bg-[#B45309]/5 p-5">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#B45309]" />
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Thank you — your request is received.</p>
                <p className="text-sm text-muted-foreground">
                  A senior partner will review your inquiry and respond using your preferred contact method.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-full">
                Return to page
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" className="rounded-full bg-[#0F172A] hover:bg-[#B45309] text-white border-none">
                Close
              </Button>
            </DialogClose>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-labelledby={titleId} aria-describedby={descId} className="max-w-lg rounded-3xl p-0 overflow-hidden border-border/70 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#B45309]/10 via-transparent to-transparent pointer-events-none" />
          <div className="p-6 sm:p-8 relative">
            <DialogHeader className="space-y-2">
              <DialogTitle id={titleId} className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                Request a Confidential Consultation
              </DialogTitle>
              <DialogDescription id={descId} className="text-muted-foreground">
                Share a few details and our team will follow up promptly.
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 rounded-full hover:bg-accent/20"
                aria-label="Close consultation form"
                disabled={status === "loading"}
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
            <div className="mt-6">{content}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}