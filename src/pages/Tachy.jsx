import { NavLink, Outlet } from 'react-router-dom'

export default function Tachy() {
  return (
    <div>
      <h1>Tachyarrhythmias</h1>
      <nav className="sub-nav">
        <NavLink to="svt">SVT</NavLink>
        <NavLink to="af">Atrial Fibrillation</NavLink>
        <NavLink to="vt">Ventricular Tachycardia</NavLink>
        <NavLink to="vf">Ventricular Fibrillation</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}