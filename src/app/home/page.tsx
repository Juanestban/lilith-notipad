import { Metadata } from 'next';

import HomeClient from './page.client';

export const metadata: Metadata = {
  title: 'Notipad App Notes - Home',
  description: 'Notipad/Home page - principal and main page',
};

export default function Home() {
  return <HomeClient />;
}
