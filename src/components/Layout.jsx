import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'
import { useEffect, Suspense } from 'react'
import { Loader2 } from 'lucide-react'
export function Layout() {
  const location = useLocation()

  // Scroll to top on route change, but not on hash navigation
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Inter'] text-slate-700 antialiased flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={
          <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
            <Loader2 className="size-10 animate-spin text-[#C9A84C]" />
            <p className="text-sm font-bold text-slate-500 animate-pulse">Loading Clinical Data...</p>
          </div>
        }>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
