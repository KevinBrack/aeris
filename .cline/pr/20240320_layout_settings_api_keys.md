# Layout Adjustments and Settings Implementation

## Changes Made

### Layout Improvements

- Fixed content width and alignment in root layout
- Added proper padding below navbar
- Added bottom padding for content scrolling
- Implemented global toast notifications using Sonner

### Settings Page

- Created settings page with tab-based navigation
- Added Account and API Keys sections
- Implemented secure password input component with visibility toggle
- Added proper form validation and error handling
- Added success/error notifications for form submissions

### API Key Management

- Created Supabase migration for settings table
- Added Row Level Security policies for user data isolation
- Implemented server actions for secure API key management
- Added OpenRouter API key for LLM functionality
- Added Replicate API key for image generation
- Added proper validation and error handling

### Code Organization

- Moved client components to components directory
- Proper separation of server and client components
- Added TypeScript types for better type safety
- Followed Next.js best practices for file organization

## Migration Details

```sql
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  openrouter_api_key text,
  replicate_api_key text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS
alter table settings enable row level security;

-- Create policies
create policy "Users can view their own settings"
  on settings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own settings"
  on settings for update
  using (auth.uid() = user_id);

-- Create function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_updated_at
  before update on settings
  for each row
  execute procedure handle_updated_at();
```

## Testing

1. Layout changes:

    - Verify content width and alignment
    - Check padding and spacing
    - Test scrolling behavior

2. Settings functionality:

    - Test tab navigation
    - Verify form submission
    - Check API key visibility toggle
    - Verify toast notifications

3. Database:
    - Test RLS policies
    - Verify API key storage
    - Check user isolation

## Notes

- Run migrations: `pnpm db:migration:push`
- Get API keys from:
    - OpenRouter: https://openrouter.ai/keys
    - Replicate: https://replicate.com/account/api-tokens
