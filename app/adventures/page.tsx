import { Metadata } from 'next';
import AdventuresClient from './AdventuresClient';

export const metadata: Metadata = {
  title: "Adventures | Maria D'Angelo",
  description: 'Photo gallery of adventures from hiking, scuba diving, and more.',
};

export default function AdventuresPage() {
  return <AdventuresClient />;
}

