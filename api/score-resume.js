import { createClient } from '@supabase/supabase-js'

const supabase = createClient (
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res){
   if (req.method !== 'POST' ) {
    return res.status(405).json({ error: 'Method not allowed' }) 
   }

   const token = req.headers.authorization?.split('Bearer ')[1]
   if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
   }
   const { data: authData, error: authError } = await supabase.auth.getUser(token)
   if (authError || !authData.user) {
    return res.status(401).json({ error: 'Invalid token' })
   }

   const userId = authData.user.id

   const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single()

  const isPro = profile?.plan === 'pro'
  const limit = isPro ? 20 : 3

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: scoreLogs } = await supabase
    .from('score_logs')
    .select('id')
    .eq('user_id', userId)
    .gt('created_at', twentyFourHoursAgo)

  if (scoreLogs && scoreLogs.length >= limit) {
    return res.status(429).json({
      error: `Daily resume score limit reached (${limit}/day). ${!isPro ? 'Upgrade to Pro for more.' : ''}`,
    })
  }
}