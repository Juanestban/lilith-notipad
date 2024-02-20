import { FC, HTMLProps, CSSProperties } from 'react';
import cn from 'classnames';

// import { Size } from '@lilith/interfaces'

import s from './Skeleton.module.css';

type PrimitiveSpanProps = Omit<HTMLProps<HTMLSpanElement>, 'size'>;

interface SkeletonProps extends PrimitiveSpanProps {
  size?: { width: number | string; height: number | string };
  color?: string;
}

const Skeleton: FC<SkeletonProps> = ({ className, color, size = { width: 20, height: 20 }, ...props }) => {
  const isObject = !Array.isArray(size) && typeof size === 'object' && size !== null;
  const classes = cn(s.skeletonContainer, !isObject && s.test, className);
  const { height, width } = size;
  const inlineStyles: CSSProperties = {
    color,
    width,
    height,
  };

  return <span className={classes} style={inlineStyles} {...props} />;
};

export default Skeleton;
export type { SkeletonProps };
