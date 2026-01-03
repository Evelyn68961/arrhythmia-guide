import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Fundamentals from './pages/Fundamentals'
import Tachy from './pages/Tachy'
import SVT from './pages/SVT'
import AF from './pages/AF'
import VT from './pages/VT'
import VF from './pages/VF'
import Brady from './pages/Brady'
import SND from './pages/SND'
import AVBlock from './pages/AVBlock'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundamentals" element={<Fundamentals />} />
          
          {/* Tachyarrhythmias - nested routes */}
          <Route path="/tachyarrhythmias" element={<Tachy />}>
            <Route path="svt" element={<SVT />} />
            <Route path="af" element={<AF />} />
            <Route path="vt" element={<VT />} />
            <Route path="vf" element={<VF />} />
          </Route>
          
          {/* Bradyarrhythmias - nested routes */}
          <Route path="/bradyarrhythmias" element={<Brady />}>
            <Route path="snd" element={<SND />} />
            <Route path="av-block" element={<AVBlock />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App
