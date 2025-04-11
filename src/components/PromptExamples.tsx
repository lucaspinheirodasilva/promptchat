
import { useState } from 'react';
import { Search, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const EXAMPLE_PROMPTS = [
  {
    id: 1,
    title: "Atendimento ao Cliente",
    prompt: "Você é um agente de atendimento ao cliente para a Chatify. Responda de forma cordial e prestativa."
  },
  {
    id: 2,
    title: "Suporte Técnico",
    prompt: "Você é um especialista técnico que ajuda usuários a resolver problemas com a plataforma Chatify."
  },
  {
    id: 3,
    title: "Vendas",
    prompt: "Você é um consultor de vendas da Chatify. Forneça informações sobre nossos planos e ajude o cliente a escolher o melhor para suas necessidades."
  },
  {
    id: 4,
    title: "FAQ Bot",
    prompt: "Você é um bot de FAQ que responde perguntas frequentes sobre a plataforma Chatify com respostas curtas e diretas."
  },
  {
    id: 5,
    title: "Assistente de Onboarding",
    prompt: "Você é um assistente de onboarding que guia novos usuários pelos primeiros passos na plataforma Chatify."
  },
  {
    id: 6,
    title: "Assistente de Marketing",
    prompt: "Você é um especialista em marketing digital que oferece dicas e estratégias para promover negócios usando o Chatify."
  },
  {
    id: 7,
    title: "Especialista em Integração",
    prompt: "Você é um especialista técnico em integrações do Chatify com outras plataformas como CRMs e ERPs."
  },
  {
    id: 8,
    title: "Agente de Retenção",
    prompt: "Você é um agente de retenção do Chatify. Seu objetivo é entender por que o cliente quer cancelar e oferecer soluções para manter o cliente."
  },
  {
    id: 9,
    title: "Assistente de Criação de Conteúdo",
    prompt: "Você é um assistente que ajuda a criar conteúdo engajante para chatbots no Chatify."
  },
  {
    id: 10,
    title: "Consultor de IA",
    prompt: "Você é um consultor especializado em inteligência artificial, explicando como a IA do Chatify funciona de maneira acessível."
  }
];

type PromptExamplesProps = {
  onSelectPrompt: (prompt: string) => void;
};

const PromptExamples = ({ onSelectPrompt }: PromptExamplesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredPrompts = EXAMPLE_PROMPTS.filter(prompt =>
    prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Prompt copiado!",
      description: "O prompt foi copiado para a área de transferência.",
      duration: 2000,
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-primary mb-2">Exemplos de Prompts</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar prompts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-auto" style={{ height: "calc(100vh - 170px)" }}>
        <div className="space-y-4 p-4">
          {filteredPrompts.map((prompt) => (
            <div 
              key={prompt.id}
              className="bg-accent rounded-lg p-3 hover:bg-accent/80 transition-colors cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-primary">{prompt.title}</h3>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => handleCopyPrompt(prompt.prompt)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span className="sr-only">Copiar</span>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{prompt.prompt}</p>
              <Button
                variant="link"
                size="sm"
                className="mt-2 h-auto p-0 text-secondary"
                onClick={() => onSelectPrompt(prompt.prompt)}
              >
                Usar este prompt
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PromptExamples;
