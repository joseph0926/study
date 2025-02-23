import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

interface OSContainerProps {
  children: React.ReactNode;
}

export function OSContainer({ children }: OSContainerProps) {
  return (
    <Card className="w-full max-w-6xl border-2 border-gray-300 bg-white p-4 relative">
      <CardHeader>
        <CardTitle className="text-xl">운영체제 (OS)</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
