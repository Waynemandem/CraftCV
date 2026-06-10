// src/hooks/useProfile.js
import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '../lib/profileService'

export function useProfile() {
  const { data: profile, isLoading } = useQuery({
    queryKey:  ['profile'],
    queryFn:   fetchProfile,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  })

  const isPro = profile?.plan === 'pro' || profile?.plan === 'agency'

  return { profile, isPro, isLoading }
}