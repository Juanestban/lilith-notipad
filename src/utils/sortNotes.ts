import { Note } from '@lilith/interfaces';

export const sortNotes = (currentNotes: Note[]) => {
  const newNotes = currentNotes.map(({ updatedAt, ...rest }) => ({ ...rest, updatedAt: updatedAt ?? new Date('2022-02-01') }));
  const sortedNotes = newNotes.sort((prev, next) => {
    const { updatedAt: prevUpdatedAt } = prev;
    const { updatedAt: nextUpdatedAt } = next;

    if (!prevUpdatedAt) return -1;
    if (!nextUpdatedAt) return -1;

    const comaparePrev = new Date(prevUpdatedAt).getTime();
    const comaparenext = new Date(nextUpdatedAt).getTime();

    return comaparenext - comaparePrev;
  });

  return sortedNotes;
};
