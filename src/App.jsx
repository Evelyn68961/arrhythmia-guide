import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FundamentalsLayout from './pages/FundamentalsLayout'
import CardiacElectro from './pages/CardiacElectro'
import ECGInterpret from './pages/ECGInterpret'
import ArrhyOverview from './pages/ArrhyOverview'
import TachyLayout from './pages/TachyLayout'
import SVT from './pages/SVT'
import AF from './pages/AF'
import VT from './pages/VT'
import VF from './pages/VF'
import BradyLayout from './pages/BradyLayout'
import SND from './pages/SND'
import AVBlock from './pages/AVBlock'
import NotFound from './pages/NotFound'

function App() {
  return (
    // LanguageProvider wraps BrowserRouter so every route, and the Navbar
    // itself, can call useLanguage() and share the same lang state.
    <LanguageProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Fundamentals — layout route + nested topic children.
                Same pattern as Tachy/Brady: <FundamentalsLayout /> provides
                the sidebar + <Outlet />, each child route fills the Outlet. */}
            <Route path="/fundamentals" element={<FundamentalsLayout />}>
              <Route index element={<Navigate to="electrophysiology" replace />} />
              <Route path="electrophysiology" element={<CardiacElectro />} />
              <Route path="ecg" element={<ECGInterpret />} />
              <Route path="overview" element={<ArrhyOverview />} />
            </Route>

            {/* Tachyarrhythmias — layout route + nested children.
                TachyLayout renders the sidebar + <Outlet />, and whichever
                child route matches the URL fills the Outlet.

                <Route index ...> handles the bare "/tachyarrhythmias" URL:
                it redirects to svt so the content area is never empty.
                `replace` means the redirect doesn't add an entry to browser
                history — clicking Back from /tachyarrhythmias/svt should
                take you to wherever you were *before* tachyarrhythmias,
                not back to the bare URL which would re-redirect forever. */}
            <Route path="/tachyarrhythmias" element={<TachyLayout />}>
              <Route index element={<Navigate to="svt" replace />} />
              <Route path="svt" element={<SVT />} />
              <Route path="af" element={<AF />} />
              <Route path="vt" element={<VT />} />
              <Route path="vf" element={<VF />} />
            </Route>

            {/* Bradyarrhythmias — layout route + nested condition children. */}
            <Route path="/bradyarrhythmias" element={<BradyLayout />}>
              <Route index element={<Navigate to="snd" replace />} />
              <Route path="snd" element={<SND />} />
              <Route path="avblock" element={<AVBlock />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
