import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { getQuestions, submitExam } from '../../services/questions'
import QuestionCard from '../../components/cards/QuestionCard'
import ExamResults from '../../components/exam/ExamResults'
import './QuestionBank.css'

const QuestionBank = () => {
  const { t } = useTranslation()
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [questionCount, setQuestionCount] = useState(10)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [examStarted, setExamStarted] = useState(false)
  const [loading, setLoading] = useState(false)

  const countOptions = [10, 20, 30, 50, 100]

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    // Load courses from Firebase
    setCourses([
      { id: 'anatomy', name: { ar: 'التشريح', en: 'Anatomy' } },
      { id: 'physiology', name: { ar: 'وظائف الأعضاء', en: 'Physiology' } },
      { id: 'biochemistry', name: { ar: 'الكيمياء الحيوية', en: 'Biochemistry' } },
      { id: 'pharmacology', name: { ar: 'علم الأدوية', en: 'Pharmacology' } }
    ])
  }

  const startExam = async () => {
    if (!selectedCourse) {
      alert(t('selectCourse'))
      return
    }

    setLoading(true)
    try {
      const fetchedQuestions = await getQuestions(selectedCourse, questionCount)
      setQuestions(fetchedQuestions)
      setExamStarted(true)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setShowResults(false)
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      finishExam()
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const finishExam = async () => {
    const results = calculateResults()
    setShowResults(true)
    
    // Save exam results
    await submitExam({
      courseId: selectedCourse,
      questionsCount: questions.length,
      answers,
      results
    })
  }

  const calculateResults = () => {
    let correct = 0
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })
    
    return {
      total: questions.length,
      correct,
      wrong: questions.length - correct,
      percentage: (correct / questions.length) * 100
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t('loading')}</p>
      </div>
    )
  }

  return (
    <div className="question-bank">
      {!examStarted ? (
        <motion.div 
          className="exam-setup"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>{t('questionBank')}</h1>
          
          <div className="setup-form">
            <div className="form-group">
              <label>{t('selectCourse')}</label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">{t('chooseCourse')}</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name.ar}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>{t('selectQuestionsCount')}</label>
              <div className="count-options">
                {countOptions.map(count => (
                  <button
                    key={count}
                    className={`count-btn ${questionCount === count ? 'active' : ''}`}
                    onClick={() => setQuestionCount(count)}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="start-exam-btn"
              onClick={startExam}
              disabled={!selectedCourse}
            >
              {t('startExam')}
            </button>
          </div>
        </motion.div>
      ) : showResults ? (
        <ExamResults 
          results={calculateResults()}
          questions={questions}
          answers={answers}
          onRetry={() => setExamStarted(false)}
        />
      ) : (
        <motion.div 
          className="exam-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="exam-header">
            <div className="progress">
              <div 
                className="progress-bar"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="question-counter">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              selectedAnswer={answers[questions[currentQuestionIndex]?.id]}
              onAnswer={(answer) => handleAnswer(questions[currentQuestionIndex].id, answer)}
            />
          </AnimatePresence>

          <div className="exam-navigation">
            <button 
              className="nav-btn prev"
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              {t('previous')}
            </button>
            
            <button 
              className="nav-btn next"
              onClick={nextQuestion}
            >
              {currentQuestionIndex === questions.length - 1 ? t('finish') : t('next')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default QuestionBank
