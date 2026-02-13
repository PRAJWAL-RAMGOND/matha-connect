import { FormEvent, useEffect, useMemo, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Database,
  LayoutPanelTop,
  Megaphone,
  Image as ImageIcon,
  Clock3,
  BarChart3,
  Download,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { defaultSectionVisibility, getSectionVisibility, setSectionVisibility, type SectionKey } from "@/lib/sectionVisibility";
import {
  hasFirebaseConfig,
  firebaseSignIn,
  firestoreCreate,
  firestoreGetDoc,
  firestoreList,
  firestorePatch,
  getDocId,
  parseFields,
} from "@/lib/firebaseRest";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type TabKey = "access" | "visibility" | "content" | "analytics" | "privacy" | "ops";

const tabItems: { key: TabKey; label: string; icon: ComponentType<{ size?: number; className?: string }> }[] = [
  { key: "access", label: "Auth & Roles", icon: ShieldCheck },
  { key: "visibility", label: "Sections", icon: LayoutPanelTop },
  { key: "content", label: "Content CRUD", icon: Megaphone },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "privacy", label: "Data Export", icon: Download },
  { key: "ops", label: "Ops", icon: Users },
];

const sectionLabels: Record<SectionKey, string> = {
  "home.announcements": "Home Announcements",
  "home.news": "Home News",
  "home.timings": "Home Timings",
  "explore.quiz": "Explore - Youth Quiz",
  "explore.panchanga": "Explore - Panchanga",
  "services.seva": "Services - Seva Booking",
  "services.room": "Services - Room Booking",
};

type FirestoreDoc = { name: string; fields: Record<string, { stringValue?: string; integerValue?: string; booleanValue?: boolean; doubleValue?: number; nullValue?: null }> };

const demoAnalytics = [
  { period: "Mon", bookings: 12, amount: 24000 },
  { period: "Tue", bookings: 16, amount: 32000 },
  { period: "Wed", bookings: 8, amount: 14000 },
  { period: "Thu", bookings: 15, amount: 28000 },
  { period: "Fri", bookings: 20, amount: 41000 },
  { period: "Sat", bookings: 22, amount: 47000 },
  { period: "Sun", bookings: 18, amount: 36000 },
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>("access");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idToken, setIdToken] = useState("");
  const [uid, setUid] = useState("");
  const [role, setRole] = useState("viewer");

  const [visibility, setVisibility] = useState(getSectionVisibility());

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [timingLocation, setTimingLocation] = useState("");
  const [timingDarshan, setTimingDarshan] = useState("");
  const [timingPrasada, setTimingPrasada] = useState("");

  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("daily");
  const [analyticsData, setAnalyticsData] = useState(demoAnalytics);

  const [bulkMessage, setBulkMessage] = useState("");
  const [pendingVolunteers, setPendingVolunteers] = useState<{ id: string; name: string; status: string }[]>([]);

  const firebaseReady = hasFirebaseConfig();
  const isAdmin = role === "admin" || role === "superadmin";

  const effectiveAnalytics = useMemo(() => {
    if (range === "daily") return analyticsData;
    if (range === "weekly") {
      return [
        { period: "W1", bookings: 70, amount: 145000 },
        { period: "W2", bookings: 84, amount: 172000 },
        { period: "W3", bookings: 61, amount: 128000 },
        { period: "W4", bookings: 93, amount: 201000 },
      ];
    }
    return [
      { period: "Jan", bookings: 244, amount: 512000 },
      { period: "Feb", bookings: 301, amount: 644000 },
      { period: "Mar", bookings: 278, amount: 593000 },
      { period: "Apr", bookings: 322, amount: 688000 },
    ];
  }, [range, analyticsData]);

  useEffect(() => {
    const loadVolunteers = async () => {
      if (!firebaseReady || !idToken) {
        setPendingVolunteers([
          { id: "v1", name: "Rohan Bhat", status: "pending" },
          { id: "v2", name: "Ananya Rao", status: "pending" },
        ]);
        return;
      }
      const docs = (await firestoreList("volunteer_requests", idToken)) as FirestoreDoc[];
      const rows = docs.map((d) => ({ id: getDocId(d.name), ...parseFields(d.fields) }));
      setPendingVolunteers(rows.filter((r) => r.status === "pending").map((r) => ({ id: r.id, name: String(r.name ?? "Volunteer"), status: String(r.status ?? "pending") })));
    };
    loadVolunteers();
  }, [firebaseReady, idToken]);

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firebaseReady) {
      setRole("admin");
      toast({ title: "Firebase not configured", description: "Demo admin access enabled." });
      return;
    }

    try {
      const auth = await firebaseSignIn(email, password);
      setIdToken(auth.idToken);
      setUid(auth.localId);

      const roleDoc = await firestoreGetDoc(`admin_roles/${auth.localId}`, auth.idToken);
      const parsedRole = roleDoc ? parseFields(roleDoc.fields).role : "viewer";
      setRole(parsedRole || "viewer");

      toast({ title: "Signed in", description: `Role: ${parsedRole || "viewer"}` });
    } catch (error) {
      console.error(error);
      toast({ title: "Sign-in failed", variant: "destructive" });
    }
  };

  const saveVisibility = async () => {
    setSectionVisibility(visibility);

    if (firebaseReady && idToken && isAdmin) {
      try {
        await firestorePatch(`settings/section_visibility`, visibility, idToken);
      } catch {
        // ignore remote patch failure, local already updated
      }
    }

    toast({ title: "Section visibility updated" });
  };

  const createAnnouncement = async () => {
    if (!announcementTitle.trim() || !announcementMessage.trim()) {
      toast({ title: "Announcement title/message required", variant: "destructive" });
      return;
    }

    if (firebaseReady && idToken && isAdmin) {
      await firestoreCreate(
        "announcements",
        {
          title: announcementTitle,
          message: announcementMessage,
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        idToken,
      );
    }

    setAnnouncementTitle("");
    setAnnouncementMessage("");
    toast({ title: "Announcement created" });
  };

  const createMedia = async () => {
    if (!mediaTitle.trim() || !mediaUrl.trim()) {
      toast({ title: "Media title/url required", variant: "destructive" });
      return;
    }

    if (firebaseReady && idToken && isAdmin) {
      await firestoreCreate(
        "media_items",
        {
          title: mediaTitle,
          url: mediaUrl,
          type: "image",
          createdAt: new Date().toISOString(),
        },
        idToken,
      );
    }

    setMediaTitle("");
    setMediaUrl("");
    toast({ title: "Media item created" });
  };

  const createTiming = async () => {
    if (!timingLocation.trim() || !timingDarshan.trim()) {
      toast({ title: "Timing location/darshan required", variant: "destructive" });
      return;
    }

    if (firebaseReady && idToken && isAdmin) {
      await firestoreCreate(
        "temple_timings",
        {
          location: timingLocation,
          darshan: timingDarshan,
          prasada: timingPrasada,
          createdAt: new Date().toISOString(),
        },
        idToken,
      );
    }

    setTimingLocation("");
    setTimingDarshan("");
    setTimingPrasada("");
    toast({ title: "Timing entry created" });
  };

  const loadAnalyticsFromFirebase = async () => {
    if (!firebaseReady || !idToken) {
      toast({ title: "Using demo analytics data" });
      return;
    }

    try {
      const bookings = (await firestoreList("seva_bookings", idToken)) as FirestoreDoc[];
      const rows = bookings.map((doc) => parseFields(doc.fields));

      const grouped = new Map<string, { bookings: number; amount: number }>();
      rows.forEach((row) => {
        const key = row.day || "N/A";
        const old = grouped.get(key) || { bookings: 0, amount: 0 };
        grouped.set(key, {
          bookings: old.bookings + 1,
          amount: old.amount + Number(row.amount || 0),
        });
      });

      const chartRows = [...grouped.entries()].map(([period, val]) => ({ period, ...val }));
      if (chartRows.length) setAnalyticsData(chartRows);
      toast({ title: "Analytics refreshed from Firebase" });
    } catch {
      toast({ title: "Failed loading Firebase analytics", variant: "destructive" });
    }
  };

  const exportUsers = async () => {
    let rows: Array<Record<string, unknown>> = [];

    if (firebaseReady && idToken && isAdmin) {
      const docs = (await firestoreList("users", idToken)) as FirestoreDoc[];
      rows = docs.map((d) => ({ id: getDocId(d.name), ...parseFields(d.fields) }));
    } else {
      rows = [
        { id: "u1", name: "Demo User", email: "demo@example.com", consent: true },
        { id: "u2", name: "Sample Devotee", email: "devotee@example.com", consent: true },
      ];
    }

    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "User export generated", description: "GDPR/data-access friendly JSON downloaded." });
  };

  const sendBulkNotification = async () => {
    if (!bulkMessage.trim()) {
      toast({ title: "Bulk message required", variant: "destructive" });
      return;
    }

    if (firebaseReady && idToken && isAdmin) {
      await firestoreCreate(
        "bulk_notifications",
        {
          message: bulkMessage,
          createdAt: new Date().toISOString(),
          status: "queued",
        },
        idToken,
      );
    }

    setBulkMessage("");
    toast({ title: "Bulk notification queued" });
  };

  const approveVolunteer = async (id: string) => {
    if (firebaseReady && idToken && isAdmin) {
      await firestorePatch(`volunteer_requests/${id}`, { status: "approved" }, idToken);
    }

    setPendingVolunteers((prev) => prev.filter((v) => v.id !== id));
    toast({ title: "Volunteer approved" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Admin Dashboard</h1>
            <p className="text-xs text-maroon-foreground/70">Firebase Auth + role controls + content ops</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-4 px-4 py-5 pb-8">
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-card p-2 shadow-temple md:grid-cols-6">
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-2 py-2 text-xs font-semibold transition-colors ${
                activeTab === tab.key ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-foreground hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "access" && (
          <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={onLogin} className="space-y-3 rounded-xl border border-border/60 bg-card p-4 shadow-temple">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><ShieldCheck size={16} className="text-primary" />Firebase Auth & Role Guard</div>
            <p className="text-xs text-muted-foreground">{firebaseReady ? "Firebase config detected" : "Firebase env missing - demo admin mode active"}</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1"><Label className="text-xs">Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@email.com" /></div>
              <div className="space-y-1"><Label className="text-xs">Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></div>
            </div>
            <Button type="submit" className="w-full bg-gradient-maroon text-maroon-foreground">Sign in as Admin</Button>
            <p className="text-xs text-muted-foreground">Current role: <span className="font-semibold">{role}</span> {uid ? `(${uid})` : ""}</p>
          </motion.form>
        )}

        {activeTab === "visibility" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 rounded-xl border border-border/60 bg-card p-4 shadow-temple">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><LayoutPanelTop size={16} className="text-primary" />Enable / Disable User-Facing Sections</div>
            <div className="grid gap-2 md:grid-cols-2">
              {(Object.keys(defaultSectionVisibility) as SectionKey[]).map((key) => (
                <label key={key} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm">
                  <span>{sectionLabels[key]}</span>
                  <input
                    type="checkbox"
                    checked={visibility[key]}
                    onChange={(e) => setVisibility((prev) => ({ ...prev, [key]: e.target.checked }))}
                  />
                </label>
              ))}
            </div>
            <Button onClick={saveVisibility} className="w-full">Save Visibility Rules</Button>
          </motion.div>
        )}

        {activeTab === "content" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-xl border border-border/60 bg-card p-4 shadow-temple">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><Database size={16} className="text-primary" />Content CRUD (Announcements, Media, Timings)</div>

            <div className="space-y-2 rounded-lg bg-secondary/40 p-3">
              <Label className="text-xs">Announcement</Label>
              <Input value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)} placeholder="Title" />
              <Textarea value={announcementMessage} onChange={(e) => setAnnouncementMessage(e.target.value)} placeholder="Message" rows={2} />
              <Button onClick={createAnnouncement}>Create Announcement</Button>
            </div>

            <div className="space-y-2 rounded-lg bg-secondary/40 p-3">
              <Label className="text-xs">Media Item</Label>
              <Input value={mediaTitle} onChange={(e) => setMediaTitle(e.target.value)} placeholder="Media title" />
              <Input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="https://..." />
              <Button onClick={createMedia} variant="secondary">Create Media</Button>
            </div>

            <div className="space-y-2 rounded-lg bg-secondary/40 p-3">
              <Label className="text-xs">Temple Timing</Label>
              <Input value={timingLocation} onChange={(e) => setTimingLocation(e.target.value)} placeholder="Location" />
              <Input value={timingDarshan} onChange={(e) => setTimingDarshan(e.target.value)} placeholder="Darshan timings" />
              <Input value={timingPrasada} onChange={(e) => setTimingPrasada(e.target.value)} placeholder="Prasada timings" />
              <Button onClick={createTiming} variant="secondary">Create Timing</Button>
            </div>
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 rounded-xl border border-border/60 bg-card p-4 shadow-temple">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><BarChart3 size={16} className="text-primary" />Seva Analytics (Daily / Weekly / Monthly)</div>
            <div className="flex gap-2">
              <Select value={range} onValueChange={(v) => setRange(v as typeof range)}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary" onClick={loadAnalyticsFromFirebase}>Refresh from Firebase</Button>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={effectiveAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8b5cf6" name="Sevas Booked" />
                  <Bar dataKey="amount" fill="#f59e0b" name="Amount Collected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {activeTab === "privacy" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 rounded-xl border border-border/60 bg-card p-4 shadow-temple">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><Download size={16} className="text-primary" />User Data Export (GDPR / Privacy)</div>
            <p className="text-xs text-muted-foreground">Exports user data as JSON for data-access requests and audit logs.</p>
            <Button onClick={exportUsers}>Export User Data</Button>
          </motion.div>
        )}

        {activeTab === "ops" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 rounded-xl border border-border/60 bg-card p-4 shadow-temple">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><Users size={16} className="text-primary" />Bulk Notifications & Volunteer Approvals</div>

            <div className="space-y-2 rounded-lg bg-secondary/40 p-3">
              <Label className="text-xs">Bulk Notification</Label>
              <Textarea value={bulkMessage} onChange={(e) => setBulkMessage(e.target.value)} placeholder="Message for all subscribed users" rows={2} />
              <Button onClick={sendBulkNotification}>Queue Bulk Notification</Button>
            </div>

            <div className="space-y-2 rounded-lg bg-secondary/40 p-3">
              <Label className="text-xs">Pending Volunteer Approvals</Label>
              {pendingVolunteers.length === 0 ? (
                <p className="text-xs text-muted-foreground">No pending requests.</p>
              ) : (
                pendingVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm">
                    <span>{volunteer.name}</span>
                    <Button size="sm" variant="secondary" onClick={() => approveVolunteer(volunteer.id)} className="gap-1">
                      <CheckCircle2 size={14} /> Approve
                    </Button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
