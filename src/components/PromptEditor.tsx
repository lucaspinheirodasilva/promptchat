
import { useState, useEffect, useRef } from 'react';
import { Send, Save, Trash2, Bold, Italic, Link } from 'lucide-react';
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
  const [formattedPrompt, setFormattedPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Highlight various URL formats in the prompt
    if (prompt) {
      // Enhanced URL regex pattern that matches common TLDs
      const urlRegex = /(https?:\/\/[^\s]+)|(\b(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.(?:com|net|org|edu|gov|mil|io|co|ai|app|dev|me|info|biz|tv|online|store|blog|site|tech|xyz|design|studio|website|page|cloud|digital|live|pro|world|network|club|us|uk|eu|ca|au|br|jp|ru|in|cn|fr|de|it|nl|es|com\.br)[^\s]*\b)/gi;
      
      const formattedText = prompt.replace(
        urlRegex,
        '<span class="font-bold text-primary">$&</span>'
      );
      setFormattedPrompt(formattedText);
    } else {
      setFormattedPrompt('');
    }
  }, [prompt]);

  // Function to focus on textarea
  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      
      // Set cursor at the end of text
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  };

  // Focus when prompt changes
  useEffect(() => {
    focusTextarea();
  }, [prompt]);

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
    setTimeout(focusTextarea, 0);
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

  const handleFormatText = (format: 'bold' | 'italic' | 'link') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = prompt.substring(start, end);
    
    let newText = prompt;
    
    switch (format) {
      case 'bold':
        newText = prompt.substring(0, start) + `**${selectedText}**` + prompt.substring(end);
        break;
      case 'italic':
        newText = prompt.substring(0, start) + `*${selectedText}*` + prompt.substring(end);
        break;
      case 'link':
        newText = prompt.substring(0, start) + `[${selectedText}](url)` + prompt.substring(end);
        break;
    }
    
    setPrompt(newText);
    
    // Refocus and reposition cursor
    setTimeout(() => {
      textarea.focus();
      const newPosition = end + (format === 'bold' ? 4 : format === 'italic' ? 2 : 7);
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-primary">Editor de Prompt</h2>
          <div className="flex items-center space-x-1 flex-wrap gap-1">
            <div className="flex space-x-1 mr-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFormatText('bold')}
                className="h-8 w-8 p-0"
                title="Negrito"
              >
                <Bold className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFormatText('italic')}
                className="h-8 w-8 p-0"
                title="Itálico"
              >
                <Italic className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFormatText('link')}
                className="h-8 w-8 p-0"
                title="Link"
              >
                <Link className="h-3.5 w-3.5" />
              </Button>
            </div>
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
            {formattedPrompt ? (
              <div 
                className="min-h-full w-full resize-none text-base p-4 focus:outline-none"
                dangerouslySetInnerHTML={{ __html: formattedPrompt }}
                onClick={focusTextarea}
              />
            ) : null}
            <Textarea
              id="prompt-textarea"
              ref={textareaRef}
              placeholder="Digite seu prompt aqui..."
              className={`min-h-full w-full resize-none text-base p-4 border-0 focus-visible:ring-0 ${formattedPrompt ? 'absolute opacity-0 top-0 left-0 h-full' : ''}`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => {
                // Ensure cursor is visible - fake caret if needed
                if (textareaRef.current) {
                  textareaRef.current.style.caretColor = 'black';
                }
              }}
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
