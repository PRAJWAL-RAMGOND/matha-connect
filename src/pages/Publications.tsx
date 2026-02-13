import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Book, FileText, Mic, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface Publication {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  type: "book" | "pravachana" | "article";
  language: string;
  cover_url: string | null;
  file_url: string | null;
  published_year: number | null;
}

const fallbackPublications: Publication[] = [
  {
    id: "p1",
    title: "Dvaita Siddhanta Primer",
    author: "Matha Editorial Team",
    description: "Introductory reference for youth and beginners.",
    type: "book",
    language: "English",
    cover_url: null,
    file_url: null,
    published_year: 2025,
  },
  {
    id: "p2",
    title: "Sri Vadiraja Theertha - Selected Pravachanas",
    author: "Compilation Desk",
    description: "Audio discourse summaries and key points.",
    type: "pravachana",
    language: "Kannada",
    cover_url: null,
    file_url: null,
    published_year: 2024,
  },
  {
    id: "p3",
    title: "Understanding Panchanga for Daily Practice",
    author: "Scholars Wing",
    description: "Practical guide for tithi, vaara, nakshatra and muhurtas.",
    type: "article",
    language: "English",
    cover_url: null,
    file_url: null,
    published_year: 2026,
  },
];

const Publications = () => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "book" | "pravachana" | "article">("all");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setPublications(fallbackPublications);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/publications?select=*&order=created_at.desc`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });
      const data = await response.json();
      setPublications(Array.isArray(data) && data.length ? data : fallbackPublications);
    } catch (error) {
      console.error("Error fetching publications:", error);
      setPublications(fallbackPublications);
    } finally {
      setLoading(false);
    }
  };

  const filteredPublications = useMemo(
    () =>
      publications.filter((publication) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          publication.title.toLowerCase().includes(query) ||
          (publication.author && publication.author.toLowerCase().includes(query));
        const matchesFilter = filter === "all" || publication.type === filter;
        return matchesSearch && matchesFilter;
      }),
    [publications, searchQuery, filter],
  );

  const getTypeIcon = (type: Publication["type"]) => {
    switch (type) {
      case "book":
        return Book;
      case "pravachana":
        return Mic;
      case "article":
        return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={() => navigate("/explore")} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Publications</h1>
            <p className="text-xs text-maroon-foreground/70">Pravachana, books & references</p>
          </div>
        </div>

        <Input
          placeholder="Search publications..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="mb-3 rounded-xl border-maroon-foreground/20 bg-card/90"
        />

        <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/20">
            <TabsTrigger value="all" className="text-xs data-[state=active]:bg-card">All</TabsTrigger>
            <TabsTrigger value="book" className="text-xs data-[state=active]:bg-card">Books</TabsTrigger>
            <TabsTrigger value="pravachana" className="text-xs data-[state=active]:bg-card">Pravachana</TabsTrigger>
            <TabsTrigger value="article" className="text-xs data-[state=active]:bg-card">Articles</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-3 px-4 py-4 pb-6">
        {loading ? (
          [...Array(4)].map((_, index) => <div key={index} className="h-32 animate-pulse rounded-xl bg-muted" />)
        ) : filteredPublications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Book size={48} className="mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No publications found</p>
          </div>
        ) : (
          filteredPublications.map((publication, index) => {
            const TypeIcon = getTypeIcon(publication.type);

            return (
              <motion.div
                key={publication.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-temple"
              >
                <div className="flex h-20 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <TypeIcon size={24} className="text-muted-foreground" />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="line-clamp-2 font-display text-sm font-semibold text-foreground">{publication.title}</h3>
                  {publication.author ? <p className="text-xs text-muted-foreground">by {publication.author}</p> : null}
                  {publication.description ? <p className="line-clamp-2 text-xs text-muted-foreground">{publication.description}</p> : null}

                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium capitalize text-primary">
                      {publication.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{publication.language}</span>
                    {publication.published_year ? <span className="text-[10px] text-muted-foreground">{publication.published_year}</span> : null}
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <button className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      View
                      <ExternalLink size={12} />
                    </button>
                    <button className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
                      Download
                      <Download size={12} />
                    </button>
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

export default Publications;
