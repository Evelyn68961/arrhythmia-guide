import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Fundamentals from './pages/Fundamentals'
import Tachy from './pages/Tachy'
import Brady from './pages/Brady'
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
          <Route path="/tachyarrhythmias" element={<Tachy />} />
          
          {/* Bradyarrhythmias - nested routes */}
          <Route path="/bradyarrhythmias" element={<Brady />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App
