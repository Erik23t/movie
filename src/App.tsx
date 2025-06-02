
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Suporte from "./pages/Suporte";
import TranslatedAgeVerification from "./components/TranslatedAgeVerification";

const queryClient = new QueryClient();

const App = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já confirmou a idade anteriormente
    const ageVerified = localStorage.getItem('ageVerified');
    if (ageVerified === 'true') {
      setIsAgeVerified(true);
    }
  }, []);

  const handleAgeConfirmation = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsAgeVerified(true);
  };

  if (!isAgeVerified) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TranslatedAgeVerification onConfirm={handleAgeConfirmation} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="/suporte" element={<Suporte />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
