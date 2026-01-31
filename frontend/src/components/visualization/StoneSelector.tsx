import { stoneTypes, StoneType } from '@/lib/stoneTypes';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StoneSelectorProps {
  selectedStone: StoneType | null;
  onSelectStone: (stone: StoneType) => void;
}

export function StoneSelector({ selectedStone, onSelectStone }: StoneSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground text-center">Válasszon Térkő Típust</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 justify-items-center">
        {stoneTypes.map((stone) => {
          const isSelected = selectedStone?.id === stone.id;
          return (
            <button
              key={stone.id}
              onClick={() => onSelectStone(stone)}
              className={cn(
                "relative group rounded-lg overflow-hidden border-2 transition-all w-full max-w-40",
                isSelected
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="aspect-square relative">
                <img
                  src={stone.imageUrl}
                  alt={stone.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity",
                    isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )}
                >
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-2 bg-card">
                <p className={cn(
                  "text-sm font-medium truncate",
                  isSelected ? "text-primary" : "text-foreground"
                )}>
                  {stone.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
