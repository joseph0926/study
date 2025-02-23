"use client";

import { useState } from "react";
import { processes } from "./_constants/process";
import { type ProcessType } from "./_types/cs.type";
import { OSContainer } from "./_components/os-container";
import { CPU } from "./_components/cpu";
import { PCB } from "./_components/pcb";
import { Process } from "./_components/process";
import { ContextSwitch } from "./_components/context-switch";

interface SavedContext {
  processId: string;
  context: string;
}

export default function CsPage() {
  const [allProcesses] = useState<ProcessType[]>(processes);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [savedContexts, setSavedContexts] = useState<SavedContext[]>([]);

  const handleContextSwitch = () => {
    const currentIndex = activeIndex;
    const nextIndex = (activeIndex + 1) % allProcesses.length;

    const currentProcess = allProcesses[currentIndex];
    setSavedContexts((prev) => [
      ...prev.filter((sc) => sc.processId !== currentProcess.id),
      {
        processId: currentProcess.id,
        context: `Saved at ${new Date().toLocaleTimeString()}`,
      },
    ]);

    const nextProcess = allProcesses[nextIndex];
    const found = savedContexts.find((sc) => sc.processId === nextProcess.id);

    if (found) {
      console.log(
        `Restoring Process #${nextProcess.id} context: `,
        found.context,
      );
    }

    setActiveIndex(nextIndex);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">
        OS에서의 프로세스 &amp; 쓰레드 예시
      </h1>

      <OSContainer>
        <div className="flex items-start justify-around w-full gap-4">
          <CPU activeProcessId={allProcesses[activeIndex].id} />

          <PCB savedContexts={savedContexts} />

          <div className="flex gap-4">
            {allProcesses.map((p, index) => (
              <Process
                key={p.id}
                process={p}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </OSContainer>

      <div className="mt-6">
        <ContextSwitch onClick={handleContextSwitch} />
      </div>
    </div>
  );
}
