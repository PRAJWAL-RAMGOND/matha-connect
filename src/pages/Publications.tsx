import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Book, FileText, Mic, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/publications?select=*&order=created_at.desc`, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      const data = await response.json();
      setPublications(data || []);
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (pub.author && pub.author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === "all" || pub.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book": return Book;
      case "pravachana": return Mic;
      case "article": return FileText;
      default: return Book;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
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
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-xl border-maroon-foreground/20 bg-card/90 mb-3"
        />

        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-card text-xs">All</TabsTrigger>
            <TabsTrigger value="book" className="data-[state=active]:bg-card text-xs">Books</TabsTrigger>
            <TabsTrigger value="pravachana" className="data-[state=active]:bg-card text-xs">Pravachana</TabsTrigger>
            <TabsTrigger value="article" className="data-[state=active]:bg-card text-xs">Articles</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 py-4 space-y-3 pb-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
          ))
        ) : filteredPublications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Book size={48} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No publications found</p>
          </div>
        ) : (
          filteredPublications.map((pub, i) => {
            const TypeIcon = getTypeIcon(pub.type);
            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 rounded-xl bg-card p-4 shadow-temple"
              >
                <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                  {pub.cover_url ? (
                    <img src={pub.cover_url} alt={pub.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <TypeIcon size={24} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2">{pub.title}</h3>
                  {pub.author && (
                    <p className="text-xs text-muted-foreground">by {pub.author}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize">
                      {pub.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{pub.language}</span>
                    {pub.published_year && (
                      <span className="text-[10px] text-muted-foreground">{pub.published_year}</span>
                    )}
                  </div>
                  {pub.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{pub.description}</p>
                  )}
                </div>

                {pub.file_url && (
                  <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-saffron transition-transform hover:scale-105">
                    <Download size={16} className="text-saffron-foreground" />
                  </button>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Publications;
