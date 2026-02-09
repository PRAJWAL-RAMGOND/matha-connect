import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Bell } from "lucide-react";

const upcomingEvents = [
  { date: "Feb 15", title: "Magha Shudha Ekadashi", type: "Vrata" },
  { date: "Feb 19", title: "Magha Poornima", type: "Festival" },
  { date: "Mar 01", title: "Phalguna Shudha Ekadashi", type: "Vrata" },
  { date: "Mar 08", title: "Sri Vadiraja Aradhana", type: "Aradhana" },
  { date: "Mar 14", title: "Holi / Kamadahana", type: "Festival" },
  { date: "Mar 26", title: "Ugadi – Hindu New Year", type: "Festival" },
  { date: "Apr 06", title: "Sri Rama Navami", type: "Festival" },
  { date: "Apr 10", title: "Hanuman Jayanti", type: "Festival" },
];

const typeColors: Record<string, string> = {
  Vrata: "bg-saffron/20 text-saffron-foreground",
  Festival: "bg-gold/20 text-gold-foreground",
  Aradhana: "bg-maroon/10 text-maroon",
};

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-maroon px-4 pb-8 pt-12">
        <h1 className="font-display text-xl font-bold text-maroon-foreground">Events</h1>
        <p className="mt-1 text-xs text-maroon-foreground/70">Panchanga-based event calendar</p>
      </div>

      {/* Today's Panchanga */}
      <div className="-mt-4 relative z-10 mx-4">
        <div className="rounded-xl bg-card p-4 shadow-temple">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon size={16} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">Today's Panchanga</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-secondary p-2">
              <p className="text-[10px] text-muted-foreground">Tithi</p>
              <p className="text-xs font-semibold text-foreground">Shukla Dashami</p>
            </div>
            <div className="rounded-lg bg-secondary p-2">
              <p className="text-[10px] text-muted-foreground">Vaara</p>
              <p className="text-xs font-semibold text-foreground">Somavaara</p>
            </div>
            <div className="rounded-lg bg-secondary p-2">
              <p className="text-[10px] text-muted-foreground">Nakshatra</p>
              <p className="text-xs font-semibold text-foreground">Pushya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 px-4 pb-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">Upcoming Events</h2>
        <div className="space-y-2">
          {upcomingEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-temple"
            >
              <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-gradient-maroon">
                <span className="text-[10px] text-maroon-foreground/80">{event.date.split(" ")[0]}</span>
                <span className="text-sm font-bold text-maroon-foreground">{event.date.split(" ")[1]}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[event.type] || "bg-secondary text-foreground"}`}>
                  {event.type}
                </span>
              </div>
              <button className="rounded-full p-2 transition-colors hover:bg-secondary">
                <Bell size={16} className="text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
