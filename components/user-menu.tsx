"use client";

import { signOutAction } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface UserMenuProps {
    email: string;
}

export function UserMenu({ email }: UserMenuProps) {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src="" />
                    <AvatarFallback>
                        {email?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem className="flex gap-2" value="light">
                        <Sun className="h-4 w-4 text-muted-foreground" />
                        <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem className="flex gap-2" value="dark">
                        <Moon className="h-4 w-4 text-muted-foreground" />
                        <span>Dark</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                        className="flex gap-2"
                        value="system"
                    >
                        <Laptop className="h-4 w-4 text-muted-foreground" />
                        <span>System</span>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <form action={signOutAction}>
                    <DropdownMenuItem asChild>
                        <button className="w-full text-left">Sign out</button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
