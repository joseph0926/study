import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { MemberType } from '../init.type';
import { useInitStore } from '../init.store';
import { useShallow } from 'zustand/shallow';
import { cn } from '@/lib/utils';

type TypeCardProps = {
  initMemberType: MemberType;
  className?: string;
};

const memberTypeMap = {
  BUYER: { title: '구매자', desc: '중고 물품을 찾고 싶어요' },
  SELLER: { title: '판매자', desc: '물품을 판매하고 싶어요' },
};

export const TypeCard = ({ initMemberType, className }: TypeCardProps) => {
  const { memberType, setMemberType } = useInitStore(
    useShallow((state) => ({
      memberType: state.memberType,
      setMemberType: state.setMemberType,
    })),
  );

  const isSelectedMemberType = memberType === initMemberType;

  return (
    <Card
      className={cn(
        'transition-colors',
        isSelectedMemberType ? 'border-primary bg-primary/20' : 'border-border',
        className,
      )}
      onClick={() => setMemberType(initMemberType)}
    >
      <CardHeader>
        <CardTitle
          className={cn(
            isSelectedMemberType ? 'text-primary' : 'text-foreground',
          )}
        >
          {memberTypeMap[initMemberType].title}
        </CardTitle>
        <CardDescription>{memberTypeMap[initMemberType].desc}</CardDescription>
      </CardHeader>
    </Card>
  );
};
