import { FC } from 'react';
import * as IconsAll from 'react-icons/fi';

import { Button, ButtonProps } from '../Button';

type OmitedButtonProps = Omit<ButtonProps, 'children' | 'color'>;

interface ButtonIconProps extends OmitedButtonProps {
  icon: keyof typeof IconsAll;
  color?: string;
  size?: number;
}

const ButtonIcon: FC<ButtonIconProps> = ({ icon, color, size = 20, ...props }) => {
  const Icon = IconsAll[icon];

  return (
    <Button style={{ borderColor: 'transparent', color: '#09f' }} {...props}>
      <Icon size={size} color={color} />
    </Button>
  );
};

export default ButtonIcon;
export type { ButtonIconProps };
