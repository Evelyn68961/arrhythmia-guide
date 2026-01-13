import { NavLink, Outlet } from 'react-router-dom'

export default function Brady() {
  return (
    <div>
      <div className="brady-header">
        <h1>Bradyarrhythmias</h1>
        <nav className="brady-nav">
          <NavLink to="snd">Sinus Node Dysfunction</NavLink>
          <NavLink to="av-block">AV Block</NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}