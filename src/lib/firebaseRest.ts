export type FirebaseConfig = {
  apiKey: string;
  projectId: string;
};

const getConfig = (): FirebaseConfig | null => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
  if (!apiKey || !projectId) return null;
  return { apiKey, projectId };
};

export const hasFirebaseConfig = () => Boolean(getConfig());

export const firebaseSignIn = async (email: string, password: string) => {
  const cfg = getConfig();
  if (!cfg) throw new Error("Firebase not configured");

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${cfg.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    },
  );
  if (!res.ok) throw new Error(`sign-in failed: ${res.status}`);
  return (await res.json()) as { idToken: string; localId: string; email: string };
};

export const firestoreBase = () => {
  const cfg = getConfig();
  if (!cfg) throw new Error("Firebase not configured");
  return `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents`;
};


export const firestoreGetDoc = async (documentPath: string, idToken?: string) => {
  const headers: Record<string, string> = {};
  if (idToken) headers.Authorization = `Bearer ${idToken}`;
  const res = await fetch(`${firestoreBase()}/${documentPath}`, { headers });
  if (!res.ok) return null;
  return res.json();
};

export const firestoreList = async (collection: string, idToken?: string) => {
  const headers: Record<string, string> = {};
  if (idToken) headers.Authorization = `Bearer ${idToken}`;
  const res = await fetch(`${firestoreBase()}/${collection}`, { headers });
  if (!res.ok) return [];
  const json = await res.json();
  return json.documents ?? [];
};

export const firestoreCreate = async (collection: string, fields: Record<string, unknown>, idToken?: string) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (idToken) headers.Authorization = `Bearer ${idToken}`;

  const toFirestoreFields = (obj: Record<string, unknown>) => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string") out[k] = { stringValue: v };
      else if (typeof v === "number") out[k] = { integerValue: Math.round(v) };
      else if (typeof v === "boolean") out[k] = { booleanValue: v };
      else if (v === null || v === undefined) out[k] = { nullValue: null };
      else out[k] = { stringValue: String(v) };
    }
    return out;
  };

  const res = await fetch(`${firestoreBase()}/${collection}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fields: toFirestoreFields(fields) }),
  });
  if (!res.ok) throw new Error(`create failed: ${res.status}`);
  return res.json();
};

export const firestorePatch = async (documentPath: string, fields: Record<string, unknown>, idToken?: string) => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (idToken) headers.Authorization = `Bearer ${idToken}`;

  const toFirestoreFields = (obj: Record<string, unknown>) => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === "string") out[k] = { stringValue: v };
      else if (typeof v === "number") out[k] = { integerValue: Math.round(v) };
      else if (typeof v === "boolean") out[k] = { booleanValue: v };
      else if (v === null || v === undefined) out[k] = { nullValue: null };
      else out[k] = { stringValue: String(v) };
    }
    return out;
  };

  const params = new URLSearchParams();
  Object.keys(fields).forEach((k) => params.append("updateMask.fieldPaths", k));

  const res = await fetch(`${firestoreBase()}/${documentPath}?${params.toString()}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ fields: toFirestoreFields(fields) }),
  });
  if (!res.ok) throw new Error(`patch failed: ${res.status}`);
  return res.json();
};

export const getDocId = (name: string) => name.split("/").pop() ?? name;

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  booleanValue?: boolean;
  doubleValue?: number;
  nullValue?: null;
};

export const parseFields = (fields: Record<string, FirestoreValue>) => {
  const out: Record<string, string | number | boolean | null | undefined> = {};
  for (const [k, v] of Object.entries(fields || {})) {
    out[k] =
      v.stringValue ??
      (v.integerValue !== undefined ? Number(v.integerValue) : undefined) ??
      v.booleanValue ??
      v.doubleValue ??
      null;
  }
  return out;
};
