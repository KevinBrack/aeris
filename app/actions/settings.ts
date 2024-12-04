'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export type SettingsActionResult = {
  success: boolean;
  message: string;
  isUpdate?: boolean;
};

export async function saveApiKeys(formData: FormData): Promise<SettingsActionResult> {
  const openrouterApiKey = formData.get('openrouter_api_key') as string;
  const replicateApiKey = formData.get('replicate_api_key') as string;

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        success: false,
        message: 'You must be logged in to save API keys',
      };
    }

    // Check if user already has settings
    const { data: existingSettings } = await supabase
      .from('settings')
      .select()
      .eq('user_id', user.id)
      .single();

    if (existingSettings) {
      // Update existing settings
      const { error } = await supabase
        .from('settings')
        .update({
          openrouter_api_key: openrouterApiKey,
          replicate_api_key: replicateApiKey,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      revalidatePath('/settings');
      return {
        success: true,
        message: 'Your API keys have been updated successfully',
        isUpdate: true,
      };
    } else {
      // Insert new settings
      const { error } = await supabase.from('settings').insert({
        user_id: user.id,
        openrouter_api_key: openrouterApiKey,
        replicate_api_key: replicateApiKey,
      });

      if (error) throw error;

      revalidatePath('/settings');
      return {
        success: true,
        message: 'Your API keys have been saved successfully',
        isUpdate: false,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save API keys. Please try again.',
    };
  }
}

export async function getApiKeys() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: settings, error } = await supabase
    .from('settings')
    .select('openrouter_api_key, replicate_api_key')
    .eq('user_id', user.id)
    .single();

  if (error) return null;
  return settings;
}
