
import { useState } from 'react';
import { Send, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type PromptEditorProps = {
  tutorialUrl?: string;
};

const PromptEditor = ({ tutorialUrl }: PromptEditorProps) => {
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

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

  const handleReset = () => {
    setPrompt('Você é um assistente virtual da Chatify, ajude o usuário com respostas claras e objetivas.');
  };

  return (
    <div className="h-full flex flex-col">
      {tutorialUrl && (
        <div className="p-4 bg-muted rounded-lg mb-4">
          <h3 className="text-sm font-medium mb-2">Tutorial</h3>
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            <iframe
              src={tutorialUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">Editor de Prompt</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Restaurar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="flex items-center gap-1 text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpar
            </Button>
          </div>
        </div>
        
        <Textarea
          placeholder="Digite seu prompt aqui..."
          className="flex-1 resize-none text-base p-4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
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
    </div>
  );
};

export default PromptEditor;
