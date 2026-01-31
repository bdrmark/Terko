import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (imageDataUrl: string) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export function ImageUpload({ onImageSelect, selectedImage, onClear }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelect(result);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  if (selectedImage) {
    return (
      <div className="relative rounded-lg overflow-hidden border border-border">
        <img
          src={selectedImage}
          alt="Feltöltött udvar"
          className="w-full h-64 object-cover"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-3 right-3"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          {isDragging ? (
            <Upload className="h-8 w-8 text-primary" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">
            {isDragging ? 'Húzza ide a képet' : 'Töltse fel az udvar fotóját'}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Húzza ide vagy kattintson a böngészéshez
          </p>
        </div>
        <Button variant="outline" className="pointer-events-none">
          <Upload className="mr-2 h-4 w-4" />
          Fájl Kiválasztása
        </Button>
      </div>
    </div>
  );
}
