import { useEffect, useState } from "react";
import { getSectionVisibility, type SectionVisibility } from "@/lib/sectionVisibility";

export const useSectionVisibility = () => {
  const [visibility, setVisibility] = useState<SectionVisibility>(getSectionVisibility());

  useEffect(() => {
    const refresh = () => setVisibility(getSectionVisibility());
    window.addEventListener("storage", refresh);
    window.addEventListener("section-visibility-updated", refresh as EventListener);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("section-visibility-updated", refresh as EventListener);
    };
  }, []);

  return visibility;
};
