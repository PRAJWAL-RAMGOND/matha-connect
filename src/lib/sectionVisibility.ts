export type SectionKey =
  | "home.announcements"
  | "home.news"
  | "home.timings"
  | "explore.quiz"
  | "explore.panchanga"
  | "services.seva"
  | "services.room";

export type SectionVisibility = Record<SectionKey, boolean>;

export const defaultSectionVisibility: SectionVisibility = {
  "home.announcements": true,
  "home.news": true,
  "home.timings": true,
  "explore.quiz": true,
  "explore.panchanga": true,
  "services.seva": true,
  "services.room": true,
};

const STORAGE_KEY = "admin:section-visibility";

export const getSectionVisibility = (): SectionVisibility => {
  if (typeof window === "undefined") return defaultSectionVisibility;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSectionVisibility;
    const parsed = JSON.parse(raw) as Partial<SectionVisibility>;
    return { ...defaultSectionVisibility, ...parsed };
  } catch {
    return defaultSectionVisibility;
  }
};

export const setSectionVisibility = (next: SectionVisibility) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("section-visibility-updated"));
};
