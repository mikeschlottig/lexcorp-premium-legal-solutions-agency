import React, { createContext } from "react";
import type { ConsultationMeta } from "@/components/ConsultationForm";
export type ConsultationContextValue = {
  openConsultation: (meta?: ConsultationMeta) => void;
  closeConsultation: () => void;
  isOpen: boolean;
};
export const ConsultationContext = createContext<ConsultationContextValue | null>(null);