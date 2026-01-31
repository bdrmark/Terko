import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const scrollToTool = () => {
    const toolSection = document.getElementById('visualization-tool');
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-secondary/50 to-background">
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Álmodja Meg Az
            <span className="block text-primary">Ideális Kertjét</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Töltsön fel egy fotót a kültéri teréről, és azonnal lássa, hogyan alakítanák át 
            a különböző térburkolók az udvarát. Nincs találgatás – csak gyönyörű lehetőségek.
          </p>
          
          <div className="pt-4">
            <Button size="lg" onClick={scrollToTool} className="text-base px-8">
              Kezdés
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
