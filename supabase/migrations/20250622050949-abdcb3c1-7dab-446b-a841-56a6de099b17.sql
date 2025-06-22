
-- Criar tabela para administradores
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir o administrador padrão (senha será hasheada no frontend)
INSERT INTO public.admin_users (username, password_hash) 
VALUES ('Ediran', '$2a$10$N9qo8uLOickgx2ZMRZoMye7VRjSvxGdVlKm2ZjLsIJ2D0XK0yZq7i'); -- sabedoria20anos

-- Habilitar RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir login de admin
CREATE POLICY "Allow admin login" ON public.admin_users
  FOR SELECT USING (true);

-- Adicionar coluna name à tabela profiles para armazenar o nome do usuário
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;

-- Habilitar realtime para admin_users
ALTER TABLE public.admin_users REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_users;
