
import { useState } from 'react';
import MiniHeader from '@/components/MiniHeader';
import PromptEditor from '@/components/PromptEditor';
import PromptExamples from '@/components/PromptExamples';

const Index = () => {
  const [promptText, setPromptText] = useState('');
  const [tutorialUrl, setTutorialUrl] = useState('');

  const handleSelectPrompt = (prompt: string) => {
    setPromptText(prompt);
  };

  const handleTutorialAdded = (url: string) => {
    setTutorialUrl(url);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-white shadow-lg overflow-hidden">
      <MiniHeader onTutorialAdded={handleTutorialAdded} />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 overflow-hidden">
          <PromptEditor 
            tutorialUrl={tutorialUrl} 
            prompt={promptText}
            setPrompt={setPromptText}
          />
        </div>
        
        <div className="w-80 flex-shrink-0 h-full overflow-hidden">
          <PromptExamples onSelectPrompt={handleSelectPrompt} />
        </div>
      </div>
    </div>
  );
};

export default Index;
