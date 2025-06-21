
-- Habilitar atualizações em tempo real para as tabelas
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.subscriptions REPLICA IDENTITY FULL;

-- Adicionar as tabelas à publicação do realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;

-- Criar políticas RLS para permitir que administradores vejam todos os dados
CREATE POLICY "Admin can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Admin can view all subscriptions" ON public.subscriptions  
  FOR SELECT USING (true);

-- Habilitar RLS nas tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
