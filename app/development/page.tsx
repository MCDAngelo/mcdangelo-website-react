import { Metadata } from 'next';
import DevelopmentClient from './DevelopmentClient';

export const metadata: Metadata = {
  title: "Development | Maria D'Angelo",
  description: 'A collection of web applications, desktop tools, and terminal utilities.',
};

export default function DevelopmentPage() {
  return <DevelopmentClient />;
}

