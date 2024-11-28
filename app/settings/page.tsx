import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Settings() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return (
        <>
            <div id="account">
                <h2 className="text-lg font-medium mb-6">Account Settings</h2>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 p-4 rounded-lg border w-full">
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
            <div id="api-keys" className="hidden">
                <h2 className="text-lg font-medium mb-6">API Keys</h2>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col gap-2 p-4 rounded-lg border w-full">
                        <p className="text-sm text-muted-foreground">
                            No API keys yet
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
