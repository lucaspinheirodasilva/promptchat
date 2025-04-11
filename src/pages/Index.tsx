
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
    <div className="min-h-screen flex flex-col bg-white max-w-6xl mx-auto shadow-lg">
      <MiniHeader onTutorialAdded={handleTutorialAdded} />
      
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-50px)]">
        <div className="flex-1 p-4 overflow-y-auto max-w-3xl">
          <PromptEditor tutorialUrl={tutorialUrl} />
        </div>
        
        <div className="w-80 flex-shrink-0">
          <PromptExamples onSelectPrompt={handleSelectPrompt} />
        </div>
      </div>
    </div>
  );
};

export default Index;
