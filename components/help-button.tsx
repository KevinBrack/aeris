import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HelpCircle } from 'lucide-react';

export function HelpButton() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-2">
          <p className="text-xs text-muted-foreground">Copyright {currentYear} Kevin Brack</p>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
