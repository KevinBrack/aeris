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
        <nav className="w-full border-b mb-6">
            <div className="flex space-x-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleSectionChange(section.id)}
                        className={cn(
                            "pb-2 text-sm font-medium relative",
                            activeSection === section.id
                                ? "text-foreground border-b-2 border-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        {section.name}
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            <Suspense fallback={<div>Loading...</div>}>
                <SettingsNav />
            </Suspense>
            <div className="w-full">{children}</div>
        </div>
    );
}
