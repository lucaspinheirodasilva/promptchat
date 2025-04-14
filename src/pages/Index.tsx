
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
      
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <div className="flex-1 p-4 overflow-hidden order-2 md:order-1">
          <PromptEditor 
            tutorialUrl={tutorialUrl} 
            prompt={promptText}
            setPrompt={setPromptText}
          />
        </div>
        
        {/* Adjusted for better mobile view */}
        <div className={`${isMobile ? 'h-96' : 'h-full'} w-full md:w-80 flex-shrink-0 overflow-hidden order-1 md:order-2`}>
          <PromptExamples onSelectPrompt={handleSelectPrompt} />
        </div>
      </div>
    </div>
  );
};

export default Index;
