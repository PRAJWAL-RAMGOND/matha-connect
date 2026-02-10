import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Events from "./pages/Events";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import SevaBooking from "./pages/SevaBooking";
import RoomBooking from "./pages/RoomBooking";
import GuruParampara from "./pages/GuruParampara";
import GuruDetail from "./pages/GuruDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/guru-parampara" element={<GuruParampara />} />
            <Route path="/explore/guru/:guruId" element={<GuruDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/seva" element={<SevaBooking />} />
            <Route path="/services/room" element={<RoomBooking />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
