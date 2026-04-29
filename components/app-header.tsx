import { ThemeToggle } from '@/components/theme-toggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-11 items-center gap-2 border-b bg-background px-4">
      <div className="flex-1" />
      <ThemeToggle />
    </header>
  );
}
