
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
    <div className="min-h-screen flex flex-col bg-white">
      <MiniHeader onTutorialAdded={handleTutorialAdded} />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-auto">
          <PromptEditor tutorialUrl={tutorialUrl} />
        </div>
        
        <div className="w-1/3 max-w-md">
          <PromptExamples onSelectPrompt={handleSelectPrompt} />
        </div>
      </div>
    </div>
  );
};

export default Index;
