import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageUpload } from './ImageUpload';
import { StoneSelector } from './StoneSelector';
import { ResultDisplay } from './ResultDisplay';
import { QuoteForm } from './QuoteForm';
import { StoneType } from '@/lib/stoneTypes';
import { generateVisualization } from '@/lib/openrouter';

export function VisualizationTool() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStone, setSelectedStone] = useState<StoneType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const canGenerate = uploadedImage && selectedStone && !isGenerating;

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedStone) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const result = await generateVisualization({
        imageBase64: uploadedImage,
        stoneType: selectedStone.name,
        stoneDescription: selectedStone.description,
        pavementUrl: selectedStone.imageUrl,
      });

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
      }
    } catch (error) {
      console.error('Failed to generate visualization:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSelectedStone(null);
    setGeneratedImage(null);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Step 1: Image Upload */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </span>
              <h3 className="text-lg font-medium text-foreground">Töltse Fel a Fotót</h3>
            </div>
            <ImageUpload
              onImageSelect={setUploadedImage}
              selectedImage={uploadedImage}
              onClear={handleClearImage}
            />
          </div>

          {/* Step 2: Stone Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </span>
              <h3 className="text-lg font-medium text-foreground">Válassza Ki a Térkövet</h3>
            </div>
            <StoneSelector
              selectedStone={selectedStone}
              onSelectStone={setSelectedStone}
            />
          </div>

          {/* Step 3: Generate Button */}
          <div className="pt-4 border-t border-border">
            <Button
              size="lg"
              className="w-full"
              disabled={!canGenerate}
              onClick={handleGenerate}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Látványterv Készítése...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Látványterv Elkészítése
                </>
              )}
            </Button>
            {!uploadedImage && !selectedStone && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Töltsön fel egy fotót és válasszon térkő típust a kezdéshez
              </p>
            )}
            {uploadedImage && !selectedStone && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Most válasszon térkő típust fent
              </p>
            )}
            {!uploadedImage && selectedStone && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Töltsön fel egy fotót az udvaráról a folytatáshoz
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Result Display */}
      {generatedImage && uploadedImage && (
        <Card>
          <CardContent className="p-6">
            <ResultDisplay
              originalImage={uploadedImage}
              generatedImage={generatedImage}
            />
          </CardContent>
        </Card>
      )}

      {/* Quote Form - appears after generation */}
      {generatedImage && (
        <QuoteForm
          originalImage={uploadedImage || undefined}
          generatedImage={generatedImage}
          selectedStone={selectedStone?.name}
        />
      )}

      {/* Reset Option */}
      {generatedImage && (
        <div className="text-center">
          <Button variant="outline" onClick={handleReset}>
            Új Fotóval Kezdés
          </Button>
        </div>
      )}
    </div>
  );
}
