import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useInitStore } from '../init.store';
import { useShallow } from 'zustand/shallow';

const TOTAL_STEP = 4;

export const InitHeader = () => {
  const { step } = useInitStore(useShallow((state) => ({ step: state.step })));

  const isFirstStep = step === 1;
  const isLastStep = step === TOTAL_STEP;

  return (
    <header className="flex h-20 items-center justify-between gap-4">
      <Button
        variant="ghost"
        size="icon"
        disabled={isFirstStep}
        className="cursor-pointer"
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div className="font-semibold">
        <span className="text-primary">{step}</span> / {TOTAL_STEP}
      </div>
      <Button
        variant="outline"
        disabled={isLastStep}
        className="cursor-pointer"
      >
        건너뛰기
      </Button>
    </header>
  );
};
