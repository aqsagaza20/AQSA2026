import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { askAI } from '../../services/api'
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa'
import './AIAssistant.css'

const AIAssistant = () => {
  const { t, i18n } = useTranslation()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await askAI({
        question: input,
        language: i18n.language
      })

      const aiMessage = {
        id: Date.now() + 1,
        text: response.answer,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Error:', error)
      
      const errorMessage = {
        id: Date.now() + 1,
        text: i18n.language === 'ar' 
          ? 'عذراً، حدث خطأ في الاتصال بالمساعد. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was an error connecting to the assistant. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const suggestedQuestions = [
    { ar: 'اشرح فقر الدم', en: 'Explain anemia' },
    { ar: 'ما هي أعراض ارتفاع ضغط الدم', en: 'What are the symptoms of hypertension' },
    { ar: 'اشرح الجهاز الدوري', en: 'Explain the circulatory system' },
    { ar: 'ما هي وظائف الكبد', en: 'What are the functions of the liver' }
  ]

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <FaRobot className="ai-icon" />
        <h1>{t('aiAssistant')}</h1>
        <p>{t('aiAssistantDescription')}</p>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h3>{t('welcomeToAIAssistant')}</h3>
              <p>{t('askMedicalQuestions')}</p>
              
              <div className="suggested-questions">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    className="suggested-question"
                    onClick={() => setInput(q[i18n.language])}
                  >
                    {q[i18n.language]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="message-avatar">
                  {message.sender === 'ai' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))
          )}
          {loading && (
            <div className="message ai">
              <div className="message-avatar">
                <FaRobot />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('typeYourQuestion')}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  )
}

export default AIAssistant
