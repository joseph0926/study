import clsx from 'clsx';
import { ComponentProps } from 'react';

import styles from './button.module.css';

/*
  재사용 컴포넌트 구축시 유의점
  - 가장 높은 레벨(기준이될)에서 사용될 재사용 컴포넌트에 일반적인 속성들을 type으로 엮지 말기
    - 예를들어 className: string; type: string ... <- 이런거 자제
  - 대신 react 기본 타입을 활용하자 `ComponentProps<"HTML Tag">` + 추가할 커스텀 속성들,,
*/
export type ButtonProps = ComponentProps<'button'> & {
  variant: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size: 'sm' | 'md' | 'lg';
};

export const Button = ({ variant, className, size = 'md', ...props }: ButtonProps) => {
  let classes = clsx(styles.button, styles[variant], styles[size], className);

  return <button className={classes} {...props} />;
};
