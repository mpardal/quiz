import { useAuth } from '../Context/AuthContext.jsx'
import toast from 'react-hot-toast'
import Quiz from './Quiz.jsx'
import ProgressBar from './ProgressBar.jsx'
import Levels from './Levels.jsx'
import { useEffect, useState } from 'react'
import { QuestionsQuiz } from './QuestionsQuiz.js'
import QuizOver from './QuizOver.jsx'

const loadQuestions = (level) => {
  const fetchedQuestions = QuestionsQuiz[0].quizz[level]
  return fetchedQuestions.map(({ answer, ...keepRest }) => keepRest)
}

const answerLoaded = (level) => {
  const fetchedQuestions = QuestionsQuiz[0].quizz[level]
  return fetchedQuestions.map(({ answer }) => answer)
}

const Welcome = () => {
  const { userData, setInfoUser } = useAuth()
  const { pseudo } = userData

  const levelNames = ['debutant', 'confirme', 'expert']
  const [quizLevel, setQuizLevel] = useState(0)
  const [storedQuestions, setStoredQuestions] = useState([])
  const [storedAnswer, setStoredAnswer] = useState([])
  const [idQuestions, setIdQuestions] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [disabledButton, setDisabledButton] = useState(true)
  const [quizEnd, setQuizEnd] = useState(false)
  const [storedUserAnswer, setStoredUserAnswer] = useState([])
  const maxQuestions = 10

  const level = levelNames[quizLevel]
  const question = storedQuestions[idQuestions]?.question
  const options = storedQuestions[idQuestions]?.options
  const goodAnswer = storedAnswer[idQuestions]

  const displayOptions = options?.map((option, index) => {
    return (
      <button
        type="button"
        key={index}
        onClick={() => handleClickAnswers(option)}
        className={`hover:bg-gray-300 p-2 rounded w-1/3 text-left ${
          userAnswer === option ? 'bg-gray-300' : null
        }`}
      >
        {option}
      </button>
    )
  })

  const handleClickAnswers = (selectedAnswer) => {
    setUserAnswer(selectedAnswer)
    setDisabledButton(false)
  }

  const nextQuestions = () => {
    if (idQuestions === maxQuestions - 1) {
      setQuizEnd(true)
      setStoredUserAnswer([...storedUserAnswer, userAnswer])
    } else {
      setIdQuestions((idQuestions) => idQuestions + 1)
      setStoredUserAnswer([...storedUserAnswer, userAnswer])
    }

    if (userAnswer === goodAnswer) {
      setScore((score) => score + 1)
      toast.success('Bravo +1 point')
    } else {
      toast.error('Désolé, vous vous êtes trompés')
    }
  }

  const addLevel = () => {
    setQuizLevel((quizLevel) => quizLevel + 1)
    setIdQuestions(0)
    setQuizEnd(false)
    setUserAnswer(null)
  }

  useEffect(() => {
    setInfoUser()
  }, [])

  useEffect(() => {
    const questionsLoaded = loadQuestions(level)
    setStoredQuestions(questionsLoaded)

    const answersLoaded = answerLoaded(level)
    setStoredAnswer(answersLoaded)
  }, [quizLevel])

  return quizEnd ? (
    <main>
      <QuizOver score={score} userAnswers={storedUserAnswer} goodAnswers={storedAnswer} />
      <button type="button" onClick={addLevel} className="p-2 bg-green-500 rounded my-5">
        Niveau suivant
      </button>
    </main>
  ) : (
    <main className="text-center">
      <div className="flex flex-row justify-between mt-2 mx-5">
        <p>
          Pseudo : <span className="font-bold">{pseudo}</span>
        </p>
        <p className="text-2xl bg-gray-200 p-3 rounded">
          Score : <span className="font-bold">{score}</span>
        </p>
      </div>
      <Levels level={level} />
      <ProgressBar idQuestions={idQuestions} maxQuestions={maxQuestions} />
      <Quiz question={question} displayOptions={displayOptions} />
      <button
        type="button"
        onClick={nextQuestions}
        disabled={disabledButton}
        className="p-2 bg-green-500 rounded my-5"
      >
        Valider
      </button>
    </main>
  )
}

export default Welcome
