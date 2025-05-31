
import React from 'react';
import { ArrowLeft, Mail, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Suporte = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-6 text-white border-white hover:bg-white hover:text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Página Principal
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Central de Suporte</h1>
          <p className="text-gray-300">Estamos aqui para ajudar você</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formas de Contato */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Entre em Contato</h2>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <Mail className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">Email</h3>
              </div>
              <p className="text-gray-300 mb-2">Para questões gerais e suporte técnico</p>
              <a href="mailto:suporte@membersclub.com" className="text-blue-400 hover:text-blue-300">
                suporte@membersclub.com
              </a>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <MessageCircle className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">Chat ao Vivo</h3>
              </div>
              <p className="text-gray-300 mb-2">Disponível 24/7 para membros VIP</p>
              <p className="text-gray-400">Faça login para acessar</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <Phone className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">Telefone</h3>
              </div>
              <p className="text-gray-300 mb-2">Seg-Sex: 9h às 18h</p>
              <p className="text-blue-400">+55 (11) 9999-9999</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Perguntas Frequentes</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Como faço para cancelar minha assinatura?</h3>
                <p className="text-gray-300 text-sm">
                  Você pode cancelar a qualquer momento através da sua área de usuário, 
                  na seção "Gerenciar Assinatura".
                </p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Posso alterar meu plano de assinatura?</h3>
                <p className="text-gray-300 text-sm">
                  Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As alterações entram em vigor no próximo ciclo de cobrança.
                </p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Como posso recuperar minha senha?</h3>
                <p className="text-gray-300 text-sm">
                  Use a opção "Esqueci minha senha" na página de login e siga as 
                  instruções enviadas para seu email.
                </p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">O conteúdo está disponível offline?</h3>
                <p className="text-gray-300 text-sm">
                  Atualmente, todo o conteúdo requer conexão com a internet. 
                  Estamos trabalhando em opções de download para membros VIP.
                </p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Há garantia de reembolso?</h3>
                <p className="text-gray-300 text-sm">
                  Oferecemos garantia de 7 dias para novos membros. 
                  Entre em contato conosco para processar o reembolso.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Não encontrou o que procura?</h2>
          <p className="text-gray-300 mb-6">
            Nossa equipe de suporte está sempre pronta para ajudar com qualquer questão específica.
          </p>
          <Button className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 border border-gray-600 px-8 py-3 rounded-full animate-pulse">
            Enviar Mensagem
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Suporte;
