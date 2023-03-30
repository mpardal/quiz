import { AiOutlineCheck } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'

/**
 * @param {number} score
 * @param {(string | number)[]} userAnswers
 * @param {(string | number)[]} goodAnswers
 * @return {JSX.Element}
 */
const QuizOver = ({ score, userAnswers, goodAnswers }) => {
  const colorScore = score <= 5 ? 'text-red-500' : 'text-green-500'

  const final = userAnswers.map((userAnswer, index) => {
    const goodAnswer = goodAnswers[index]
    const key = `${userAnswer}-${goodAnswer}`
    const equal = userAnswer === goodAnswer

    return (
      <tr key={key}>
        <td className={`flex justify-center ${equal ? 'text-green-500' : 'text-red-500'}`}>
          {equal ? <AiOutlineCheck /> : <BiError />}
        </td>
        <td>{userAnswer}</td>
        <td>{goodAnswer}</td>
        <td className="flex justify-center">{equal ? <></> : <HiOutlineMagnifyingGlass />}</td>
      </tr>
    )
  })

  return (
    <>
      <div className="flex flex-col gap-4 items-center my-8">
        <h2 className="text-xl">Votre score est de : </h2>
        <p className={`text-4xl font-bold ${colorScore}`}>{score}</p>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <table className="w-4/6">
          <thead className="pb-3 border text-xl">
            <tr className="text-center">
              <th className="w-1/6">Résultat</th>
              <th className="w-2/6">Vos réponses</th>
              <th className="w-2/6">Les bonnes réponses</th>
              <th className="w-1/6">Les explications</th>
            </tr>
          </thead>
          <tbody className="border text-xl">{final}</tbody>
        </table>
      </div>
    </>
  )
}

export default QuizOver
