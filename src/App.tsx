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
import Gallery from "./pages/Gallery";
import Branches from "./pages/Branches";
import PanchangaPage from "./pages/PanchangaPage";
import YouthQuiz from "./pages/YouthQuiz";
import Publications from "./pages/Publications";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
            <Route path="/explore/gallery" element={<Gallery />} />
            <Route path="/explore/branches" element={<Branches />} />
            <Route path="/explore/panchanga" element={<PanchangaPage />} />
            <Route path="/explore/quiz" element={<YouthQuiz />} />
            <Route path="/explore/publications" element={<Publications />} />
            <Route path="/events" element={<Events />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/seva" element={<SevaBooking />} />
            <Route path="/services/room" element={<RoomBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
