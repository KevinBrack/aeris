import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getApiKeys } from '@/app/actions/settings';
import { SettingsContent } from '@/components/settings-content';

export default async function Settings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const settings = await getApiKeys();

  return <SettingsContent user={user} settings={settings} />;
}
