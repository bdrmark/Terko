import { useState } from 'react';
import { Download, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

export function ResultDisplay({ originalImage, generatedImage }: ResultDisplayProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'backyard-visualization.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground">Az Ön Látványterve</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
          >
            {showOriginal ? (
              <>
                <ToggleLeft className="mr-2 h-4 w-4" />
                Eredeti Kép
              </>
            ) : (
              <>
                <ToggleRight className="mr-2 h-4 w-4" />
                Látványterv
              </>
            )}
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Letöltés
          </Button>
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden border border-border">
        <img
          src={showOriginal ? originalImage : generatedImage}
          alt={showOriginal ? "Eredeti udvar" : "Látványterv új burkolattal"}
          className="w-full h-auto max-h-[500px] object-contain bg-muted"
        />
        <div className={cn(
          "absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium",
          showOriginal
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        )}>
          {showOriginal ? "Eredeti" : "Új Burkolattal"}
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Kattintson a váltógombra az eredeti fotó és a látványterv összehasonlításához
      </p>
    </div>
  );
}
