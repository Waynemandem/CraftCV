import { StrictMode }  from 'react'
import { createRoot }  from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'

// Create the query client — one instance for the whole app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:  1000 * 60 * 5,   // data stays fresh for 5 mins
      retry:      1,                // retry failed requests once
      refetchOnWindowFocus: false,  // don't refetch when tab regains focus
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} 
    </QueryClientProvider>
   </HelmetProvider> 
  </StrictMode>
)