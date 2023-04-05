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
  let {
    userData: { pseudo },
    setInfoUser,
  } = useAuth()

  const [quizLevel, setQuizLevel] = useState(0)
  const [storedQuestions, setStoredQuestions] = useState([])
  const [storedAnswer, setStoredAnswer] = useState([])
  const [idQuestion, setIdQuestion] = useState(0)
  const [scoreUser, setScoreUser] = useState(0)
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
    } else {
      setIdQuestion((idQuestions) => idQuestions + 1)
    }

    if (userAnswer === goodAnswer) {
      setScoreUser((score) => score + 1)
      toast.success('Bravo +1 point')
    } else toast.error('Désolé, vous vous êtes trompés')

    setStoredUserAnswer([...storedUserAnswer, userAnswer])
    setIsButtonDisabled(true)
  }

  const onClickLevelUp = () => {
    setQuizLevel((quizLevel) => quizLevel + 1)
    setIdQuestion(0)
    setIsQuizEnded(false)
    setStoredUserAnswer([])
  }

  const onClickFinish = () => {
    setIdQuestion(0)
    setQuizLevel(0)
    setIsQuizEnded(false)
    setStoredUserAnswer([])
    setScoreUser(0)
  }

  useEffect(() => {
    setInfoUser()
    console.log(`${quizLevel} => ${levelNames.length - 1}`)
  }, [])

  useEffect(() => {
    const questionsLoaded = loadQuestions(level)
    setStoredQuestions(questionsLoaded)
    const answersLoaded = answerLoaded(level)
    setStoredAnswer(answersLoaded)
  }, [quizLevel])

  return (
    <main className="text-center h-full flex flex-col justify-center gap-10">
      <div className="flex flex-row justify-between mt-2 mx-5">
        <p className="ml-10 xl:ml-0">
          Pseudo : <span className="font-bold">{pseudo}</span>
        </p>
        <p className="text-2xl bg-gray-200 p-3 rounded">
          Score : <span className="font-bold">{scoreUser}</span>
        </p>
      </div>
      {isQuizEnded ? (
        <>
          <QuizOver score={scoreUser} userAnswers={storedUserAnswer} goodAnswers={storedAnswer} />
          <button
            type="button"
            onClick={quizLevel === levelNames.length - 1 ? onClickFinish : onClickLevelUp}
            className="p-2 bg-green-500 rounded my-5 w-1/4 xl:w-1/6 mx-auto"
          >
            {quizLevel === levelNames.length - 1 ? 'Redémarrer le quiz' : 'Niveau suivant'}
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
            className="p-2 bg-green-500 rounded my-5 w-1/4 xl:w-1/6 mx-auto"
          >
            Valider
          </button>
        </>
      )}
    </main>
  )
}
export default Welcome
