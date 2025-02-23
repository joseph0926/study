import { Button } from "@/components/ui/button";

export const ContextSwitch = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      onClick={onClick}
      variant="default"
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      문맥 교환(프로세스 전환)
    </Button>
  );
};
