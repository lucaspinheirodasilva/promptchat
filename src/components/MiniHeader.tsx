
import { useState } from 'react';
import { Link2, Video, QrCode, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import QRCodePopup from './QRCodePopup';
import TutorialDialog from './TutorialDialog';
import { useIsMobile } from '@/hooks/use-mobile';

type MiniHeaderProps = {
  onTutorialAdded: (url: string) => void;
  tutorialUrl: string;
};

const MiniHeader = ({ onTutorialAdded, tutorialUrl }: MiniHeaderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const isMobile = useIsMobile();

  const handleConnect = () => {
    setShowQRCode(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleReconnect = () => {
    setShowQRCode(true);
  };

  const handleQRCodeClose = () => {
    setShowQRCode(false);
    // Simulate successful connection
    setIsConnected(true);
  };

  const handleAddVideo = () => {
    if (videoUrl.trim()) {
      onTutorialAdded(videoUrl);
      setVideoUrl('');
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 py-2 px-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-medium text-primary">
            <span className="mr-1 font-bold">Chatify</span>
            Prompt Builder
          </h1>
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {isConnected ? (
            <>
              <Button 
                onClick={handleReconnect} 
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-primary border-primary/20 hover:bg-primary/10"
              >
                <RefreshCw className="h-4 w-4" />
                {!isMobile && "Reconectar"}
              </Button>
              <Button 
                onClick={handleDisconnect} 
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-red-500 border-red-200 hover:bg-red-50"
              >
                <Link2 className="h-4 w-4" />
                {!isMobile && "Desconectar"}
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleConnect} 
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-primary border-primary/20 hover:bg-primary/10"
            >
              <QrCode className="h-4 w-4" />
              {!isMobile && "Conectar WhatsApp"}
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-1 text-secondary border-secondary/20 hover:bg-secondary/10"
                onClick={() => setShowTutorial(true)}
              >
                <Video className="h-4 w-4" />
                {!isMobile && "Tutorial"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Adicionar vídeo tutorial</h3>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="URL do vídeo" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="h-8"
                  />
                  <Button 
                    onClick={handleAddVideo}
                    size="sm"
                    className="h-8"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <QRCodePopup isOpen={showQRCode} onClose={handleQRCodeClose} />
      <TutorialDialog isOpen={showTutorial} onClose={() => setShowTutorial(false)} videoUrl={tutorialUrl} />
    </div>
  );
};

export default MiniHeader;
