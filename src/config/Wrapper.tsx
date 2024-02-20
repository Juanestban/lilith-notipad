'use client'
import { ReactNode } from 'react';
import { useSession, useNoteContext } from '@lilith/contexts';
import { Skeleton } from '@lilith/components';

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { loading: loadingUser } = useSession();
  const { loading: loadingNotes } = useNoteContext();

  if (loadingUser || loadingNotes)
    return (
      <>
        <div className="containerSearchSkeleton">
          <Skeleton size={{ width: '100%', height: 50 }} />
        </div>
        <div className="containerSkeletonNotes">
          {Array.from({ length: 8 })
            .fill('')
            .map((_, index) => (
              <Skeleton key={index} size={{ width: '100%', height: '100%' }} />
            ))}
        </div>
      </>
    );

  return <>{children}</>;
};
