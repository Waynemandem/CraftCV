-- OrbitCV RLS policy snapshot for version control
-- This file documents the policies that should exist on the live database.
-- Review against the Supabase dashboard before applying if your live schema has drifted.
-- Assumption: profiles.id references auth.users.id and resumes.user_id references auth.users.id.

alter table if exists public.resumes enable row level security;
alter table if exists public.profiles enable row level security;

-- Resumes policies

drop policy if exists "Users can view their own resumes" on public.resumes;
create policy "Users can view their own resumes"
on public.resumes
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own resumes" on public.resumes;
create policy "Users can insert their own resumes"
on public.resumes
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own resumes" on public.resumes;
create policy "Users can update their own resumes"
on public.resumes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own resumes" on public.resumes;
create policy "Users can delete their own resumes"
on public.resumes
for delete
to authenticated
using (auth.uid() = user_id);

-- Profiles policies
-- These are the expected self-service policies for the profiles table.

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile"
on public.profiles
for delete
to authenticated
using (auth.uid() = id);
