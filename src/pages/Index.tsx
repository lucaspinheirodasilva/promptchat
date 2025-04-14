
import { useState } from 'react';
import MiniHeader from '@/components/MiniHeader';
import PromptEditor from '@/components/PromptEditor';
import PromptExamples from '@/components/PromptExamples';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [promptText, setPromptText] = useState('');
  const [tutorialUrl, setTutorialUrl] = useState('https://www.youtube.com/watch?v=V__8y5qx4Wg');
  const isMobile = useIsMobile();
  const [expandExamples, setExpandExamples] = useState(false);

  const handleSelectPrompt = (prompt: string) => {
    setPromptText(prompt);
    // On mobile, collapse examples after selection
    if (isMobile) {
      setExpandExamples(false);
    }
  };

  const handleTutorialAdded = (url: string) => {
    setTutorialUrl(url);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white shadow-lg overflow-hidden">
      <MiniHeader onTutorialAdded={handleTutorialAdded} tutorialUrl={tutorialUrl} />
      
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Prompt Editor - Priority on Mobile */}
        <div className={`flex-1 p-4 overflow-hidden ${isMobile && !expandExamples ? 'flex' : isMobile && expandExamples ? 'hidden' : ''} md:flex md:order-1`}>
          <PromptEditor 
            tutorialUrl={tutorialUrl} 
            prompt={promptText}
            setPrompt={setPromptText}
          />
        </div>
        
        {/* Examples Section - Collapsed by default on mobile */}
        {isMobile ? (
          <div className={`w-full flex-shrink-0 overflow-hidden ${expandExamples ? 'flex-1' : 'h-auto'}`}>
            <div className="border-t border-gray-200 md:border-t-0 md:border-l">
              {expandExamples ? (
                <div className="h-full">
                  <PromptExamples 
                    onSelectPrompt={handleSelectPrompt} 
                    onCollapse={() => setExpandExamples(false)}
                    showCollapseButton={true}
                  />
                </div>
              ) : (
                <div className="p-3 flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-primary">Exemplos de Prompts</h3>
                    <button 
                      onClick={() => setExpandExamples(true)}
                      className="text-xs text-primary hover:underline"
                    >
                      Ver mais exemplos
                    </button>
                  </div>
                  <PromptExamples 
                    onSelectPrompt={handleSelectPrompt}
                    limitDisplay={1}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full w-full md:w-80 flex-shrink-0 overflow-hidden order-1 md:order-2">
            <PromptExamples onSelectPrompt={handleSelectPrompt} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
