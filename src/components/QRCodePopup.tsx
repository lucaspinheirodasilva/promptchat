
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogHeader
} from "@/components/ui/dialog";

type QRCodePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const QRCodePopup = ({ isOpen, onClose }: QRCodePopupProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Simulate loading the QR code
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoading(true);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-primary">
            Conectar WhatsApp
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6">
          {isLoading ? (
            <div className="h-64 w-64 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="relative h-64 w-64 bg-white p-2 rounded-lg shadow-md">
              {/* Simplified QR code for demonstration */}
              <div className="h-full w-full grid grid-cols-10 grid-rows-10 gap-1">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`
                      ${Math.random() > 0.7 ? "bg-primary" : "bg-white border border-gray-200"}
                      ${i === 0 || i === 9 || i === 90 || i === 99 ? "bg-primary rounded-lg" : ""}
                    `}
                  />
                ))}
              </div>
            </div>
          )}
          <p className="mt-4 text-sm text-center text-gray-500">
            Escaneie o código QR com seu WhatsApp para conectar
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodePopup;
