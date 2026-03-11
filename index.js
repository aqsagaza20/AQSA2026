const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// OpenAI Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

app.post('/api/ai/ask', async (req, res) => {
  try {
    const { question, language } = req.body
    
    const systemPrompt = language === 'ar' 
      ? 'أنت مساعد طبي متخصص. أجب على الأسئلة الطبية بدقة ووضوح باللغة العربية.'
      : 'You are a specialized medical assistant. Answer medical questions accurately and clearly in English.'

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    res.json({
      answer: response.data.choices[0].message.content
    })
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ error: 'Failed to get AI response' })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
