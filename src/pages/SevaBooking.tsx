import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Building2, ChevronDown, ChevronUp, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const sevaList = [
  { id: "abhisheka", name: "Abhisheka Seva", price: 501, desc: "Sacred abhisheka to the Lord" },
  { id: "anna", name: "Anna Santarpane", price: 1001, desc: "Feeding devotees & community" },
  { id: "satyanarayana", name: "Satyanarayana Pooja", price: 2501, desc: "For prosperity & well-being" },
  { id: "tulabhara", name: "Tulabhara", price: 1101, desc: "Offering equivalent weight in grains" },
  { id: "kumkumarchana", name: "Kumkumarchana", price: 351, desc: "Worship with kumkum" },
  { id: "navagraha", name: "Navagraha Homa", price: 3001, desc: "Planetary peace homa" },
];

type PaymentMethod = "upi" | "card" | "netbanking";

const SevaBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedSeva, setSelectedSeva] = useState("");
  const [sevaDate, setSevaDate] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gotra, setGotra] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const [sankalpa, setSankalpa] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [consentChecked, setConsentChecked] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentSeva = sevaList.find((s) => s.id === selectedSeva);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSeva || !sevaDate || !name || !mobile || !consentChecked) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields and accept the terms.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking
    setSubmitted(true);
    toast({
      title: "Seva Booked Successfully!",
      description: `Ref: SVA-${Date.now().toString(36).toUpperCase()}`,
    });
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-saffron">
            <CheckCircle2 size={32} className="text-saffron-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Seva Booked!</h1>
          <p className="text-sm text-muted-foreground">
            Your booking reference is{" "}
            <span className="font-semibold text-primary">SVA-{Date.now().toString(36).toUpperCase()}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            A confirmation will be sent to your registered mobile number.
          </p>
          <Button
            onClick={() => navigate("/services")}
            className="mt-4 bg-gradient-saffron text-saffron-foreground hover:opacity-90"
          >
            Back to Services
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/80 px-4 py-3 backdrop-blur-md border-b border-border">
        <button onClick={() => navigate(-1)} className="rounded-full p-1.5 hover:bg-muted">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="font-display text-lg font-bold text-foreground">Book a Seva</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-4 pt-4">
        {/* Seva Selection */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <Label className="font-display text-sm font-semibold text-foreground">Select Seva *</Label>
          <Select value={selectedSeva} onValueChange={setSelectedSeva}>
            <SelectTrigger className="rounded-xl border-border bg-card shadow-temple">
              <SelectValue placeholder="Choose a seva" />
            </SelectTrigger>
            <SelectContent>
              {sevaList.map((seva) => (
                <SelectItem key={seva.id} value={seva.id}>
                  <div className="flex items-center justify-between gap-4">
                    <span>{seva.name}</span>
                    <span className="text-xs font-semibold text-primary">₹{seva.price.toLocaleString("en-IN")}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentSeva && (
            <p className="text-xs text-muted-foreground">{currentSeva.desc}</p>
          )}
        </motion.section>

        {/* Date */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="space-y-2">
          <Label className="font-display text-sm font-semibold text-foreground">Preferred Date *</Label>
          <Input
            type="date"
            value={sevaDate}
            onChange={(e) => setSevaDate(e.target.value)}
            className="rounded-xl border-border bg-card shadow-temple"
            min={new Date().toISOString().split("T")[0]}
          />
        </motion.section>

        {/* Personal Details */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-3">
          <h2 className="font-display text-base font-semibold text-foreground">Devotee Details</h2>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Full Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="rounded-xl border-border bg-card shadow-temple"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Mobile *</Label>
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="+91"
                type="tel"
                className="rounded-xl border-border bg-card shadow-temple"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                type="email"
                className="rounded-xl border-border bg-card shadow-temple"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Gotra</Label>
              <Input
                value={gotra}
                onChange={(e) => setGotra(e.target.value)}
                placeholder="e.g. Kashyapa"
                className="rounded-xl border-border bg-card shadow-temple"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Nakshatra</Label>
              <Input
                value={nakshatra}
                onChange={(e) => setNakshatra(e.target.value)}
                placeholder="e.g. Ashwini"
                className="rounded-xl border-border bg-card shadow-temple"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Sankalpa / Special Request</Label>
            <Textarea
              value={sankalpa}
              onChange={(e) => setSankalpa(e.target.value)}
              placeholder="Any specific sankalpa or request for the seva…"
              className="rounded-xl border-border bg-card shadow-temple"
              rows={3}
            />
          </div>
        </motion.section>

        {/* Payment Method */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-3">
          <h2 className="font-display text-base font-semibold text-foreground">Payment Method</h2>

          {currentSeva && (
            <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
              <span className="text-sm text-foreground">{currentSeva.name}</span>
              <span className="font-display text-lg font-bold text-primary">₹{currentSeva.price.toLocaleString("en-IN")}</span>
            </div>
          )}

          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)} className="space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-temple transition-all hover:border-primary/30 has-[data-state=checked]:border-primary has-[data-state=checked]:bg-primary/5">
              <RadioGroupItem value="upi" />
              <Smartphone size={18} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">UPI</p>
                <p className="text-[10px] text-muted-foreground">GPay, PhonePe, Paytm, BHIM</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-temple transition-all hover:border-primary/30 has-[data-state=checked]:border-primary has-[data-state=checked]:bg-primary/5">
              <RadioGroupItem value="card" />
              <CreditCard size={18} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Credit / Debit Card</p>
                <p className="text-[10px] text-muted-foreground">Visa, Mastercard, RuPay</p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-temple transition-all hover:border-primary/30 has-[data-state=checked]:border-primary has-[data-state=checked]:bg-primary/5">
              <RadioGroupItem value="netbanking" />
              <Building2 size={18} className="text-primary" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Net Banking</p>
                <p className="text-[10px] text-muted-foreground">All major banks supported</p>
              </div>
            </label>
          </RadioGroup>
        </motion.section>

        {/* Cancellation Policy */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
          <button
            type="button"
            onClick={() => setShowPolicy(!showPolicy)}
            className="flex w-full items-center justify-between rounded-xl bg-secondary/40 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Cancellation & Refund Policy</span>
            </div>
            {showPolicy ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
          </button>

          <AnimatePresence>
            {showPolicy && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Full Refund:</strong> Cancellations made 48 hours before the seva date are eligible for a full refund.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Partial Refund (50%):</strong> Cancellations made within 24–48 hours of the seva date.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">No Refund:</strong> Cancellations made within 24 hours of the seva date or after the seva is performed.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Rescheduling:</strong> Sevas can be rescheduled free of charge up to 24 hours before the date, subject to availability.
                  </p>
                  <p className="mt-2 text-[10px] text-muted-foreground italic">
                    For any queries, contact office@sodematha.in or call +91 820 253 0000.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Consent */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-temple">
            <Checkbox
              checked={consentChecked}
              onCheckedChange={(v) => setConsentChecked(v === true)}
              className="mt-0.5"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <span className="font-semibold text-primary">Terms & Conditions</span>,{" "}
              <span className="font-semibold text-primary">Privacy Policy</span>, and the cancellation & refund policy. I consent to my data being stored for booking purposes.
            </p>
          </label>
        </motion.section>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pb-4">
          <Button
            type="submit"
            disabled={!consentChecked || !selectedSeva || !name || !mobile || !sevaDate}
            className="w-full rounded-xl bg-gradient-saffron py-6 text-base font-display font-bold text-saffron-foreground shadow-temple transition-all hover:opacity-90 disabled:opacity-40"
          >
            {currentSeva ? `Pay ₹${currentSeva.price.toLocaleString("en-IN")} & Book Seva` : "Select a Seva to Continue"}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default SevaBooking;
