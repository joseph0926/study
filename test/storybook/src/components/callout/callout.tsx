import type { PropsWithChildren } from 'react';
import { variants, type CalloutVariants } from './callout-variants';

type CallOutProps = PropsWithChildren<CalloutVariants> & { title: string };

export const Callout = ({ children, title, variant }: CallOutProps) => {
  return (
    <div className={variants({ variant })}>
      <h2 className="font-semibold">{title}</h2>
      <p>{children}</p>
    </div>
  );
};
