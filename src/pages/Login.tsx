import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Phone, Sparkles, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = identifier.trim();
    if (!value || password.trim().length < 6) {
      setError("Enter a valid mobile/email and a password with at least 6 characters.");
      return;
    }

    setError("");
    navigate("/profile");
  };

  const isEmail = identifier.includes("@");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-secondary/40 px-4 pb-12 pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-maroon/20 blur-3xl" />
      <div className="mx-auto w-full max-w-md rounded-2xl border border-border/60 bg-card/80 p-6 shadow-temple backdrop-blur-sm">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
            <Sparkles size={12} />
            Matha Connect
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Login to continue to your profile, bookings, and seva updates.</p>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 rounded-xl border border-border bg-background p-1">
          <Link to="/login" className="rounded-lg bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground shadow-sm">
            Login
          </Link>
          <Link to="/signup" className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            Sign up
          </Link>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Mobile number or email</span>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/70">
              {isEmail ? <Mail size={16} className="text-muted-foreground" /> : <Phone size={16} className="text-muted-foreground" />}
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                type="text"
                placeholder="Enter mobile number or email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="username"
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
                placeholder="Enter password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoComplete="current-password"
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
            className="w-full rounded-xl bg-gradient-maroon py-2.5 text-sm font-semibold text-maroon-foreground shadow-temple transition-transform hover:scale-[1.01]"
          >
            Login
          </button>
        </form>

        <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
          New to Matha Connect? Create your account for booking, volunteer updates, and notifications.
        </div>

        <Link
          to="/signup"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <UserPlus size={16} />
          Create new account
        </Link>
      </div>
    </div>
  );
};

export default Login;
