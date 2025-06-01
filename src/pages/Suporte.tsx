
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
            <Button variant="outline" className="mb-6 text-white border-white bg-transparent hover:bg-white hover:text-black transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-white hover:text-black">Voltar para Página Principal</span>
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Suporte ao Cliente</h1>
          <p className="text-gray-300">Estamos aqui para ajudar você</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Como podemos ajudar?</h2>
            <p className="text-gray-300 mb-6">
              Nossa equipe de suporte está disponível para resolver suas dúvidas e problemas. 
              Escolha a forma de contato que preferir:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black p-4 rounded-lg text-center">
                <Mail className="h-8 w-8 text-white mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <p className="text-gray-300 text-sm">suporte@membersclub.com</p>
              </div>
              
              <div className="bg-black p-4 rounded-lg text-center">
                <MessageCircle className="h-8 w-8 text-white mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-2">Chat Online</h3>
                <p className="text-gray-300 text-sm">Disponível 24/7</p>
              </div>
              
              <div className="bg-black p-4 rounded-lg text-center">
                <Phone className="h-8 w-8 text-white mx-auto mb-2" />
                <h3 className="text-white font-semibold mb-2">Telefone</h3>
                <p className="text-gray-300 text-sm">(11) 9999-9999</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Como faço para cancelar minha assinatura?</h3>
                <p className="text-gray-300">
                  Você pode cancelar sua assinatura a qualquer momento através da sua área pessoal 
                  ou entrando em contato com nosso suporte.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Esqueci minha senha, como recuperar?</h3>
                <p className="text-gray-300">
                  Use a opção "Esqueci minha senha" na página de login ou entre em contato 
                  com nosso suporte para assistência.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Como atualizar minhas informações de pagamento?</h3>
                <p className="text-gray-300">
                  Acesse sua área pessoal e vá até a seção "Pagamentos" para atualizar 
                  suas informações de cartão de crédito.
                </p>
              </div>
              
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">O conteúdo é seguro e privado?</h3>
                <p className="text-gray-300">
                  Sim, utilizamos as mais avançadas tecnologias de segurança e criptografia 
                  para proteger seu acesso e dados pessoais.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Horário de Atendimento</h2>
            <div className="text-gray-300">
              <p><strong>Segunda a Sexta:</strong> 8h às 20h</p>
              <p><strong>Sábado:</strong> 9h às 17h</p>
              <p><strong>Domingo:</strong> 10h às 16h</p>
              <p className="mt-4 text-sm">
                <strong>Chat Online:</strong> Disponível 24 horas por dia, 7 dias por semana
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Suporte;
