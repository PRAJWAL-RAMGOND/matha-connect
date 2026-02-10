import { motion } from "framer-motion";
import { ArrowLeft, MapPin, BookOpen, Calendar, User, ExternalLink } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { gurus, bhootaraja } from "@/data/guruParampara";

const GuruDetail = () => {
  const navigate = useNavigate();
  const { guruId } = useParams<{ guruId: string }>();

  const allGurus = [...gurus, bhootaraja];
  const guru = allGurus.find((g) => g.id === guruId);

  if (!guru) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Guru not found</p>
      </div>
    );
  }

  const mapsUrl = guru.vrindavanaLocation
    ? `https://www.google.com/maps/search/?api=1&query=${guru.vrindavanaLocation.lat},${guru.vrindavanaLocation.lng}`
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-maroon px-4 pb-6 pt-12">
        <button onClick={() => navigate("/explore/guru-parampara")} className="mb-3 flex items-center gap-1 text-maroon-foreground/80">
          <ArrowLeft size={18} />
          <span className="text-xs">Back</span>
        </button>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-lg font-bold text-maroon-foreground">{guru.name}</h1>
          {guru.kannadaName && (
            <p className="mt-0.5 text-xs text-maroon-foreground/70">{guru.kannadaName}</p>
          )}
          {guru.title && (
            <span className="mt-2 inline-block rounded-full bg-saffron/30 px-2.5 py-0.5 text-[11px] font-medium text-maroon-foreground">
              {guru.title}
            </span>
          )}
        </motion.div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Period */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 rounded-xl bg-card p-4 shadow-temple">
          <Calendar size={18} className="text-primary" />
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Period</p>
            <p className="text-sm font-medium text-foreground">{guru.period}</p>
          </div>
        </motion.div>

        {/* Lineage */}
        {(guru.ashramaGuru || guru.shishya) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl bg-card p-4 shadow-temple space-y-3">
            <h3 className="font-display text-sm font-semibold text-foreground flex items-center gap-2">
              <User size={16} className="text-primary" /> Lineage
            </h3>
            {guru.ashramaGuru && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ashrama Guru</p>
                <p className="text-sm text-foreground">{guru.ashramaGuru}</p>
              </div>
            )}
            {guru.shishya && (
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Shishya</p>
                <p className="text-sm text-foreground">{guru.shishya}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Aaradhane */}
        {guru.aaradhaneDate && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 rounded-xl bg-gradient-saffron p-4 shadow-temple">
            <Calendar size={18} className="text-saffron-foreground" />
            <div>
              <p className="text-[10px] text-saffron-foreground/70 uppercase tracking-wider">Aaradhane</p>
              <p className="text-sm font-medium text-saffron-foreground">{guru.aaradhaneDate}</p>
            </div>
          </motion.div>
        )}

        {/* Biography */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-xl bg-card p-4 shadow-temple">
          <h3 className="font-display text-sm font-semibold text-foreground mb-2">Biography</h3>
          <p className="text-sm leading-relaxed text-foreground/85">{guru.biography}</p>
        </motion.div>

        {/* Key Works */}
        {guru.keyWorks.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl bg-card p-4 shadow-temple">
            <h3 className="font-display text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-primary" /> Key Works
            </h3>
            <ul className="space-y-1.5">
              {guru.keyWorks.map((work, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {work}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Vrindavana Location */}
        {guru.vrindavanaLocation && mapsUrl && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-temple transition-transform hover:scale-[1.01]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-saffron">
                <MapPin size={20} className="text-saffron-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Vrindavana Location</p>
                <p className="text-sm font-medium text-foreground">{guru.vrindavanaLocation.name}</p>
              </div>
              <ExternalLink size={16} className="text-muted-foreground" />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GuruDetail;
