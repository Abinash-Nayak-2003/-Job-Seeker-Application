import './styles/main.scss'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// User pages
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import JobIndex from './components/JobIndex'
import AllActivities from './components/ActivityIndex'
import AddJobDetails from './components/AddJob/AddJobDetails'
import JobDetails from './components/Job/JobDetails'
import EditJobDetails from './components/EditJob/EditJobDetails'
import AddJobCompany from './components/AddJob/AddJobCompany'
import JobCompany from './components/Job/JobCompany'
import EditJobCompany from './components/EditJob/EditJobCompany'
import AddJobActivities from './components/AddJob/AddJobActivities'
import JobActivities from './components/Job/JobActivities'
import EditJobActivities from './components/EditJob/EditJobActivities'
import AddJobNote from './components/AddJob/AddJobNote'
import JobNote from './components/Job/JobNote'
import EditJobNote from './components/EditJob/EditJobNote'
import AddJobContacts from './components/AddJob/AddJobContact'
import JobContacts from './components/Job/JobContacts'
import EditJobContact from './components/EditJob/EditJobContact'

// Admin pages
import AdminRoute from './components/admin/AdminRoute'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminQuestions from './components/admin/AdminQuestions'
import AdminFeedback from './components/admin/AdminFeedback'
import AdminLogin from './components/admin/AdminLogin'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes>
          {/* Public User Routes */}
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/jobs' element={<JobIndex />} />
          <Route path='/activities' element={<AllActivities />} />
          <Route path='/activities/today' element={<AllActivities />} />
          <Route path='/add-job' element={<AddJobDetails />} />
          <Route path='/jobs/:jobId' element={<JobDetails />} />
          <Route path='/edit-job/:jobId' element={<EditJobDetails />} />
          <Route path='/add-job/:jobId/company' element={<AddJobCompany />} />
          <Route path='/jobs/:jobId/company' element={<JobCompany />} />
          <Route path='/edit-company/:jobId/:companyId' element={<EditJobCompany />} />
          <Route path='/add-job/:jobId/activities' element={<AddJobActivities />} />
          <Route path='/jobs/:jobId/activities' element={<JobActivities />} />
          <Route path='/edit-activity/:jobId/:activityId' element={<EditJobActivities />} />
          <Route path='/add-job/:jobId/note' element={<AddJobNote />} />
          <Route path='/jobs/:jobId/notes' element={<JobNote />} />
          <Route path='/edit-note/:jobId/:noteId' element={<EditJobNote />} />
          <Route path='/add-job/:jobId/contacts' element={<AddJobContacts />} />
          <Route path='/jobs/:jobId/contacts' element={<JobContacts />} />
          <Route path='/edit-contact/:jobId/:contactId' element={<EditJobContact />} />

          {/* Admin login */}
          <Route path='/admin-login' element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/questions" element={<AdminRoute><AdminQuestions /></AdminRoute>} />
          <Route path="/admin/feedback" element={<AdminRoute><AdminFeedback /></AdminRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
