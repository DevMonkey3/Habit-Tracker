
import Head from 'next/head';
import HabitTracker from './HabitTracker';
import './globals.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Habit Tracker</title>
        <meta name="description" content="A Next.js Habit Tracker with Confetti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="app">
        <HabitTracker/>
      </main>
    </>
  );
}
// new commit