"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

type PasswordInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "defaultValue"
> & {
    defaultValue?: string;
};

export function PasswordInput({
    defaultValue = "",
    ...props
}: PasswordInputProps) {
    // Show password only when the field is empty (no defaultValue)
    const [showPassword, setShowPassword] = useState(!defaultValue);
    const [value, setValue] = useState(defaultValue);

    // Update value when defaultValue changes
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                {...props}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    props.onChange?.(e);
                }}
                className="pr-10"
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>
        </div>
    );
}
