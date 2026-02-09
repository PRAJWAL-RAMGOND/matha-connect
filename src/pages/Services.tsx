import { motion } from "framer-motion";
import { HandHeart, Bed, BookOpen, CreditCard } from "lucide-react";
import templeBell from "@/assets/temple-bell.jpg";

const sevas = [
  { name: "Abhisheka Seva", price: "₹501", desc: "Sacred abhisheka to the Lord" },
  { name: "Anna Santarpane", price: "₹1,001", desc: "Feeding devotees & community" },
  { name: "Satyanarayana Pooja", price: "₹2,501", desc: "For prosperity & well-being" },
  { name: "Tulabhara", price: "Varies", desc: "Offering equivalent weight in grains" },
];

const services = [
  { icon: HandHeart, label: "Book a Seva", desc: "View and book sevas online", route: "/services/seva" },
  { icon: Bed, label: "Room Booking", desc: "Reserve rooms at the Matha", route: "/services/room" },
  { icon: BookOpen, label: "Paryaya Sevas", desc: "Special Udupi Paryaya sevas", route: "/services/paryaya" },
  { icon: CreditCard, label: "Donations", desc: "Contribute to the Matha", route: "/services/donate" },
];

const Services = () => {
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

      {/* Service Categories */}
      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        {services.map((svc, i) => (
          <motion.button
            key={svc.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 shadow-temple transition-transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-saffron">
              <svc.icon size={20} className="text-saffron-foreground" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground">{svc.label}</span>
            <span className="text-[10px] text-muted-foreground text-center">{svc.desc}</span>
          </motion.button>
        ))}
      </div>

      {/* Popular Sevas */}
      <div className="mt-6 px-4 pb-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">Popular Sevas</h2>
        <div className="space-y-2">
          {sevas.map((seva, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between rounded-xl bg-card p-4 shadow-temple"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{seva.name}</p>
                <p className="text-[11px] text-muted-foreground">{seva.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-bold text-primary">{seva.price}</span>
                <button className="rounded-full bg-gradient-saffron px-3 py-1 text-[10px] font-semibold text-saffron-foreground transition-transform hover:scale-105">
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
