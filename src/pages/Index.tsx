import { motion } from "framer-motion";
import { Bell, Instagram, Facebook, Youtube, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import heroBanner from "@/assets/hero-banner.jpg";
import templeAmbiance from "@/assets/temple-ambiance.jpg";
import templeBell from "@/assets/temple-bell.jpg";
import mathaLogo from "@/assets/matha-logo.png";
import swamijiVishwothama from "@/assets/swamiji-vishwothama.png";
import swamijiVishwavallabha from "@/assets/swamiji-vishwavallabha.png";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

const newsItems = [
  { id: 1, title: "Chaturmasya Vrata commences at Sode Matha", image: templeAmbiance },
  { id: 2, title: "Special Puja for Narasimha Jayanti celebrations", image: templeBell },
  { id: 3, title: "Sri Vadiraja Aradhana Mahotsava dates announced", image: templeAmbiance },
  { id: 4, title: "Dasa Sahitya lecture series this weekend", image: templeBell },
  { id: 5, title: "New Annadaana initiative launched for devotees", image: templeAmbiance },
];

const announcements = [
  "🪔 Sri Vadiraja Aradhana – March 2026 – All devotees welcome",
  "📢 Chaturmasya Sankalpa at Udupi – Register now for sevas",
  "🎉 Youth Quiz Competition – Register before Feb 28",
  "🙏 Daily live darshana streaming now available on YouTube",
];

const timings = [
  { location: "Sode", darshan: "5:00 a.m. to 8:30 a.m.", prasada: "Noon 11:30 a.m." },
];

const panchangaHighlights = [
  { label: "Tithi", value: "Shukla Ekadashi" },
  { label: "Nakshatra", value: "Shravana" },
  { label: "Rahu Kala", value: "10:30 a.m. – 12:00 p.m." },
  { label: "Abhijit Muhurta", value: "12:08 p.m. – 12:56 p.m." },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/", color: "text-pink-600" },
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/", color: "text-blue-600" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/", color: "text-red-600" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918202521975", color: "text-green-600" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const sectionTitleClass = "mb-3 font-display text-lg font-semibold text-foreground";

const Index = () => {
  const navigate = useNavigate();
  const visibility = useSectionVisibility();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20 pb-4">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <header className="relative overflow-hidden rounded-b-3xl shadow-temple">
          <div className="absolute inset-0">
            <img src={heroBanner} alt="Om mandala" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-maroon/75 via-maroon/55 to-background" />
          </div>
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-saffron/30 blur-2xl" />
          <div className="absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-card/20 blur-2xl" />

      {/* Announcements Carousel */}
      {visibility["home.announcements"] ? <motion.section
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="mt-6 px-4"
      >
        <div className="overflow-hidden rounded-xl bg-gradient-saffron p-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {announcements.map((text, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-lg bg-card/90 px-4 py-2.5 text-xs font-medium text-foreground shadow-sm"
                style={{ minWidth: "280px" }}
              >
                {text}
          <div className="relative px-4 pb-10 pt-12">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-card/20 p-1.5 backdrop-blur-sm">
                  <img src={mathaLogo} alt="Sode Sri Vadiraja Matha Logo" className="h-11 w-11 object-contain" />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-maroon-foreground">
                    ಶ್ರೀ ವಾದಿರಾಜ ಮಠ
                  </h1>
                  <p className="font-display text-xs text-maroon-foreground/80">
                    Sode Sri Vadiraja Matha
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/notifications")}
                className="relative rounded-full border border-card/40 bg-card/20 p-2.5 backdrop-blur-md transition-colors hover:bg-card/40"
              >
                <Bell size={20} className="text-maroon-foreground" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-saffron text-[9px] font-bold text-saffron-foreground">
                  4
                </span>
              </button>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-card/40 bg-card/20 px-3 py-1 text-xs font-medium text-maroon-foreground backdrop-blur-sm">
              <Sparkles size={12} />
              Haridasa Seva • Udupi Tradition • Daily Darshana
            </div>
          </div>
        </header>

        {/* Search */}
        <div className="relative z-10 -mt-5 px-2">
          <SearchBar />
        </div>
      </motion.section> : null}

      {/* Swamiji Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="mt-6 px-4"
      >
        <div className="flex flex-col items-center">
          <img src={mathaLogo} alt="Sode Sri Vadiraja Matha Logo" className="mb-4 h-24 w-24 object-contain" />
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center">
              <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-saffron shadow-temple">
                <img src={swamijiVishwothama} alt="Sri Sri Vishwothama Theertha Swamiji" className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-center font-display text-xs font-semibold text-foreground leading-tight">
                Sri Sri Vishwothama<br />Theertha Swamiji
              </p>

        {/* Announcements Carousel */}
        <motion.section
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="mt-6 px-4"
        >
          <div className="overflow-hidden rounded-2xl bg-gradient-saffron p-3 shadow-temple">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {announcements.map((text, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-lg border border-border/30 bg-card/95 px-4 py-2.5 text-xs font-medium text-foreground shadow-sm"
                  style={{ minWidth: "280px" }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Panchanga Highlights */}
        <motion.section
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="mt-6 px-4"
        >
          <h2 className={sectionTitleClass}>Today's Panchanga Highlights</h2>
          <div className="rounded-2xl border border-border/40 bg-card p-4 shadow-temple">
            <div className="grid grid-cols-2 gap-3">
              {panchangaHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-saffron/20 bg-gradient-to-br from-background via-background to-saffron/10 p-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* News */}
      {visibility["home.news"] ? <motion.section
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="mt-6 px-4"
      >
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
          Latest News
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 overflow-hidden rounded-xl bg-card shadow-temple"
              style={{ width: "200px" }}
            >
              <div className="aspect-video">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
        </motion.section>

        {/* Swamiji Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mt-6 px-4"
        >
          <div className="rounded-2xl border border-border/40 bg-card px-4 py-5 shadow-temple">
            <div className="mb-4 flex justify-center">
              <img src={mathaLogo} alt="Sode Sri Vadiraja Matha Logo" className="h-16 w-16 object-contain" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-saffron shadow-temple ring-4 ring-saffron/15">
                  <img src={swamijiVishwothama} alt="Sri Sri Vishwothama Theertha Swamiji" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 text-center font-display text-xs font-semibold leading-tight text-foreground">
                  Sri Sri Vishwothama
                  <br />
                  Theertha Swamiji
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-saffron shadow-temple ring-4 ring-saffron/15">
                  <img src={swamijiVishwavallabha} alt="Sri Sri Vishwavallabha Theertha Swamiji" className="h-full w-full object-cover" />
                </div>
                <p className="mt-2 text-center font-display text-xs font-semibold leading-tight text-foreground">
                  Sri Sri Vishwavallabha
                  <br />
                  Theertha Swamiji
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section> : null}

      {/* Darshana & Prasada Timings */}
      {visibility["home.timings"] ? <motion.section
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="mt-6 px-4"
      >
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
          Darshana & Prasada Timings
        </h2>
        <div className="overflow-hidden rounded-xl bg-card shadow-temple">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-maroon text-maroon-foreground">
                <th className="px-4 py-2.5 text-left text-xs font-semibold">Location</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold">Darshan</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold">Prasada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {timings.map((item, i) => (
                <tr key={i}>
                  <td className="px-4 py-2.5 font-medium text-foreground">{item.location}</td>
                  <td className="px-4 py-2.5 text-foreground">{item.darshan}</td>
                  <td className="px-4 py-2.5 text-foreground">{item.prasada}</td>
          </div>
        </motion.section>

        {/* News */}
        <motion.section
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-6 px-4"
        >
          <h2 className={sectionTitleClass}>Latest News</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 overflow-hidden rounded-xl border border-border/40 bg-card shadow-temple"
                style={{ width: "210px" }}
              >
                <div className="aspect-video">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Darshana & Prasada Timings */}
        <motion.section
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          className="mt-6 px-4"
        >
          <h2 className={sectionTitleClass}>Darshana & Prasada Timings</h2>
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-card shadow-temple">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-maroon text-maroon-foreground">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold">Location</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold">Darshan</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold">Prasada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {timings.map((item, i) => (
                  <tr key={i} className="bg-background/50">
                    <td className="px-4 py-2.5 font-medium text-foreground">{item.location}</td>
                    <td className="px-4 py-2.5 text-foreground">{item.darshan}</td>
                    <td className="px-4 py-2.5 text-foreground">{item.prasada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Social Media */}
        <motion.section
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
          className="mb-6 mt-6 px-4"
        >
          <h2 className={sectionTitleClass}>Connect With Us</h2>
          <div className="rounded-2xl border border-border/40 bg-card px-4 py-5 shadow-temple">
            <div className="flex justify-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-110"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-background shadow-temple">
                    <link.icon size={22} className={link.color} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{link.label}</span>
                </a>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section> : null}

      {/* Social Media */}
      <motion.section
        initial="hidden"
        animate="visible"
        custom={4}
        variants={fadeUp}
        className="mt-6 mb-6 px-4"
      >
        <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
          Connect With Us
        </h2>
        <div className="flex justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-temple">
                <link.icon size={22} className={link.color} />
              </div>
              <span className="text-[10px] text-muted-foreground">{link.label}</span>
            </a>
          ))}
        </div>
      </motion.section>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
