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

const maxQuestions = 10
const levelNames = ['debutant', 'confirme', 'expert']

const Welcome = () => {
  const {
    userData: { pseudo },
    setInfoUser,
  } = useAuth()

  const [quizLevel, setQuizLevel] = useState(0)
  const [storedQuestions, setStoredQuestions] = useState([])
  const [storedAnswer, setStoredAnswer] = useState([])
  const [idQuestion, setIdQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isQuizEnded, setIsQuizEnded] = useState(false)
  const [storedUserAnswer, setStoredUserAnswer] = useState([])

  const level = levelNames[quizLevel]
  const question = storedQuestions[idQuestion]?.question
  const options = storedQuestions[idQuestion]?.options
  const goodAnswer = storedAnswer[idQuestion]

  const displayedOptions = options?.map((option, index) => {
    return (
      <button
        type="button"
        key={index}
        onClick={() => handleClickUserAnswer(option)}
        className={`hover:bg-gray-300 p-2 rounded w-1/3 text-left ${
          userAnswer === option ? 'bg-gray-300' : null
        }`}
      >
        {option}
      </button>
    )
  })

  const handleClickUserAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer)
    setIsButtonDisabled(false)
  }

  const nextQuestions = () => {
    if (idQuestion === maxQuestions - 1) {
      setIsQuizEnded(true)
      setStoredUserAnswer([...storedUserAnswer, userAnswer])
    } else {
      setIdQuestion((idQuestions) => idQuestions + 1)
      setStoredUserAnswer([...storedUserAnswer, userAnswer])
    }

    if (userAnswer === goodAnswer) {
      setScore((score) => score + 1)
      toast.success('Bravo +1 point')
    } else {
      toast.error('Désolé, vous vous êtes trompés')
    }
  }

  const onClickLevelUp = () => {
    setQuizLevel((quizLevel) => quizLevel + 1)
    setIdQuestion(0)
    setIsQuizEnded(false)
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

  return (
    <main className="text-center">
      <div className="flex flex-row justify-between mt-2 mx-5">
        <p>
          Pseudo : <span className="font-bold">{pseudo}</span>
        </p>
        <p className="text-2xl bg-gray-200 p-3 rounded">
          Score : <span className="font-bold">{score}</span>
        </p>
      </div>
      {isQuizEnded ? (
        <>
          <QuizOver score={score} userAnswers={storedUserAnswer} goodAnswers={storedAnswer} />
          <button type="button" onClick={onClickLevelUp} className="p-2 bg-green-500 rounded my-5">
            Niveau suivant
          </button>
        </>
      ) : (
        <>
          <Levels level={level} />
          <ProgressBar idQuestions={idQuestion} maxQuestions={maxQuestions} />
          <Quiz question={question} displayOptions={displayedOptions} />
          <button
            type="button"
            onClick={nextQuestions}
            disabled={isButtonDisabled}
            className="p-2 bg-green-500 rounded my-5"
          >
            Valider
          </button>
        </>
      )}
    </main>
  )
}
export default Welcome
