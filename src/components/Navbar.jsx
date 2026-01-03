import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/fundamentals">Fundamentals</NavLink>
      <NavLink to="/tachyarrhythmias">Tachyarrhythmias</NavLink>
      <NavLink to="/bradyarrhythmias">Bradyarrhythmias</NavLink>
    </nav>
  )
}