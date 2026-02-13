import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Phone, Sparkles, User, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const signupPerks = ["Manage seva and room bookings", "Get event and festival reminders", "Receive Matha updates in one place"];

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validEmail = email.includes("@");
    const validMobile = mobile.trim().length >= 10;
    const validPassword = password.trim().length >= 6;

    if (!fullName.trim() || !validEmail || !validMobile || !validPassword) {
      setError("Enter valid details in all fields to create your account.");
      return;
    }

    setError("");
    navigate("/profile");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-secondary/40 px-4 pb-12 pt-12">
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-maroon/20 blur-3xl" />

      <div className="mx-auto w-full max-w-md rounded-2xl border border-border/60 bg-card/80 p-6 shadow-temple backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
            <Sparkles size={12} />
            Matha Connect
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign up once and stay connected with all Matha services and updates.</p>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 rounded-xl border border-border bg-background p-1">
          <Link to="/login" className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Login
          </Link>
          <Link to="/signup" className="rounded-lg bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground shadow-sm">
            Sign up
          </Link>
        </div>

        <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
          <p className="text-xs font-semibold text-primary">Why create an account?</p>
          <ul className="mt-2 space-y-1.5">
            {signupPerks.map((perk) => (
              <li key={perk} className="text-xs text-muted-foreground">• {perk}</li>
            ))}
          </ul>
        </div>

        <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Full name</span>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/70">
              <User size={16} className="text-muted-foreground" />
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="name"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/70">
              <Mail size={16} className="text-muted-foreground" />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="email"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Mobile number</span>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/70">
              <Phone size={16} className="text-muted-foreground" />
              <input
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                type="tel"
                placeholder="Enter your mobile number"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="tel"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Password</span>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/70">
              <Lock size={16} className="text-muted-foreground" />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error ? <p className="text-xs text-destructive">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-saffron py-2.5 text-sm font-semibold text-saffron-foreground shadow-temple transition-transform hover:scale-[1.01]"
          >
            Create account
          </button>
        </form>

        <Link
          to="/login"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <UserCheck size={16} />
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
