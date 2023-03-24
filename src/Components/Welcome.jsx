import { useAuth } from '../Context/AuthContext.jsx'
import Quiz from './Quiz.jsx'
import ProgressBar from './ProgressBar.jsx'
import Levels from './Levels.jsx'
import { useEffect, useState } from 'react'
import { QuestionsQuiz } from './QuestionsQuiz.js'

const loadQuestions = (level) => {
  const fetchedQuestions = QuestionsQuiz[0].quizz[level]
  return fetchedQuestions.map(({ answer, ...keepRest }) => keepRest)
}

const Welcome = () => {
  const { userData, setInfoUser } = useAuth()
  const { pseudo } = userData

  const levelNames = ['debutant', 'confirmé', 'expert']
  const [quizLevel, setQuizLevel] = useState(0)
  const [storedQuestions, setStoredQuestions] = useState([]) // ← ça : []
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [idQuestions, setIdQuestions] = useState(0)

  const level = levelNames[quizLevel]

  useEffect(() => {
    setInfoUser()
  }, [])

  useEffect(() => {
    const questionsLoaded = loadQuestions(level)
    setStoredQuestions(questionsLoaded)
    setQuestion(questionsLoaded[idQuestions].question)
    setOptions(questionsLoaded[idQuestions].options)
  }, [])

  return (
    <form>
      {/*
            <p className="mt-2 mr-2 text-right">Pseudo : {pseudo}</p>
*/}
      <Levels level={level} />
      <ProgressBar idQuestions={idQuestions} />
      <Quiz question={question} options={options} />
      <button onClick={handleClick}>Valider</button>
    </form>
  )
}

export default Welcome
