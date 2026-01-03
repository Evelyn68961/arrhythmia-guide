import { NavLink, Outlet } from 'react-router-dom'

export default function Brady() {
  return (
    <div>
      <h1>Bradyarrhythmias</h1>
      <nav className="sub-nav">
        <NavLink to="snd">Sinus Node Dysfunction</NavLink>
        <NavLink to="av-block">AV Block</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}