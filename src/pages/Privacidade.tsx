
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-6 text-white border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-white hover:text-black">Voltar para Página Principal</span>
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-gray-300">Última atualização: Janeiro 2024</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Informações que Coletamos</h2>
            <p>
              Coletamos informações que você nos fornece diretamente, como quando cria uma conta, 
              faz uma assinatura ou entra em contato conosco. Isso inclui nome, email, 
              informações de pagamento e preferências de conteúdo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Como Usamos suas Informações</h2>
            <p>
              Utilizamos suas informações para:
              • Fornecer e personalizar nossos serviços
              • Processar pagamentos e gerenciar assinaturas
              • Comunicar sobre atualizações e novos conteúdos
              • Melhorar nossa plataforma e experiência do usuário
              • Cumprir obrigações legais
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Compartilhamento de Informações</h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:
              • Com prestadores de serviços confiáveis para operação da plataforma
              • Quando exigido por lei ou para proteger nossos direitos
              • Em caso de fusão ou aquisição empresarial
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger 
              suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
              Isso inclui criptografia, firewalls e controles de acesso rigorosos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Seus Direitos</h2>
            <p>
              Você tem o direito de:
              • Acessar e atualizar suas informações pessoais
              • Solicitar a exclusão de seus dados
              • Cancelar sua assinatura a qualquer momento
              • Receber uma cópia de seus dados
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies e Tecnologias Similares</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência, lembrar preferências e 
              analisar o uso da plataforma. Você pode gerenciar as configurações de 
              cookies através do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contato</h2>
            <p>
              Para questões sobre privacidade ou para exercer seus direitos, 
              entre em contato: privacidade@membersclub.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacidade;
