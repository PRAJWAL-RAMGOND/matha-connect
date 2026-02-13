import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Compass, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/80 p-8 text-center shadow-temple backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Compass size={24} />
        </div>
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">404</h1>
        <p className="mb-2 text-base font-medium text-foreground">Oops! Page not found</p>
        <p className="mb-6 text-sm text-muted-foreground">The page <span className="font-mono">{location.pathname}</span> does not exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-maroon px-4 py-2 text-sm font-semibold text-maroon-foreground shadow-temple transition-transform hover:scale-[1.02]"
        >
          <Home size={16} />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
