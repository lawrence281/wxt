import { lazy, Suspense, useEffect } from 'react'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'
import ChatButton from './components/sections/ChatButton'
import HomePage from './pages/HomePage'
import { navigate, useRouteScroll, usePathname } from './lib/router'
import { ROUTES } from './lib/routes'

// Legal pages are large text documents: load them on demand so the home page stays light.
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'))

const KNOWN_PATHS: string[] = Object.values(ROUTES)

function App() {
  const pathname = usePathname()
  const isKnownPath = KNOWN_PATHS.includes(pathname)
  useRouteScroll(pathname)

  useEffect(() => {
    if (!isKnownPath) navigate(ROUTES.home, { replace: true })
  }, [isKnownPath])

  let page = <HomePage />
  if (pathname === ROUTES.privacyPolicy) page = <PrivacyPolicyPage />
  else if (pathname === ROUTES.termsAndConditions) page = <TermsAndConditionsPage />

  return (
    <div className="bg-ground text-fg">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Suspense fallback={<main className="min-h-screen" id="main" />}>{page}</Suspense>
      <Footer />
      <ChatButton />
    </div>
  )
}

export default App
