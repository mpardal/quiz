import { QuestionsQuiz } from './QuestionsQuiz.js'
import { useEffect, useState } from 'react'

/**
 *
 * @param {string} question
 * @param {string} displayOptions
 * @return {JSX.Element}
 * @constructor
 */
const Quiz = ({ question, displayOptions }) => {
  return (
    <div className="flex flex-col gap-2 items-start text-xl mt-6 ml-8">
      <h2 className="text-2xl xl:w-1/3 text-left">{question}</h2>
      {displayOptions}
    </div>
  )
}

export default Quiz
