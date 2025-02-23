import React from "react";

type CPUProps = {
  activeProcessId: string;
};

export function CPU({ activeProcessId }: CPUProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-lg mb-2 text-gray-700">CPU</div>
      <div className="w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-gray-500 mb-2" />
      <div className="text-sm text-gray-600 flex flex-col gap-2.5">
        활성 프로세스: <span className="font-bold">#{activeProcessId}</span>
      </div>
    </div>
  );
}
