import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa'
import './Auth.css'

const Auth = () => {
  const { t } = useTranslation()
  const { signIn, signUp, signInWithGoogle } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const specialties = [
    { id: 'medicine', name: t('medicine') },
    { id: 'nursing', name: t('nursing') },
    { id: 'pharmacy', name: t('pharmacy') },
    { id: 'lab', name: t('lab') },
    { id: 'physiotherapy', name: t('physiotherapy') }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        if (password !== confirmPassword) {
          setError(t('passwordsDoNotMatch'))
          setLoading(false)
          return
        }
        await signUp(email, password, { specialty })
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="auth-header">
          <h1>{isLogin ? t('welcomeBack') : t('createAccount')}</h1>
          <p>{isLogin ? t('loginToContinue') : t('joinNow')}</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  required
                  disabled={loading}
                >
                  <option value="">{t('selectSpecialty')}</option>
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? t('loading') : (isLogin ? t('login') : t('register'))}
          </button>
        </form>

        <div className="auth-divider">
          <span>{t('or')}</span>
        </div>

        <button 
          className="google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <FaGoogle />
          {t('continueWithGoogle')}
        </button>

        <p className="auth-switch">
          {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t('register') : t('login')}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default Auth
