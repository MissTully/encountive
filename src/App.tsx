import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Simulation from "./pages/Simulation";
import Module2 from "./pages/Module2";
import Auth from "./pages/Auth";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Scenarios from "./pages/Scenarios";
import Progress from "./pages/Progress";
import { AdminLayout } from "./components/admin/AdminLayout";
import ScenariosPage from "./pages/admin/ScenariosPage";
import RubricsPage from "./pages/admin/RubricsPage";
import FeedbackPage from "./pages/admin/FeedbackPage";
import BranchingPage from "./pages/admin/BranchingPage";
import VideosPage from "./pages/admin/VideosPage";
import UsersPage from "./pages/admin/UsersPage";
import SettingsPage from "./pages/admin/SettingsPage";
import DashboardPage from "./pages/admin/DashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/module2" element={<Module2 />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Admin/Authoring Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="scenarios" element={<ScenariosPage />} />
            <Route path="rubrics" element={<RubricsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="branching" element={<BranchingPage />} />
            <Route path="videos" element={<VideosPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
