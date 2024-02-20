import { Metadata } from 'next';

import NoteIdClient from './page.client';

interface Props {
  params: { id: string; title: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params, }: Props): Promise<Metadata> {
  return {
    title: 'Notipad - note edit',
  };
}

export default function NoteId() {
  return <NoteIdClient />;
}
