import { Search, Mic } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative mx-4">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-temple transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
        <Search size={18} className="text-muted-foreground" />
        <input
          type="text"
          placeholder="Search sevas, events, gurus..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button className="rounded-full p-1 transition-colors hover:bg-secondary">
          <Mic size={18} className="text-primary" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
