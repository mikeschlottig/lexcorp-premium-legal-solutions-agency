import React, { useContext } from "react";
import { ConsultationContext, type ConsultationContextValue } from "@/components/consultation/consultation-context";
export function useConsultation(): ConsultationContextValue {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    // Avoid throwing to prevent an uncaught crash; provide safe fallbacks while logging for observability.
    console.error("[useConsultation] Hook used outside of ConsultationProvider.");
    return {
      openConsultation: () => {},
      closeConsultation: () => {},
      isOpen: false,
    };
  }
  return ctx;
}