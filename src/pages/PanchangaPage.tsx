import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar as CalendarIcon, Sun, Moon, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PanchangaData {
  id: string;
  date: string;
  tithi: string;
  paksha: string;
  vaara: string;
  nakshatra: string;
  yoga: string | null;
  karana: string | null;
  sunrise: string | null;
  sunset: string | null;
  moonrise: string | null;
  moonset: string | null;
  rahu_kala: string | null;
  special_events: string[] | null;
}

const PanchangaPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [panchanga, setPanchanga] = useState<PanchangaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPanchanga(selectedDate);
  }, [selectedDate]);

  const fetchPanchanga = async (date: Date) => {
    setLoading(true);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/panchanga_data?date=eq.${dateStr}&select=*`,
        {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          }
        }
      );
      const data = await response.json();
      setPanchanga(data && data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error fetching panchanga:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/explore")} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Panchanga</h1>
            <p className="text-xs text-maroon-foreground/70">Tithinirnaya Panchanga</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start rounded-xl border-border bg-card shadow-temple text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : panchanga ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="rounded-xl bg-gradient-saffron p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-saffron-foreground/70 uppercase tracking-wider">Tithi</p>
                  <p className="text-sm font-semibold text-saffron-foreground">{panchanga.paksha} {panchanga.tithi}</p>
                </div>
                <div>
                  <p className="text-[10px] text-saffron-foreground/70 uppercase tracking-wider">Vaara</p>
                  <p className="text-sm font-semibold text-saffron-foreground">{panchanga.vaara}</p>
                </div>
                <div>
                  <p className="text-[10px] text-saffron-foreground/70 uppercase tracking-wider">Nakshatra</p>
                  <p className="text-sm font-semibold text-saffron-foreground">{panchanga.nakshatra}</p>
                </div>
                {panchanga.yoga && (
                  <div>
                    <p className="text-[10px] text-saffron-foreground/70 uppercase tracking-wider">Yoga</p>
                    <p className="text-sm font-semibold text-saffron-foreground">{panchanga.yoga}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-card p-4 shadow-temple space-y-3">
              <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
                <Sun size={16} className="text-primary" />
                Sun & Moon Timings
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {panchanga.sunrise && (
                  <div>
                    <p className="text-muted-foreground">Sunrise</p>
                    <p className="font-medium text-foreground">{panchanga.sunrise}</p>
                  </div>
                )}
                {panchanga.sunset && (
                  <div>
                    <p className="text-muted-foreground">Sunset</p>
                    <p className="font-medium text-foreground">{panchanga.sunset}</p>
                  </div>
                )}
                {panchanga.moonrise && (
                  <div>
                    <p className="text-muted-foreground">Moonrise</p>
                    <p className="font-medium text-foreground">{panchanga.moonrise}</p>
                  </div>
                )}
                {panchanga.moonset && (
                  <div>
                    <p className="text-muted-foreground">Moonset</p>
                    <p className="font-medium text-foreground">{panchanga.moonset}</p>
                  </div>
                )}
              </div>
            </div>

            {panchanga.rahu_kala && (
              <div className="rounded-xl bg-card p-4 shadow-temple">
                <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-destructive" />
                  Rahu Kala
                </h3>
                <p className="text-xs text-foreground">{panchanga.rahu_kala}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Not auspicious for new beginnings</p>
              </div>
            )}

            {panchanga.special_events && panchanga.special_events.length > 0 && (
              <div className="rounded-xl bg-card p-4 shadow-temple">
                <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-primary" />
                  Special Events
                </h3>
                <ul className="space-y-1.5">
                  {panchanga.special_events.map((event, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CalendarIcon size={48} className="text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No panchanga data available for this date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanchangaPage;
