
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
import { TranslationProvider } from "./hooks/useAutoTranslation";
import { supabase } from "@/integrations/supabase/client";
import AdminDashboard from "./components/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    console.log('Verificando conexão com Supabase...');
    
    // Configurar listener de autenticação PRIMEIRO
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // DEPOIS verificar sessão existente
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Erro ao obter sessão:', error);
      } else {
        console.log('Sessão atual:', session);
        setSession(session);
        setUser(session?.user ?? null);
      }
    });

    // Testar conexão com o banco - removido o teste que estava causando erro
    const testConnection = async () => {
      try {
        console.log('Testando conexão com Supabase...');
        const { data, error } = await supabase.from('profiles').select('count');
        if (error) {
          console.log('Erro ao acessar tabela profiles:', error.message);
        } else {
          console.log('Conexão com Supabase funcionando! Tabela profiles acessível.');
        }
      } catch (err) {
        console.error('Erro na conexão:', err);
      }
    };

    testConnection();

    return () => subscription.unsubscribe();
  }, []);

  const handleAgeConfirmation = () => {
    setIsAgeVerified(true);
  };

  if (!isAgeVerified) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <TranslationProvider initialLanguage="pt-BR">
            <TranslatedAgeVerification onConfirm={handleAgeConfirmation} />
          </TranslationProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TranslationProvider initialLanguage="pt-BR">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminDashboard />} />
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
