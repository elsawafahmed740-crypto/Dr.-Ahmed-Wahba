import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { lazy } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })))
const SpecialtyPage = lazy(() => import('./pages/SpecialtyPage').then(module => ({ default: module.SpecialtyPage })))
const CasePage      = lazy(() => import('./pages/CasePage').then(module => ({ default: module.CasePage })))

function NotFoundPage() {
  return (
    <main className="pt-20 min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="text-center px-4">
        <h1 className="text-4xl font-black text-[#0F2747]">Page Not Found</h1>
        <p className="mt-4 text-slate-500">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F2747] px-6 py-3 font-bold text-white transition hover:bg-[#1E5FA8]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:specialtyId" element={<SpecialtyPage />} />
          <Route path="portfolio/:specialtyId/:caseId" element={<CasePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
