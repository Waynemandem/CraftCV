











// src/hooks/useProfile.js
import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '../lib/profileService'
import useAuthStore from '../store/authStore'

export function useProfile() {
  const user = useAuthStore(s => s.user)

  const { data: profile, isLoading } = useQuery({
    queryKey:  ['profile', user?.id ?? null],
    queryFn:   fetchProfile,
    enabled:   !!user?.id,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  })

  const isPro = profile?.plan === 'pro' || profile?.plan === 'agency'

  return { profile, isPro, isLoading }
}