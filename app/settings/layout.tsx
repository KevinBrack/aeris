"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const sections = [
    { name: "Account", id: "account" },
    { name: "API Keys", id: "api-keys" },
];

function SettingsNav() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeSection, setActiveSection] = useState("account");

    useEffect(() => {
        const section = searchParams.get("section") || "account";
        setActiveSection(section);
        // Hide all sections first
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) el.classList.add("hidden");
        });
        // Show active section
        const activeEl = document.getElementById(section);
        if (activeEl) activeEl.classList.remove("hidden");
    }, [searchParams]);

    const handleSectionChange = (sectionId: string) => {
        router.push(`/settings?section=${sectionId}`);
    };

    return (
        <nav className="w-48 flex-shrink-0">
            <ul className="flex flex-col gap-2 sticky top-4">
                {sections.map((section) => (
                    <li key={section.id}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start",
                                activeSection === section.id && "bg-muted"
                            )}
                            onClick={() => handleSectionChange(section.id)}
                        >
                            {section.name}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-12 w-full max-w-7xl mx-auto px-4">
            <Suspense fallback={<div>Loading...</div>}>
                <SettingsNav />
            </Suspense>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    );
}
