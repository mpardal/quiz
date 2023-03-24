import { QuestionsQuiz } from './QuestionsQuiz.js'
import { useEffect, useState } from 'react'

const Quiz = ({ question, options }) => {
  return (
    <>
      <h2>{question}</h2>
      <p>{options[0]}</p>
      <p>{options[1]}</p>
      <p>{options[2]}</p>
      <p>{options[3]}</p>
    </>
  )
}

export default Quiz
