import { useState, useEffect, useMemo } from "react";
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

const fallbackBranches: Branch[] = [
  {
    id: "b1",
    name: "Sri Sode Vadiraja Matha",
    address: "Car Street",
    city: "Udupi",
    state: "Karnataka",
    pincode: "576101",
    phone: "+91 820 252 1975",
    email: "info@sodevadirajamatha.org",
    latitude: 13.3414,
    longitude: 74.7466,
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
  },
  {
    id: "b2",
    name: "Sode Matha Bengaluru Branch",
    address: "Basavanagudi",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560004",
    phone: "+91 80 2650 4321",
    email: null,
    latitude: 12.9416,
    longitude: 77.5737,
    timings: "6:30 AM - 11:30 AM, 5:00 PM - 8:00 PM",
  },
  {
    id: "b3",
    name: "Sode Matha Mumbai Seva Kendra",
    address: "Matunga East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400019",
    phone: "+91 22 2401 2210",
    email: null,
    latitude: 19.0272,
    longitude: 72.8553,
    timings: "7:00 AM - 11:00 AM, 5:30 PM - 8:30 PM",
  },
];

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
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setBranches(fallbackBranches);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/branches?select=*&order=city.asc`, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      const data = await response.json();
      setBranches(Array.isArray(data) && data.length ? data : fallbackBranches);
    } catch (error) {
      console.error("Error fetching branches:", error);
      setBranches(fallbackBranches);
    } finally {
      setLoading(false);
    }
  };

  const states = useMemo(() => Array.from(new Set(branches.map((branch) => branch.state))), [branches]);

  const filteredBranches = useMemo(
    () =>
      branches.filter((branch) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          branch.name.toLowerCase().includes(q) ||
          branch.city.toLowerCase().includes(q) ||
          branch.state.toLowerCase().includes(q) ||
          branch.address.toLowerCase().includes(q);
        const matchesState = stateFilter === "all" || branch.state === stateFilter;
        return matchesSearch && matchesState;
      }),
    [branches, searchQuery, stateFilter],
  );

  const openMaps = (branch: Branch) => {
    const locationQuery =
      branch.latitude && branch.longitude
        ? `${branch.latitude},${branch.longitude}`
        : encodeURIComponent(`${branch.address}, ${branch.city}, ${branch.state} ${branch.pincode}`);

    window.open(`https://www.google.com/maps/search/?api=1&query=${locationQuery}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="mb-4 flex items-center gap-3">
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
            placeholder="Search by name, city, state..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="rounded-xl border-maroon-foreground/20 bg-card/90 text-foreground"
          />
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="rounded-xl border-maroon-foreground/20 bg-card/90">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="px-4 py-4 pb-6">
        <p className="mb-3 text-xs text-muted-foreground">{filteredBranches.length} branch(es) found</p>

        <div className="space-y-3">
          {loading ? (
            [...Array(3)].map((_, index) => <div key={index} className="h-40 animate-pulse rounded-xl bg-muted" />)
          ) : filteredBranches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MapPin size={48} className="mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No branches found</p>
            </div>
          ) : (
            filteredBranches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="rounded-xl border border-border/60 bg-card p-4 shadow-temple"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{branch.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {branch.city}, {branch.state} - {branch.pincode}
                    </p>
                  </div>
                  <button
                    onClick={() => openMaps(branch)}
                    className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                    title="Open in Google Maps"
                  >
                    <Navigation size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0 text-primary" />
                    <p className="text-xs text-foreground">{branch.address}</p>
                  </div>

                  {branch.timings && (
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="mt-0.5 flex-shrink-0 text-primary" />
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

                <button
                  onClick={() => openMaps(branch)}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Open directions
                  <ExternalLink size={12} />
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Branches;
