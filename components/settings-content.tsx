'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/password-input';
import { saveApiKeys } from '@/app/actions/settings';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

interface SettingsContentProps {
  user: User;
  settings: {
    openrouter_api_key?: string | null;
    replicate_api_key?: string | null;
  } | null;
}

export function SettingsContent({ user, settings }: SettingsContentProps) {
  async function handleSubmit(formData: FormData) {
    try {
      const result = await saveApiKeys(formData);
      if (result.success) {
        toast.success(result.isUpdate ? 'Settings Updated' : 'Settings Saved', {
          description: result.message,
        });
      } else {
        toast.error('Error', {
          description: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error', {
        description: 'An unexpected error occurred',
      });
    }
  }

  return (
    <>
      <div id="account">
        <h2 className="text-lg font-medium mb-6">Account Settings</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 p-4 rounded-lg border w-full">
            <p className="font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      <div id="api-keys" className="hidden">
        <h2 className="text-lg font-medium mb-6">API Keys</h2>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="openrouter_api_key">OpenRouter API Key</Label>
            <PasswordInput
              id="openrouter_api_key"
              name="openrouter_api_key"
              placeholder="sk-or-..."
              defaultValue={settings?.openrouter_api_key ?? ''}
            />
            <p className="text-sm text-muted-foreground">
              Used for powering the agent LLM. Get your API key from{' '}
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
            <Label htmlFor="replicate_api_key">Replicate API Key</Label>
            <PasswordInput
              id="replicate_api_key"
              name="replicate_api_key"
              placeholder="r8_..."
              defaultValue={settings?.replicate_api_key ?? ''}
            />
            <p className="text-sm text-muted-foreground">
              Used for image generation. Get your API key from{' '}
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
    </>
  );
}
