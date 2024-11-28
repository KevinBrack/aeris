"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function saveApiKeys(formData: FormData) {
    const openrouterApiKey = formData.get("openrouter_api_key") as string;
    const replicateApiKey = formData.get("replicate_api_key") as string;

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Check if user already has settings
    const { data: existingSettings } = await supabase
        .from("settings")
        .select()
        .eq("user_id", user.id)
        .single();

    if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
            .from("settings")
            .update({
                openrouter_api_key: openrouterApiKey,
                replicate_api_key: replicateApiKey,
            })
            .eq("user_id", user.id);

        if (error) throw error;
    } else {
        // Insert new settings
        const { error } = await supabase.from("settings").insert({
            user_id: user.id,
            openrouter_api_key: openrouterApiKey,
            replicate_api_key: replicateApiKey,
        });

        if (error) throw error;
    }

    revalidatePath("/settings");
}

export async function getApiKeys() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: settings, error } = await supabase
        .from("settings")
        .select("openrouter_api_key, replicate_api_key")
        .eq("user_id", user.id)
        .single();

    if (error) return null;
    return settings;
}
