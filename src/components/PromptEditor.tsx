
import { useState } from 'react';
import { Send, Save, Trash2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import TutorialDialog from './TutorialDialog';
import { useIsMobile } from '@/hooks/use-mobile';

type PromptEditorProps = {
  tutorialUrl?: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
};

const PromptEditor = ({ tutorialUrl, prompt, setPrompt }: PromptEditorProps) => {
  const { toast } = useToast();
  const [showTutorial, setShowTutorial] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt vazio",
        description: "Por favor, insira um prompt antes de enviar.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Prompt enviado!",
      description: "Seu prompt foi enviado com sucesso.",
    });
    
    console.log('Prompt enviado:', prompt);
    // Here you would typically send the prompt to your backend
  };

  const handleClear = () => {
    setPrompt('');
  };

  const handleSaveDraft = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt vazio",
        description: "Nada para salvar como rascunho.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Rascunho salvo!",
      description: "Seu rascunho foi salvo com sucesso.",
    });
    
    console.log('Rascunho salvo:', prompt);
  };

  return (
    <div className="h-full flex flex-col">
      {tutorialUrl && (
        <div className="p-4 bg-muted rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Tutorial</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowTutorial(true)}
              className="flex items-center gap-1"
            >
              <Play className="h-3.5 w-3.5" />
              Ver Tutorial
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-primary">Editor de Prompt</h2>
          <div className="flex space-x-2 flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              className="flex items-center gap-1"
            >
              <Save className="h-3.5 w-3.5" />
              {!isMobile && "Salvar Rascunho"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex items-center gap-1 text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {!isMobile && "Limpar"}
            </Button>
          </div>
        </div>
        
        <div className="relative flex-1 overflow-hidden">
          <ScrollArea className="absolute inset-0">
            <Textarea
              placeholder="Digite seu prompt aqui..."
              className="min-h-full w-full resize-none text-base p-4 border-0 focus-visible:ring-0"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </ScrollArea>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="px-6"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Prompt
          </Button>
        </div>
      </div>

      {/* Tutorial Dialog */}
      {tutorialUrl && (
        <TutorialDialog 
          isOpen={showTutorial} 
          onClose={() => setShowTutorial(false)} 
          videoUrl={tutorialUrl}
        />
      )}
    </div>
  );
};

export default PromptEditor;
