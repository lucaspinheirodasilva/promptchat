import { useState, useEffect, useRef } from 'react';
import { Send, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import TutorialDialog from './TutorialDialog';

type PromptEditorProps = {
  tutorialUrl?: string;
  prompt: string;
  setPrompt: (prompt: string) => void;
};

const PromptEditor = ({ tutorialUrl, prompt, setPrompt }: PromptEditorProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  // Handle content formatting and editing
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

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
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
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

  // Format text with highlighted URLs, without using dangerouslySetInnerHTML
  const getFormattedContent = () => {
    if (!prompt) return null;
    
    // Match URLs with various common domain extensions
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[^\s]+\.(com|net|org|io|co|app|dev|ai|br|us|eu|uk|gov|edu)(\.[a-z]{2,})?)/gi;
    
    const parts = prompt.split(urlRegex);
    const matches = prompt.match(urlRegex) || [];
    
    // Interlace text parts with URL spans
    const formatted = [];
    let matchIndex = 0;
    
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        formatted.push(<span key={`text-${i}`}>{parts[i]}</span>);
      }
      
      if (matchIndex < matches.length && (i === 0 || i < parts.length - 1)) {
        formatted.push(
          <span key={`url-${matchIndex}`} className="font-bold text-primary">
            {matches[matchIndex]}
          </span>
        );
        matchIndex++;
      }
    }
    
    return formatted;
  };

  // Focus the textarea when the editor is clicked
  const handleEditorClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Keep the textarea in sync with editor scrolling
  useEffect(() => {
    const syncScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (editorRef.current && textareaRef.current) {
        if (target === editorRef.current) {
          textareaRef.current.scrollTop = editorRef.current.scrollTop;
        } else if (target === textareaRef.current) {
          editorRef.current.scrollTop = textareaRef.current.scrollTop;
        }
      }
    };

    const editorElement = editorRef.current;
    const textareaElement = textareaRef.current;

    if (editorElement && textareaElement) {
      editorElement.addEventListener('scroll', syncScroll);
      textareaElement.addEventListener('scroll', syncScroll);
    }

    return () => {
      if (editorElement && textareaElement) {
        editorElement.removeEventListener('scroll', syncScroll);
        textareaElement.removeEventListener('scroll', syncScroll);
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
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
        
        <div className="relative flex-1 overflow-hidden border rounded-md">
          <ScrollArea className="absolute inset-0 overflow-auto">
            <div 
              ref={editorRef}
              className="min-h-full w-full p-4 font-mono whitespace-pre-wrap break-words"
              onClick={handleEditorClick}
              style={{ caretColor: 'transparent' }}
            >
              {getFormattedContent()}
              {/* Ensure visible cursor when empty */}
              {!prompt && (
                <span className="cursor text-gray-400">|</span>
              )}
            </div>
            
            <textarea
              ref={textareaRef}
              id="prompt-textarea"
              placeholder="Digite seu prompt aqui..."
              className="absolute top-0 left-0 w-full h-full resize-none text-base p-4 border-0 bg-transparent text-transparent caret-black selection:bg-blue-200 focus-visible:ring-0 focus:outline-none"
              value={prompt}
              onChange={handleTextChange}
              style={{ caretColor: 'black' }}
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
