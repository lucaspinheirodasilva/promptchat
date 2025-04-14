
import { useState } from 'react';
import MiniHeader from '@/components/MiniHeader';
import PromptEditor from '@/components/PromptEditor';
import PromptExamples from '@/components/PromptExamples';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [promptText, setPromptText] = useState('');
  const [tutorialUrl, setTutorialUrl] = useState('https://www.youtube.com/watch?v=V__8y5qx4Wg');
  const isMobile = useIsMobile();

  const handleSelectPrompt = (prompt: string) => {
    setPromptText(prompt);
  };

  const handleTutorialAdded = (url: string) => {
    setTutorialUrl(url);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white shadow-lg overflow-hidden">
      <MiniHeader onTutorialAdded={handleTutorialAdded} tutorialUrl={tutorialUrl} />
      
      <div className="flex flex-1 overflow-hidden flex-col">
        {/* Mobile Layout - Show examples preview first, then editor */}
        {isMobile && (
          <div className="h-40 overflow-hidden">
            <PromptExamples onSelectPrompt={handleSelectPrompt} />
          </div>
        )}
        
        {/* Prompt Editor - Always visible */}
        <div className="flex-1 p-4 overflow-hidden">
          <PromptEditor 
            tutorialUrl={tutorialUrl} 
            prompt={promptText}
            setPrompt={setPromptText}
          />
        </div>
        
        {/* Desktop Layout - Show examples sidebar */}
        {!isMobile && (
          <div className="w-80 h-full flex-shrink-0 absolute top-16 right-0 overflow-hidden">
            <PromptExamples onSelectPrompt={handleSelectPrompt} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
