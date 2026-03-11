import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { getFeaturedCourses } from '../../services/courses'
import { getRecentBooks } from '../../services/books'
import CourseCard from '../../components/cards/CourseCard'
import BookCard from '../../components/cards/BookCard'
import './Home.css'

const Home = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [recentBooks, setRecentBooks] = useState([])
  const [stats, setStats] = useState({
    coursesCount: 0,
    booksCount: 0,
    questionsCount: 0,
    usersCount: 0
  })

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    const courses = await getFeaturedCourses()
    const books = await getRecentBooks()
    setFeaturedCourses(courses)
    setRecentBooks(books)
    // Load stats from Firebase
  }

  const quickActions = [
    { icon: '📚', title: t('courses'), path: '/courses', color: '#2196f3' },
    { icon: '📖', title: t('books'), path: '/books', color: '#4caf50' },
    { icon: '❓', title: t('questions'), path: '/questions', color: '#ff9800' },
    { icon: '📝', title: t('dictionary'), path: '/dictionary', color: '#9c27b0' },
    { icon: '🤖', title: t('aiAssistant'), path: '/ai-assistant', color: '#f44336' },
    { icon: '📊', title: t('statistics'), path: '/statistics', color: '#00bcd4' }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>مرحباً بك في المنصة الطبية التعليمية</h1>
          <p>منصتك المتكاملة لدراسة التخصصات الطبية</p>
          {!user && (
            <Link to="/auth" className="cta-btn">
              ابدأ التعلم الآن
            </Link>
          )}
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>{t('quickAccess')}</h2>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={action.path} className="action-card">
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="section-header">
          <h2>{t('featuredCourses')}</h2>
          <Link to="/courses" className="view-all">{t('viewAll')} →</Link>
        </div>
        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Recent Books */}
      <section className="recent-books">
        <div className="section-header">
          <h2>{t('recentBooks')}</h2>
          <Link to="/books" className="view-all">{t('viewAll')} →</Link>
        </div>
        <div className="books-grid">
          {recentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{stats.coursesCount}+</span>
            <span className="stat-label">{t('courses')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.booksCount}+</span>
            <span className="stat-label">{t('books')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.questionsCount}+</span>
            <span className="stat-label">{t('questions')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.usersCount}+</span>
            <span className="stat-label">{t('students')}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
