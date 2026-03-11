import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  FaHome, 
  FaBook, 
  FaQuestionCircle, 
  FaUser, 
  FaBookmark 
} from 'react-icons/fa'
import './BottomNav.css'

const BottomNav = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: FaHome, label: t('home') },
    { path: '/courses', icon: FaBook, label: t('courses') },
    { path: '/questions', icon: FaQuestionCircle, label: t('questions') },
    { path: '/favorites', icon: FaBookmark, label: t('favorites') },
    { path: '/profile', icon: FaUser, label: t('profile') }
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <item.icon />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav
