import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navigation from './components/Navigation'

import Home from '@/pages/Home'
import NewContact from '@/pages/NewContact'
import EditContact from '@/pages/EditContact'
import ImportContacts from '@/pages/ImportContacts'

export default function MainRoutes() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts/new-contact" element={<NewContact />} />
        <Route path="/contacts/:id/edit-contact" element={<EditContact />} />
        <Route path="/contacts/import-contacts" element={<ImportContacts />} />
      </Routes>
    </Router>
  )
}
