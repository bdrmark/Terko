import { Hero } from '@/components/Hero';
import { VisualizationTool } from '@/components/visualization/VisualizationTool';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main id="visualization-tool" className="container px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Start Your Transformation
            </h2>
            <p className="text-muted-foreground">
              Just three simple steps to see your new patio come to life
            </p>
          </div>
          
          <VisualizationTool />
        </div>
      </main>
      
      <footer className="border-t border-border py-8 mt-12">
        <div className="container px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Hardscaping Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
