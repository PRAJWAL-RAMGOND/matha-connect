import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar as CalendarIcon, Sun, Moon, Clock3, Sparkles, BellRing, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PanchangaTemplate {
  tithi: string;
  paksha: string;
  vaara: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahuKala: string;
  yamaGanda: string;
  gulikaKala: string;
  abhijitMuhurta: string;
  brahmaMuhurta: string;
  specialEvents: string[];
}

const panchangaTemplates: PanchangaTemplate[] = [
  {
    tithi: "Shukla Dwitiya",
    paksha: "Shukla",
    vaara: "Sunday",
    nakshatra: "Rohini",
    yoga: "Shubha",
    karana: "Balava",
    sunrise: "06:17 AM",
    sunset: "06:24 PM",
    moonrise: "08:44 AM",
    moonset: "09:40 PM",
    rahuKala: "04:52 PM – 06:24 PM",
    yamaGanda: "12:19 PM – 01:51 PM",
    gulikaKala: "03:20 PM – 04:52 PM",
    abhijitMuhurta: "12:01 PM – 12:49 PM",
    brahmaMuhurta: "04:41 AM – 05:29 AM",
    specialEvents: ["Tulasi Archane", "Madhyahna Mahapuja", "Evening Deepotsava"],
  },
  {
    tithi: "Shukla Tritiya",
    paksha: "Shukla",
    vaara: "Monday",
    nakshatra: "Mrigashira",
    yoga: "Siddha",
    karana: "Kaulava",
    sunrise: "06:16 AM",
    sunset: "06:23 PM",
    moonrise: "09:31 AM",
    moonset: "10:24 PM",
    rahuKala: "07:49 AM – 09:21 AM",
    yamaGanda: "10:54 AM – 12:26 PM",
    gulikaKala: "01:58 PM – 03:30 PM",
    abhijitMuhurta: "12:01 PM – 12:49 PM",
    brahmaMuhurta: "04:40 AM – 05:28 AM",
    specialEvents: ["Rudrabhisheka", "Parayana Satra", "Ratri Bhajane"],
  },
  {
    tithi: "Shukla Chaturthi",
    paksha: "Shukla",
    vaara: "Tuesday",
    nakshatra: "Ardra",
    yoga: "Dhruva",
    karana: "Taitila",
    sunrise: "06:16 AM",
    sunset: "06:23 PM",
    moonrise: "10:18 AM",
    moonset: "11:08 PM",
    rahuKala: "03:29 PM – 05:01 PM",
    yamaGanda: "09:20 AM – 10:52 AM",
    gulikaKala: "12:25 PM – 01:57 PM",
    abhijitMuhurta: "12:01 PM – 12:49 PM",
    brahmaMuhurta: "04:40 AM – 05:28 AM",
    specialEvents: ["Ganapati Archane", "Chaturthi Sankalpa", "Maha Mangalarati"],
  },
  {
    tithi: "Shukla Panchami",
    paksha: "Shukla",
    vaara: "Wednesday",
    nakshatra: "Punarvasu",
    yoga: "Harshana",
    karana: "Garaja",
    sunrise: "06:15 AM",
    sunset: "06:22 PM",
    moonrise: "11:04 AM",
    moonset: "11:53 PM",
    rahuKala: "12:24 PM – 01:56 PM",
    yamaGanda: "07:47 AM – 09:19 AM",
    gulikaKala: "10:51 AM – 12:23 PM",
    abhijitMuhurta: "12:00 PM – 12:48 PM",
    brahmaMuhurta: "04:39 AM – 05:27 AM",
    specialEvents: ["Hayagriva Stotra Parayana", "Vidya Seva", "Satsanga"],
  },
  {
    tithi: "Shukla Shashti",
    paksha: "Shukla",
    vaara: "Thursday",
    nakshatra: "Pushya",
    yoga: "Vajra",
    karana: "Vanija",
    sunrise: "06:15 AM",
    sunset: "06:22 PM",
    moonrise: "11:51 AM",
    moonset: "--",
    rahuKala: "01:56 PM – 03:28 PM",
    yamaGanda: "06:15 AM – 07:47 AM",
    gulikaKala: "09:19 AM – 10:51 AM",
    abhijitMuhurta: "12:00 PM – 12:48 PM",
    brahmaMuhurta: "04:39 AM – 05:27 AM",
    specialEvents: ["Guru Vandane", "Vishnu Sahasranama", "Deepa Seva"],
  },
  {
    tithi: "Shukla Saptami",
    paksha: "Shukla",
    vaara: "Friday",
    nakshatra: "Ashlesha",
    yoga: "Sukarma",
    karana: "Vishti",
    sunrise: "06:14 AM",
    sunset: "06:21 PM",
    moonrise: "12:36 PM",
    moonset: "12:39 AM",
    rahuKala: "10:50 AM – 12:22 PM",
    yamaGanda: "03:27 PM – 04:59 PM",
    gulikaKala: "07:46 AM – 09:18 AM",
    abhijitMuhurta: "12:00 PM – 12:48 PM",
    brahmaMuhurta: "04:38 AM – 05:26 AM",
    specialEvents: ["Lakshmi Pooja", "Evening Utsava", "Prasada Vitarane"],
  },
  {
    tithi: "Shukla Ashtami",
    paksha: "Shukla",
    vaara: "Saturday",
    nakshatra: "Magha",
    yoga: "Shobhana",
    karana: "Bava",
    sunrise: "06:14 AM",
    sunset: "06:21 PM",
    moonrise: "01:22 PM",
    moonset: "01:26 AM",
    rahuKala: "09:18 AM – 10:50 AM",
    yamaGanda: "01:55 PM – 03:27 PM",
    gulikaKala: "06:14 AM – 07:46 AM",
    abhijitMuhurta: "12:00 PM – 12:48 PM",
    brahmaMuhurta: "04:38 AM – 05:26 AM",
    specialEvents: ["Hanuman Chalisa Parayana", "Sankirtane", "Ratri Seva"],
  },
];

const PanchangaPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const panchanga = useMemo(() => panchangaTemplates[selectedDate.getDay()], [selectedDate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="sticky top-0 z-10 bg-gradient-maroon px-4 py-4">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <button onClick={() => navigate("/explore")} className="rounded-full p-1.5 hover:bg-maroon/20">
            <ArrowLeft size={20} className="text-maroon-foreground" />
          </button>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Panchanga</h1>
            <p className="text-xs text-maroon-foreground/75">Tithinirnaya Daily Essentials</p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-card/85 p-4 shadow-temple">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            <Sparkles size={12} />
            Daily Panchanga
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start rounded-xl border-border bg-background text-left font-normal shadow-temple",
                  !selectedDate && "text-muted-foreground",
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
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-gradient-saffron p-4 shadow-temple">
          <div className="grid grid-cols-2 gap-3 text-saffron-foreground">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-saffron-foreground/80">Tithi</p>
              <p className="text-sm font-semibold">{panchanga.paksha} {panchanga.tithi}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-saffron-foreground/80">Vaara</p>
              <p className="text-sm font-semibold">{panchanga.vaara}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-saffron-foreground/80">Nakshatra</p>
              <p className="text-sm font-semibold">{panchanga.nakshatra}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-saffron-foreground/80">Yoga</p>
              <p className="text-sm font-semibold">{panchanga.yoga}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-saffron-foreground/80">Karana</p>
              <p className="text-sm font-semibold">{panchanga.karana}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-saffron-foreground/80">Abhijit Muhurta</p>
              <p className="text-sm font-semibold">{panchanga.abhijitMuhurta}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-card p-4 shadow-temple">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-foreground"><Sun size={16} className="text-primary" />Sun Timings</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between"><span className="text-muted-foreground">Sunrise</span><span className="font-medium">{panchanga.sunrise}</span></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Sunset</span><span className="font-medium">{panchanga.sunset}</span></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Brahma Muhurta</span><span className="font-medium">{panchanga.brahmaMuhurta}</span></p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-card p-4 shadow-temple">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-foreground"><Moon size={16} className="text-primary" />Moon Timings</h3>
            <div className="space-y-2 text-sm">
              <p className="flex justify-between"><span className="text-muted-foreground">Moonrise</span><span className="font-medium">{panchanga.moonrise}</span></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Moonset</span><span className="font-medium">{panchanga.moonset}</span></p>
              <p className="flex justify-between"><span className="text-muted-foreground">Rahu Kala</span><span className="font-medium">{panchanga.rahuKala}</span></p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/60 bg-card p-4 shadow-temple">
          <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-foreground"><Clock3 size={16} className="text-primary" />Inauspicious / Neutral Time Windows</h3>
          <div className="grid gap-2 text-sm sm:grid-cols-3">
            <p className="rounded-xl bg-secondary/60 p-3"><span className="block text-xs text-muted-foreground">Rahu Kala</span><span className="font-medium">{panchanga.rahuKala}</span></p>
            <p className="rounded-xl bg-secondary/60 p-3"><span className="block text-xs text-muted-foreground">Yama Ganda</span><span className="font-medium">{panchanga.yamaGanda}</span></p>
            <p className="rounded-xl bg-secondary/60 p-3"><span className="block text-xs text-muted-foreground">Gulika Kala</span><span className="font-medium">{panchanga.gulikaKala}</span></p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold text-foreground"><BellRing size={16} className="text-primary" />Today’s Observances</h3>
          <ul className="space-y-1.5">
            {panchanga.specialEvents.map((event) => (
              <li key={event} className="flex items-start gap-2 text-sm text-foreground">
                <Star size={14} className="mt-0.5 text-primary" />
                <span>{event}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default PanchangaPage;
