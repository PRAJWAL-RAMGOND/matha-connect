import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBanner from "@/assets/hero-banner.jpg";
import templeAmbiance from "@/assets/temple-ambiance.jpg";
import templeBell from "@/assets/temple-bell.jpg";
import swamijiVishwavallabha from "@/assets/swamiji-vishwavallabha.png";
import swamijiVishwothama from "@/assets/swamiji-vishwothama.png";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  category: string;
  event_date: string | null;
}

const fallbackItems: GalleryItem[] = [
  {
    id: "g1",
    title: "Temple Ambiance During Evening Deeparadhane",
    description: "",
    type: "image",
    url: templeAmbiance,
    thumbnail_url: templeAmbiance,
    category: "Temple",
    event_date: "2026-03-01",
  },
  {
    id: "g2",
    title: "Seva Highlights from Utsava Day",
    description: "",
    type: "image",
    url: templeBell,
    thumbnail_url: templeBell,
    category: "Seva",
    event_date: "2026-03-03",
  },
  {
    id: "g3",
    title: "Darshana Moments - Main Sanctum",
    description: "",
    type: "image",
    url: heroBanner,
    thumbnail_url: heroBanner,
    category: "Darshana",
    event_date: "2026-03-04",
  },
  {
    id: "g4",
    title: "Sri Vishwavallabha Theertha Swamiji",
    description: "",
    type: "image",
    url: swamijiVishwavallabha,
    thumbnail_url: swamijiVishwavallabha,
    category: "Guru Parampara",
    event_date: "2026-02-26",
  },
  {
    id: "g5",
    title: "Sri Vishwothama Theertha Swamiji",
    description: "",
    type: "image",
    url: swamijiVishwothama,
    thumbnail_url: swamijiVishwothama,
    category: "Guru Parampara",
    event_date: "2026-02-20",
  },
  {
    id: "g6",
    title: "Paryaya Celebrations Recap",
    description: "",
    type: "video",
    url: heroBanner,
    thumbnail_url: heroBanner,
    category: "Events",
    event_date: "2026-03-08",
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setItems(fallbackItems);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/gallery_items?select=*&order=created_at.desc`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      const data = await response.json();
      setItems(Array.isArray(data) && data.length ? data : fallbackItems);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setItems(fallbackItems);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = useMemo(() => items.filter((item) => filter === "all" || item.type === filter), [items, filter]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="mb-3 flex items-center gap-3">
          <button onClick={() => navigate("/explore")} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Gallery</h1>
            <p className="text-xs text-maroon-foreground/70">Photos & videos from events</p>
          </div>
        </div>

        <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-card">All</TabsTrigger>
            <TabsTrigger value="image" className="data-[state=active]:bg-card">Photos</TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-card">Videos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 py-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="aspect-square animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ImageIcon size={48} className="mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border/40 bg-card shadow-temple"
              >
                <img
                  src={item.thumbnail_url || item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {item.type === "video" && (
                  <div className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 backdrop-blur-sm">
                    <Video size={14} className="text-white" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="line-clamp-2 text-xs font-medium text-white">{item.title}</p>
                  {item.event_date ? (
                    <p className="mt-0.5 text-[10px] text-white/70">
                      {new Date(item.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
