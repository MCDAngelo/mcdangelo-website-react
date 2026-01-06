import { Metadata } from 'next';
import ArtClient from './ArtClient';

export const metadata: Metadata = {
  title: "Art & Creation | Maria D'Angelo",
  description: 'Explorations in texture, color, and geometric patterns through textiles.',
};

export default function ArtPage() {
  return <ArtClient />;
}

