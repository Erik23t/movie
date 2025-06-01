
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Termos = () => {
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
          <h1 className="text-4xl font-bold mb-4">Termos de Uso</h1>
          <p className="text-gray-300">Última atualização: Janeiro 2024</p>
        </div>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o Members Club, você concorda em cumprir estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Descrição do Serviço</h2>
            <p>
              O Members Club é uma plataforma de conteúdo premium que oferece acesso exclusivo 
              a materiais selecionados para membros verificados. Nossos serviços incluem conteúdo 
              de vídeo, imagens e outros materiais digitais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Elegibilidade</h2>
            <p>
              Você deve ter pelo menos 18 anos de idade para usar nossos serviços. 
              Ao se registrar, você confirma que tem idade legal e capacidade para 
              aceitar estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Assinatura e Pagamento</h2>
            <p>
              O acesso ao conteúdo premium requer uma assinatura válida. Os pagamentos são 
              processados de forma segura e as cobranças são feitas conforme o plano escolhido. 
              Cancelamentos podem ser feitos a qualquer momento através da área do usuário.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Uso Aceitável</h2>
            <p>
              Você concorda em usar nossos serviços apenas para fins legais e não deve:
              compartilhar sua conta, reproduzir ou distribuir nosso conteúdo sem autorização,
              ou usar nossos serviços de forma que possa prejudicar nossa plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo disponível em nossa plataforma é protegido por direitos autorais 
              e outras leis de propriedade intelectual. O uso não autorizado é estritamente proibido.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Contato</h2>
            <p>
              Para dúvidas sobre estes termos, entre em contato através da nossa 
              página de suporte ou pelo email: contato@membersclub.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Termos;
