import { FC, CSSProperties } from 'react';
import cs from 'classnames';

import s from './Loading.module.css';

type Size = 'small' | 'middle' | 'large' | 'x-large';

interface LoadingProps {
  size?: Size;
  color?: string;
  colorTop?: string;
  isCenter?: boolean;
}

const Loading: FC<LoadingProps> = ({ size = 'middle', color = '#f3f3f3', colorTop = '#383636', isCenter }) => {
  const sizesNumber: { [key in Size]: number | string } = {
    small: 10,
    middle: 20,
    large: 30,
    'x-large': '5rem',
  };
  const styles: CSSProperties = {
    width: sizesNumber[size],
    height: sizesNumber[size],
    borderColor: color,
    borderTopColor: colorTop,
  };

  return (
    <div className={cs(s.container, isCenter && s.isCenter)}>
      <div className={s.loading} style={styles}></div>
    </div>
  );
};

export default Loading;
export type { LoadingProps };
