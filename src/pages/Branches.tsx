import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string | null;
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  timings: string | null;
}

const Branches = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/branches?select=*&order=city.asc`, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });
      const data = await response.json();
      setBranches(data || []);
    } catch (error) {
      console.error("Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const states = Array.from(new Set(branches.map(b => b.state)));
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         branch.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === "all" || branch.state === stateFilter;
    return matchesSearch && matchesState;
  });

  const openMaps = (branch: Branch) => {
    if (branch.latitude && branch.longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`, '_blank');
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
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Branches</h1>
            <p className="text-xs text-maroon-foreground/70">Find Matha branches near you</p>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Search by city or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl border-maroon-foreground/20 bg-card/90 text-foreground"
          />
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="rounded-xl border-maroon-foreground/20 bg-card/90">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3 pb-6">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
          ))
        ) : filteredBranches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MapPin size={48} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No branches found</p>
          </div>
        ) : (
          filteredBranches.map((branch, i) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card p-4 shadow-temple space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-display text-base font-semibold text-foreground">{branch.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{branch.city}, {branch.state}</p>
                </div>
                {branch.latitude && branch.longitude && (
                  <button
                    onClick={() => openMaps(branch)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-saffron transition-transform hover:scale-105"
                  >
                    <Navigation size={16} className="text-saffron-foreground" />
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">{branch.address}, {branch.pincode}</p>
                </div>

                {branch.timings && (
                  <div className="flex items-start gap-2">
                    <Clock size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground">{branch.timings}</p>
                  </div>
                )}

                {branch.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <a href={`tel:${branch.phone}`} className="text-xs text-primary hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                )}

                {branch.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <a href={`mailto:${branch.email}`} className="text-xs text-primary hover:underline">
                      {branch.email}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Branches;
