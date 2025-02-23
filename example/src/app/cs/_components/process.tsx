import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Thread } from "./thread";
import { type ProcessType } from "../_types/cs.type";

type ProcessProps = {
  process: ProcessType;
  isActive: boolean;
};

export const Process = ({ process, isActive }: ProcessProps) => {
  return (
    <Card
      className={`
        w-64 border-2 transition-transform relative
        ${isActive ? "border-blue-500 shadow-lg scale-105 bg-blue-50" : "border-gray-300 bg-white"}
        ${isActive ? "animate-in fade-in-50 slide-in-from-bottom-2" : ""}
      `}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-blue-600 rounded-full" />
          프로세스 #{process.id}
        </CardTitle>
        <CardDescription>자원: {process.resource}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600">
          상태: {isActive ? "실행 중" : "대기 중"}
        </p>

        <div className="relative p-2 bg-gray-100 rounded-md border text-sm text-gray-700 mb-2">
          <p className="mb-1 text-center">공유 자원</p>
          {process.threads.map((_, idx) => (
            <div
              key={idx}
              className="absolute w-[1px] bg-gray-500 left-1/2 top-full"
              style={{
                height: "20px",
                transform: `translateX(-50%) translateY(${idx * 5}px)`,
              }}
            />
          ))}
        </div>

        <div className="flex flex-col items-center space-y-1">
          {process.threads.map((thread, idx) => (
            <Thread key={idx} name={thread} />
          ))}
        </div>
      </CardContent>

      {isActive && (
        <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          CPU
        </div>
      )}
    </Card>
  );
};
