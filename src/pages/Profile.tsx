import { motion } from "framer-motion";
import { User, Bell, Heart, LogOut, ChevronRight, Shield, Settings2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const profileMenu = [
  { icon: User, label: "Edit Profile", desc: "Name, mobile, email, address" },
  { icon: Bell, label: "Notifications", desc: "Manage push notification preferences" },
  { icon: Heart, label: "Volunteer", desc: "Sign up for Matha seva activities" },
  { icon: Shield, label: "Privacy & Consent", desc: "Manage your data preferences" },
  { icon: Settings2, label: "Admin Panel", desc: "Backend data dashboard and controls", route: "/admin" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-maroon px-4 pb-12 pt-12">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card/20 backdrop-blur-sm">
            <User size={28} className="text-maroon-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-maroon-foreground">Devotee</h1>
            <p className="text-xs text-maroon-foreground/70">Login or create an account to access your profile</p>
          </div>
        </div>
      </div>

      <div className="-mt-4 mx-4 space-y-2">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/login")}
          className="w-full rounded-xl bg-gradient-saffron p-4 text-center font-display text-sm font-semibold text-saffron-foreground shadow-temple transition-transform hover:scale-[1.01]"
        >
          Login with Mobile Number
        </motion.button>
        <Link
          to="/signup"
          className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card p-3 text-sm font-medium text-foreground shadow-temple transition-colors hover:bg-secondary"
        >
          Create a new account
        </Link>
      </div>

      <div className="mt-6 px-4 pb-6">
        <div className="space-y-2">
          {profileMenu.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => item.route && navigate(item.route)}
              className="flex w-full items-center gap-3 rounded-xl bg-card p-4 shadow-temple transition-transform hover:scale-[1.01]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                <item.icon size={18} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 p-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
