import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const { isDarkMode, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="MedEdu" />
            <span>MedEdu</span>
          </Link>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        <div className="navbar-actions">
          <button onClick={toggleLanguage} className="lang-btn">
            {i18n.language === 'ar' ? 'EN' : 'عربي'}
          </button>
          
          <button onClick={toggleTheme} className="theme-btn">
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="user-menu">
              <img src={user.photoURL || '/default-avatar.png'} alt="User" />
              <div className="dropdown">
                <Link to="/profile">{t('profile')}</Link>
                <Link to="/favorites">{t('favorites')}</Link>
                <Link to="/notes">{t('notes')}</Link>
                <button onClick={logout}>{t('logout')}</button>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="login-btn">{t('login')}</Link>
          )}

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link to="/courses" onClick={() => setIsMenuOpen(false)}>{t('courses')}</Link>
          <Link to="/books" onClick={() => setIsMenuOpen(false)}>{t('books')}</Link>
          <Link to="/questions" onClick={() => setIsMenuOpen(false)}>{t('questions')}</Link>
          <Link to="/dictionary" onClick={() => setIsMenuOpen(false)}>{t('dictionary')}</Link>
          <Link to="/ai-assistant" onClick={() => setIsMenuOpen(false)}>{t('aiAssistant')}</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
