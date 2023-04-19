import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddContact from '@/pages/AddContact'
import Home from '@/pages/Home'
import Navigation from './components/Navigation'

export default function MainRoutes() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
      </Routes>
    </Router>
  )
}
