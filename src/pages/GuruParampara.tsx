import { motion } from "framer-motion";
import { ArrowLeft, MapPin, BookOpen, Calendar, User, ChevronRight, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gurus, bhootaraja } from "@/data/guruParampara";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

const GuruParampara = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-maroon px-4 pb-6 pt-12">
        <button onClick={() => navigate("/explore")} className="mb-3 flex items-center gap-1 text-maroon-foreground/80">
          <ArrowLeft size={18} />
          <span className="text-xs">Back</span>
        </button>
        <h1 className="font-display text-xl font-bold text-maroon-foreground">Guru Parampara</h1>
        <p className="mt-1 text-xs text-maroon-foreground/70">Sacred lineage of Sode Sri Vadiraja Matha</p>
      </div>

      {/* Timeline */}
      <div className="px-4 py-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

          {gurus.map((guru, i) => (
            <motion.div
              key={guru.id}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={fadeUp}
              className="relative mb-4 pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-3.5 top-4 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />

              <button
                onClick={() => navigate(`/explore/guru/${guru.id}`)}
                className="w-full rounded-xl bg-card p-4 shadow-temple text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold text-foreground">{guru.name}</p>
                    {guru.kannadaName && (
                      <p className="text-[11px] text-muted-foreground mt-0.5">{guru.kannadaName}</p>
                    )}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary" />
                      <span className="text-[11px] text-muted-foreground">{guru.period}</span>
                    </div>
                    {guru.title && (
                      <span className="mt-1.5 inline-block rounded-full bg-saffron/20 px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                        {guru.title}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground mt-1" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sri Bhootarajaru Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={gurus.length}
        variants={fadeUp}
        className="mx-4 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield size={18} className="text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Sri Bhootarajaru</h2>
        </div>
        <button
          onClick={() => navigate(`/explore/guru/${bhootaraja.id}`)}
          className="w-full rounded-xl bg-gradient-maroon p-4 shadow-temple text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <p className="font-display text-sm font-semibold text-maroon-foreground">{bhootaraja.name}</p>
          {bhootaraja.kannadaName && (
            <p className="text-[11px] text-maroon-foreground/70 mt-0.5">{bhootaraja.kannadaName}</p>
          )}
          <p className="mt-2 text-xs text-maroon-foreground/80 line-clamp-2">{bhootaraja.biography}</p>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[11px] text-maroon-foreground/70">View details</span>
            <ChevronRight size={14} className="text-maroon-foreground/70" />
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default GuruParampara;
