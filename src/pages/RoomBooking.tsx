import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarIcon, CheckCircle2, Users, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const roomTypes = [
  { id: "single", name: "Single Room", desc: "For 1–2 persons", rate: "₹500/night" },
  { id: "double", name: "Double Room", desc: "For 2–4 persons", rate: "₹800/night" },
  { id: "dormitory", name: "Dormitory", desc: "Shared accommodation", rate: "₹200/bed" },
  { id: "family", name: "Family Suite", desc: "For families up to 6", rate: "₹1,200/night" },
];

const RoomBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [roomType, setRoomType] = useState("");
  const [guests, setGuests] = useState("1");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !roomType || !name || !mobile || !consentChecked) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields and accept the terms.",
        variant: "destructive",
      });
      return;
    }

    if (checkOut <= checkIn) {
      toast({
        title: "Invalid dates",
        description: "Check-out must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    const id = `RM-${Date.now().toString(36).toUpperCase()}`;
    setRefId(id);

    // Construct mailto link to simulate email submission
    const subject = encodeURIComponent(`Room Booking Request – ${id}`);
    const body = encodeURIComponent(
      `Room Booking Request\n\nRef: ${id}\nRoom Type: ${roomTypes.find(r => r.id === roomType)?.name}\nCheck-in: ${format(checkIn, "PPP")}\nCheck-out: ${format(checkOut, "PPP")}\nGuests: ${guests}\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email || "N/A"}\nPurpose: ${purpose || "N/A"}`
    );
    window.open(`mailto:office@sodematha.in?subject=${subject}&body=${body}`, "_blank");

    setSubmitted(true);
    toast({ title: "Booking Request Sent!", description: `Reference: ${id}` });
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-saffron">
            <CheckCircle2 size={32} className="text-saffron-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Request Sent!</h1>
          <p className="text-sm text-muted-foreground">
            Your booking reference is <span className="font-semibold text-primary">{refId}</span>
          </p>
          <div className="rounded-xl bg-secondary/40 px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail size={14} />
              <span>Email sent to <strong className="text-foreground">office@sodematha.in</strong></span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">The office will confirm your booking via phone or email.</p>
          <Button onClick={() => navigate("/services")} className="mt-4 bg-gradient-saffron text-saffron-foreground hover:opacity-90">
            Back to Services
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="rounded-full p-1.5 hover:bg-muted">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Room Booking</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-4 pt-4">
        {/* Room Type */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <Label className="font-display text-sm font-semibold text-foreground">Room Type *</Label>
          <div className="grid grid-cols-2 gap-2">
            {roomTypes.map((room) => (
              <button
                type="button"
                key={room.id}
                onClick={() => setRoomType(room.id)}
                className={cn(
                  "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all",
                  roomType === room.id
                    ? "border-primary bg-primary/5 shadow-temple"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <span className="text-sm font-semibold text-foreground">{room.name}</span>
                <span className="text-[10px] text-muted-foreground">{room.desc}</span>
                <span className="text-xs font-bold text-primary">{room.rate}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Dates */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="space-y-3">
          <h2 className="font-display text-base font-semibold text-foreground">Stay Dates</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Check-in *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start rounded-xl border-border bg-card shadow-temple text-left font-normal", !checkIn && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "dd MMM yyyy") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Check-out *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start rounded-xl border-border bg-card shadow-temple text-left font-normal", !checkOut && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "dd MMM yyyy") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Number of Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger className="rounded-xl border-border bg-card shadow-temple">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-muted-foreground" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.section>

        {/* Personal Details */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
          <h2 className="font-display text-base font-semibold text-foreground">Your Details</h2>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Full Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="rounded-xl border-border bg-card shadow-temple" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Mobile *</Label>
              <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+91" type="tel" className="rounded-xl border-border bg-card shadow-temple" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" type="email" className="rounded-xl border-border bg-card shadow-temple" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Purpose of Visit</Label>
            <Textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Darshana, Seva, Family visit…" className="rounded-xl border-border bg-card shadow-temple" rows={2} />
          </div>
        </motion.section>

        {/* Consent */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-temple">
            <Checkbox checked={consentChecked} onCheckedChange={(v) => setConsentChecked(v === true)} className="mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              I agree to the <span className="font-semibold text-primary">Terms & Conditions</span> and <span className="font-semibold text-primary">Privacy Policy</span>. I consent to my data being shared with the Matha office for booking purposes.
            </p>
          </label>
        </motion.section>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pb-4">
          <Button
            type="submit"
            disabled={!consentChecked || !roomType || !name || !mobile || !checkIn || !checkOut}
            className="w-full rounded-xl bg-gradient-saffron py-6 font-display text-base font-bold text-saffron-foreground shadow-temple transition-all hover:opacity-90 disabled:opacity-40"
          >
            Submit Booking Request
          </Button>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Your request will be emailed to <strong>office@sodematha.in</strong>
          </p>
        </motion.div>
      </form>
    </div>
  );
};

export default RoomBooking;
