import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const FontSizeAdjuster = () => {
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const savedSize = localStorage.getItem("fontSize");
    if (savedSize) {
      const size = parseInt(savedSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}%`;
    }
  }, []);

  const adjustFontSize = (delta: number) => {
    const newSize = Math.min(150, Math.max(80, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
    localStorage.setItem("fontSize", newSize.toString());
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = "100%";
    localStorage.setItem("fontSize", "100");
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => adjustFontSize(-10)}
              disabled={fontSize <= 80}
              aria-label="Decrease font size"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Decrease font size</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={resetFontSize}
              disabled={fontSize === 100}
              aria-label="Reset font size"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset to default ({fontSize}%)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => adjustFontSize(10)}
              disabled={fontSize >= 150}
              aria-label="Increase font size"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Increase font size</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
