import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getApiKeys, saveApiKeys } from "@/app/actions/settings";

export default async function Settings() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    const settings = await getApiKeys();

    return (
        <div id="account">
            <h2 className="text-lg font-medium mb-6">Account Settings</h2>
            <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 p-4 rounded-lg border w-full">
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-medium">API Keys</h3>
                    <form action={saveApiKeys} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="openrouter_api_key">
                                OpenRouter API Key
                            </Label>
                            <Input
                                id="openrouter_api_key"
                                name="openrouter_api_key"
                                type="password"
                                placeholder="sk-or-..."
                                defaultValue={
                                    settings?.openrouter_api_key || ""
                                }
                            />
                            <p className="text-sm text-muted-foreground">
                                Used for powering the agent LLM. Get your API
                                key from{" "}
                                <a
                                    href="https://openrouter.ai/keys"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    OpenRouter
                                </a>
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="replicate_api_key">
                                Replicate API Key
                            </Label>
                            <Input
                                id="replicate_api_key"
                                name="replicate_api_key"
                                type="password"
                                placeholder="r8_..."
                                defaultValue={settings?.replicate_api_key || ""}
                            />
                            <p className="text-sm text-muted-foreground">
                                Used for image generation. Get your API key from{" "}
                                <a
                                    href="https://replicate.com/account/api-tokens"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Replicate
                                </a>
                            </p>
                        </div>

                        <Button type="submit" className="w-fit">
                            Save API Keys
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
