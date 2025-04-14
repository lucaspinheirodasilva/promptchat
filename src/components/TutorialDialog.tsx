
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type TutorialDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
};

const TutorialDialog = ({ isOpen, onClose, videoUrl }: TutorialDialogProps) => {
  // Convert regular YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return url; // Return original if not a standard YouTube URL
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>Tutorial</DialogTitle>
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialDialog;
