import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface SavedContext {
  processId: string;
  context: string;
}

type PCBProps = {
  savedContexts: SavedContext[];
};

export function PCB({ savedContexts }: PCBProps) {
  return (
    <Card className="border-2 border-gray-300 bg-white w-64 h-[300px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">PCB / Saved Context</CardTitle>
        <CardDescription className="text-xs">
          비활성화된 프로세스의 문맥
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto">
        {savedContexts.length === 0 ? (
          <p className="text-sm text-gray-400">아직 저장된 문맥 없음</p>
        ) : (
          savedContexts.map((ctx) => (
            <div
              key={ctx.processId}
              className="text-sm mb-2 p-2 bg-gray-50 rounded shadow-sm"
            >
              <div>프로세스 #{ctx.processId}</div>
              <div className="text-xs text-gray-600">[{ctx.context}]</div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
