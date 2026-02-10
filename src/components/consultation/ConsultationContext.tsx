import React, { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ConsultationForm, type ConsultationMeta } from "@/components/ConsultationForm";
import { ConsultationContext, type ConsultationContextValue } from "@/components/consultation/consultation-context";
export function ConsultationProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openPage, setOpenPage] = useState<string>("/");
  const [meta, setMeta] = useState<ConsultationMeta | null>(null);
  const openConsultation = useCallback(
    (nextMeta?: ConsultationMeta) => {
      const page = pathname || "/";
      setOpenPage(page);
      setMeta(nextMeta ?? null);
      setIsOpen(true);
      console.log("[analytics] consultation_modal_open", {
        page,
        source: nextMeta?.source ?? "unknown",
        context: nextMeta?.context ?? null,
      });
    },
    [pathname],
  );
  const closeConsultation = useCallback(() => {
    setIsOpen(false);
  }, []);
  const value = useMemo<ConsultationContextValue>(
    () => ({
      openConsultation,
      closeConsultation,
      isOpen,
    }),
    [openConsultation, closeConsultation, isOpen],
  );
  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) setMeta(null);
  }, []);
  return (
    <ConsultationContext.Provider value={value}>
      {children}
      <ConsultationForm open={isOpen} onOpenChange={handleOpenChange} page={openPage} meta={meta} />
    </ConsultationContext.Provider>
  );
}