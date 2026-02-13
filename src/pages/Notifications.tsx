import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Calendar, HandHeart, AlertCircle, Megaphone, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "announcement" | "event" | "seva" | "alert";
  priority: "low" | "medium" | "high";
  link: string | null;
  created_at: string;
}

const fallbackNotifications: Notification[] = [
  {
    id: "n1",
    title: "Panchanga updated for the week",
    message: "Daily tithi and muhurta details are now available in Explore → Panchanga.",
    type: "announcement",
    priority: "medium",
    link: "/explore/panchanga",
    created_at: new Date().toISOString(),
  },
  {
    id: "n2",
    title: "Seva booking slots open",
    message: "New seva entries are now active in Services → Seva Booking.",
    type: "seva",
    priority: "high",
    link: "/services/seva",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "n3",
    title: "Upcoming Aradhana reminder",
    message: "Check Events section for upcoming dates and observances.",
    type: "event",
    priority: "low",
    link: "/events",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "announcement" | "event" | "seva" | "alert">("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setNotifications(fallbackNotifications);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/notifications?is_active=eq.true&select=*&order=created_at.desc`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        },
      );
      const data = await response.json();
      setNotifications(Array.isArray(data) && data.length ? data : fallbackNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications(fallbackNotifications);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = useMemo(
    () => notifications.filter((notification) => filter === "all" || notification.type === filter),
    [notifications, filter],
  );

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return Megaphone;
      case "event":
        return Calendar;
      case "seva":
        return HandHeart;
      case "alert":
        return AlertCircle;
    }
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "announcement":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "event":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "seva":
        return "bg-saffron/10 text-saffron-foreground border-saffron/20";
      case "alert":
        return "bg-red-500/10 text-red-600 border-red-500/20";
    }
  };

  const getPriorityBadge = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "low":
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Notifications</h1>
            <p className="text-xs text-maroon-foreground/70">{notifications.length} active notifications</p>
          </div>
          <div className="relative">
            <Bell size={24} className="text-maroon-foreground" />
            {notifications.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-[10px] font-bold text-saffron-foreground">
                {notifications.length}
              </span>
            ) : null}
          </div>
        </div>

        <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card/20">
            <TabsTrigger value="all" className="text-[10px] data-[state=active]:bg-card">All</TabsTrigger>
            <TabsTrigger value="announcement" className="text-[10px] data-[state=active]:bg-card">News</TabsTrigger>
            <TabsTrigger value="event" className="text-[10px] data-[state=active]:bg-card">Events</TabsTrigger>
            <TabsTrigger value="seva" className="text-[10px] data-[state=active]:bg-card">Seva</TabsTrigger>
            <TabsTrigger value="alert" className="text-[10px] data-[state=active]:bg-card">Alerts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3 px-4 py-4 pb-6">
        {loading ? (
          [...Array(4)].map((_, index) => <div key={index} className="h-24 animate-pulse rounded-xl bg-muted" />)
        ) : filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell size={48} className="mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const TypeIcon = getTypeIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`relative rounded-xl border-2 p-4 shadow-temple transition-all hover:scale-[1.01] ${getTypeColor(notification.type)}`}
              >
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-background/50">
                    <TypeIcon size={20} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-sm font-semibold leading-tight">{notification.title}</h3>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] opacity-70">{formatDate(notification.created_at)}</span>
                        {notification.priority !== "low" ? (
                          <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed opacity-90">{notification.message}</p>

                    {notification.link ? (
                      <button
                        onClick={() => {
                          if (notification.link?.startsWith("http")) {
                            window.open(notification.link, "_blank", "noopener,noreferrer");
                            return;
                          }
                          navigate(notification.link as string);
                        }}
                        className="mt-2 flex items-center gap-1 text-xs font-medium hover:underline"
                      >
                        View Details
                        <ExternalLink size={12} />
                      </button>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
