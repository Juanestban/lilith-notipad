import { FC, forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import { Loading } from '../Loading';

import s from './Button.module.css';

type PrimaryButtonProps = Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'disabled'>;

interface ButtonProps extends PrimaryButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, variant = 'primary', className, isDisabled, isLoading, ...props }, ref) => {
  const classes = cn(s.baseButton, s[variant], (isDisabled ?? isLoading) && s.disabled, className);

  return (
    <button ref={ref} className={classes} disabled={isDisabled ?? isLoading} {...props}>
      {isLoading ? <Loading size="small" isCenter={isLoading} /> : children}
    </button>
  );
}) as FC<ButtonProps>;

export default Button;
export type { ButtonProps };
