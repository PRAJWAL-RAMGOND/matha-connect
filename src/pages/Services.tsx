import { motion } from "framer-motion";
import { HandHeart, Bed, BookOpen, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import templeBell from "@/assets/temple-bell.jpg";
import { useToast } from "@/hooks/use-toast";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const sevas = [
  { name: "ಅನ್ನದಾನ ಸಂತರ್ಪಣೆ", price: "₹5,001", desc: "One-day annadana seva" },
  { name: "ರಥೋತ್ಸವ ಸೇವೆ", price: "₹1,000", desc: "Festival day seva participation" },
  { name: "ತುಳಸಿ ಅರ್ಚನೆ", price: "₹25", desc: "Daily devotional offering" },
  { name: "ಗೋದಾನ (ರಕ್ಷಣೆ)", price: "₹3,000", desc: "Support gaushala and care" },
];

const services = [
  { icon: HandHeart, label: "Book a Seva", desc: "View and book sevas online", route: "/services/seva" },
  { icon: Bed, label: "Room Booking", desc: "Reserve rooms at the Matha", route: "/services/room" },
  { icon: BookOpen, label: "Paryaya Sevas", desc: "Special Udupi Paryaya sevas", comingSoon: true },
  { icon: CreditCard, label: "Donations", desc: "Contribute to the Matha", comingSoon: true },
] as const;

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const visibility = useSectionVisibility();

  const visibleServices = services.filter((service) => {
    if (service.route === "/services/seva") return visibility["services.seva"];
    if (service.route === "/services/room") return visibility["services.room"];
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <img src={templeBell} alt="Temple" className="h-40 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/50 to-background" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <h1 className="font-display text-xl font-bold text-maroon-foreground">Services</h1>
          <p className="text-xs text-maroon-foreground/70">Sevas, bookings & donations</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        {visibleServices.map((service, index) => (
        {services.map((service, index) => (
          <motion.button
            key={service.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => {
              if (service.comingSoon) {
                toast({ title: `${service.label} will be available soon.` });
                return;
              }
              navigate(service.route);
            }}
            className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-temple transition-transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-saffron">
              <service.icon size={20} className="text-saffron-foreground" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground">{service.label}</span>
            <span className="text-center text-[10px] text-muted-foreground">{service.desc}</span>
            {service.comingSoon ? <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">Coming soon</span> : null}
          </motion.button>
        ))}
      </div>

      <div className="mt-6 px-4 pb-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">Popular Sevas</h2>
        <div className="space-y-2">
          {(visibility["services.seva"] ? sevas : []).map((seva, index) => (
          {sevas.map((seva, index) => (
            <motion.div
              key={seva.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className="flex items-center justify-between rounded-xl bg-card p-4 shadow-temple"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{seva.name}</p>
                <p className="text-[11px] text-muted-foreground">{seva.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold text-primary">{seva.price}</span>
                <button onClick={() => navigate("/services/seva")} className="rounded-full bg-gradient-saffron px-3 py-1 text-[10px] font-semibold text-saffron-foreground transition-transform hover:scale-105">
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
