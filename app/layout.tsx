import { EnvVarWarning } from '@/components/env-var-warning';
import { HelpButton } from '@/components/help-button';
import HeaderAuth from '@/components/header-auth';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import Link from 'next/link';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                <Link href="/" className="flex gap-5 items-center font-semibold">
                  Aeris
                </Link>
                {hasEnvVars ? <HeaderAuth /> : <EnvVarWarning />}
              </div>
            </nav>
            <div className="flex-1 w-full flex flex-col pt-8 pb-16">
              <div className="w-full max-w-7xl mx-auto">{children}</div>
            </div>
          </main>
          <HelpButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
