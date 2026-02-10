import { motion } from "framer-motion";
import { BookOpen, Image, MapPin, Users, Trophy, Scroll } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";

const sections = [
  { icon: Users, label: "Guru Parampara", desc: "History & lineage of the Matha", color: "bg-gradient-maroon", route: "/explore/guru-parampara" },
  { icon: Image, label: "Gallery", desc: "Photos & videos from events", color: "bg-gradient-saffron", route: null },
  { icon: Scroll, label: "Publications", desc: "Pravachana, books & references", color: "bg-gradient-maroon", route: null },
  { icon: MapPin, label: "Branches", desc: "Find Matha branches near you", color: "bg-gradient-saffron", route: null },
  { icon: Trophy, label: "Youth Quiz", desc: "Test your knowledge of Siddhanta", color: "bg-gradient-maroon", route: null },
  { icon: BookOpen, label: "Panchanga", desc: "Tithinirnaya Panchanga", color: "bg-gradient-saffron", route: null },
];

const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-maroon px-4 pb-8 pt-12">
        <h1 className="font-display text-xl font-bold text-maroon-foreground">Explore</h1>
        <p className="mt-1 text-xs text-maroon-foreground/70">Discover the spiritual heritage</p>
      </div>
      <div className="-mt-4 relative z-10">
        <SearchBar />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 px-4 pb-6">
        {sections.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => item.route && navigate(item.route)}
            className="flex flex-col items-center gap-2 rounded-xl bg-card p-5 shadow-temple transition-transform hover:scale-[1.02] active:scale-95"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color}`}>
              <item.icon size={22} className="text-maroon-foreground" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground">{item.label}</span>
            <span className="text-[10px] text-muted-foreground text-center leading-tight">{item.desc}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Explore;
