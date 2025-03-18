import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import MainPage from './Pages/MainPage'
import NotificationsPage from './Pages/NotificationsPage'
import MessagesPage from './Pages/MessagesPage'
import CollectionsPage from './Pages/CollectionsPage'
import SubscriptionsPage from './Pages/SubscriptionsPage'
import AddCardPage from './Pages/AddCardPage'
import ProfilePage from './Pages/ProfilePage'
import UserProfilePage from './Pages/UserProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/add-card" element={<AddCardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/user/:username" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
