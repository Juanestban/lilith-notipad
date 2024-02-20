import { FC, forwardRef, CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Spinner.module.css';

interface SpinnerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: number;
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({ size, className, ...props }, ref) => {
  const style: CSSProperties = { width: size, height: size };

  return (
    <div ref={ref} className={cn(s.circles, className)} style={style} {...props}>
      <div className={s.circle1} />
      <div className={s.circle2} />
      <div className={s.circle3} />
    </div>
  );
}) as FC<SpinnerProps>;

export default Spinner;
export type { SpinnerProps };
