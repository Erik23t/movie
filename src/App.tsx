
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
import LanguageSelection from "./components/LanguageSelection";
import { TranslationProvider } from "./hooks/useAutoTranslation";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('pt-BR');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleAgeConfirmation = () => {
    setIsAgeVerified(true);
    setShowLanguageSelection(true);
  };

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
  };

  if (!isAgeVerified) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TranslationProvider initialLanguage={selectedLanguage}>
            <TranslatedAgeVerification onConfirm={handleAgeConfirmation} />
          </TranslationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (showLanguageSelection) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageSelection onLanguageSelect={handleLanguageSelection} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TranslationProvider initialLanguage={selectedLanguage}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/termos" element={<Termos />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/suporte" element={<Suporte />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TranslationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
