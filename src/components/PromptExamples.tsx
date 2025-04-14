
import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample prompts data
const examplePrompts = [
  {
    id: 1,
    title: "Sugestão para e-mail marketing",
    content: "Gere 5 linhas de assunto atrativas para um e-mail marketing sobre um novo curso de programação para iniciantes. O curso custa R$297 com desconto de pré-lançamento (preço normal R$497). O público-alvo são pessoas sem experiência em tecnologia que querem mudar de carreira."
  },
  {
    id: 2,
    title: "Ideias para post no Instagram",
    content: "Crie 3 legendas para um post no Instagram de uma loja de roupas femininas que está lançando uma coleção de verão. Inclua hashtags relevantes e uma chamada para ação."
  },
  {
    id: 3,
    title: "Roteiro para vídeo curto",
    content: "Escreva um roteiro de 30 segundos para um vídeo explicando os benefícios de uma aplicação de meditação. O tom deve ser calmo e acolhedor. O aplicativo oferece meditações guiadas, sons relaxantes e histórias para dormir."
  },
  {
    id: 4,
    title: "Perguntas para enquete",
    content: "Crie 5 perguntas interessantes para uma enquete que vou postar no meu canal de tecnologia. Estou querendo entender melhor os interesses dos meus seguidores sobre inteligência artificial e suas aplicações no dia a dia."
  },
  {
    id: 5,
    title: "Texto para página de vendas",
    content: "Desenvolva a seção 'Sobre Nós' para a página de vendas de uma startup que oferece consultorias de marketing digital para pequenas empresas. Destaque a experiência da equipe e os resultados que já entregaram para outros clientes."
  },
  {
    id: 6,
    title: "Sugestões de melhorias UX",
    content: "Analise os seguintes problemas em um aplicativo de delivery de comida e sugira melhorias específicas para a experiência do usuário: tempo de carregamento lento, muitos passos para finalizar um pedido, e dificuldade para encontrar restaurantes específicos."
  },
  {
    id: 7,
    title: "Resposta para reclamação",
    content: "Escreva uma resposta para um cliente insatisfeito que deixou a seguinte avaliação: 'Produto chegou com atraso e a embalagem estava danificada. Muito decepcionado com o serviço, não recomendo.' O seu objetivo é resolver o problema e recuperar a confiança do cliente."
  },
  {
    id: 8,
    title: "Plano de conteúdo",
    content: "Crie um plano de conteúdo com 10 temas para artigos sobre finanças pessoais voltados para jovens adultos que estão começando a investir. Para cada tema, forneça um título atrativo e uma breve descrição do que o artigo deve abordar."
  }
];

type PromptExamplesProps = {
  onSelectPrompt: (prompt: string) => void;
};

const PromptExamples = ({ onSelectPrompt }: PromptExamplesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrompts, setFilteredPrompts] = useState(examplePrompts);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPrompts(examplePrompts);
    } else {
      const filtered = examplePrompts.filter(
        prompt => 
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrompts(filtered);
    }
  }, [searchTerm]);

  const handleUsePrompt = (content: string) => {
    onSelectPrompt(content);
    // On mobile, collapse the examples panel after selecting
    if (isMobile) {
      setExpandedMobile(false);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col bg-white border-l border-gray-200 overflow-hidden ${isMobile ? 'border-b' : ''}`}>
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Exemplos de Prompts</h2>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpandedMobile(!expandedMobile)}
              className="p-1"
            >
              {expandedMobile ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          )}
        </div>
        
        {/* Search is always visible for desktop, but conditionally for mobile */}
        {(!isMobile || expandedMobile) && (
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar prompts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>
      
      {/* Show examples based on screen size and expanded state */}
      {(!isMobile || expandedMobile) ? (
        <ScrollArea className={`flex-1 ${isMobile && expandedMobile ? 'h-64' : ''}`}>
          <div className="space-y-4 p-4">
            {filteredPrompts.map((prompt) => (
              <div 
                key={prompt.id} 
                className="border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition-colors"
              >
                <h3 className="font-medium text-sm text-gray-900 mb-1">{prompt.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{prompt.content}</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => handleUsePrompt(prompt.content)}
                >
                  {isMobile ? "Usar" : "Usar este prompt"}
                </Button>
              </div>
            ))}
            
            {filteredPrompts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum prompt encontrado com "{searchTerm}"</p>
              </div>
            )}
          </div>
        </ScrollArea>
      ) : (
        // On mobile when collapsed, show just the first example to indicate there are more
        <div className="p-2">
          {filteredPrompts.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-3 hover:border-primary/50 transition-colors">
              <h3 className="font-medium text-sm text-gray-900 mb-1">{filteredPrompts[0].title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{filteredPrompts[0].content}</p>
              <Button 
                size="sm" 
                variant="outline"
                className="w-full text-xs"
                onClick={() => handleUsePrompt(filteredPrompts[0].content)}
              >
                Usar
              </Button>
            </div>
          )}
          <div className="text-center mt-1 text-xs text-muted-foreground">
            <p>Toque para ver mais exemplos ↓</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptExamples;
