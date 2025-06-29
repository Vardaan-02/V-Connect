import React, { useEffect, useState, useRef } from 'react';

interface StoryProgressProps {
  count: number;
  activeIndex: number;
  duration: number;
  onComplete: () => void;
}

const StoryProgress: React.FC<StoryProgressProps> = ({ count, activeIndex, duration, onComplete }) => {
  const [progress, setProgress] = useState<number[]>(Array(count).fill(0));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const newProgress = [...progress];
    for (let i = 0; i < activeIndex; i++) {
      newProgress[i] = 100;
    }
    for (let i = activeIndex + 1; i < count; i++) {
      newProgress[i] = 0;
    }
    setProgress(newProgress);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const startTime = Date.now();
    const animate = () => {
      if (isPaused) {
        timeoutRef.current = setTimeout(animate, 100);
        return;
      }

      const elapsed = Date.now() - startTime;
      const progressValue = Math.min(100, (elapsed / duration) * 100);
      
      newProgress[activeIndex] = progressValue;
      setProgress([...newProgress]);

      if (progressValue < 100) {
        timeoutRef.current = setTimeout(animate, 100);
      } else {
        onComplete();
      }
    };

    timeoutRef.current = setTimeout(animate, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, count, duration, onComplete, isPaused]);

  useEffect(() => {
    const handlePointerDown = () => setIsPaused(true);
    const handlePointerUp = () => setIsPaused(false);

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div className="w-full flex gap-1 px-1 absolute top-4 z-30">
      {progress.map((p, i) => (
        <div key={i} className="h-0.5 bg-white/20 rounded-full flex-1 overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${p}%`, transition: p < 100 ? 'width 0.1s linear' : 'none' }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryProgress;
