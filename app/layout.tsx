
import type { Metadata } from 'next';

import { Inter } from 'next/font/google'
import getSettingsByName from "./actions/getSettingsByName";

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  // read route params

  // fetch data
  const form = await getSettingsByName('metadata');
  const resMetadata = form?.values;

  return {
    keywords: resMetadata ? resMetadata[0] : 'Some keywords',
    description: resMetadata ? resMetadata[1] : 'Some description',
    title: resMetadata ? resMetadata[2] : 'The Quote Form',
  };
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
              {children}
    </html>
  )
}