import { FC, forwardRef, DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Button.module.css';

interface ButtonProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, ...props }, ref) => {
    const classes = cn(s.baseButton, s[variant], className);

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
) as FC<ButtonProps>;

export default Button;
export type { ButtonProps };
