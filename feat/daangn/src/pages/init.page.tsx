import { Button } from '@/components/ui/button';
import { InitHeader } from '@/feature/init/components/init-header';
import { TypeCard } from '@/feature/init/components/type-card';
import { MEMBER_TYPE } from '@/feature/init/constants/member';
import { useInitStore } from '@/feature/init/init.store';
import { useShallow } from 'zustand/shallow';

export const InitPage = () => {
  const { memberType } = useInitStore(
    useShallow((state) => ({ memberType: state.memberType })),
  );

  return (
    <section className="flex size-full flex-col justify-between gap-4 overflow-hidden py-10">
      <div className="flex flex-col gap-4">
        <InitHeader />
        <div className="flex flex-col gap-1.5">
          <h1 className="text-lg font-bold">
            어떤 목적으로 당근을 이용하시나요?
          </h1>
          <p className="text-muted-foreground text-sm">
            선택에 따라 맞춤 기능을 추천해 드려요.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        {MEMBER_TYPE.map((membeer) => (
          <TypeCard
            key={membeer}
            initMemberType={membeer}
            className="flex-1/2 cursor-pointer"
          />
        ))}
      </div>
      <Button disabled={!memberType} className="w-full cursor-pointer">
        다음
      </Button>
    </section>
  );
};
