import { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Input.module.css';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  //  ...
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const classes = cn(s.baseInput, className);

    return <input ref={ref} className={classes} {...props} />;
  }
) as FC<InputProps>;

export default Input;
export type { InputProps };
