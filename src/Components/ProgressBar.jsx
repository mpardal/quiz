/**
 * @param {number} idQuestions
 * @param {number} maxQuestions
 * @return {JSX.Element}
 * @constructor
 */
const ProgressBar = ({ idQuestions, maxQuestions }) => {
  const getWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId
  }
  const questionNumber = idQuestions + 1
  const progressPercent = getWidth(maxQuestions, questionNumber)

  return (
    <>
      <div className="flex flex-row justify-around my-5">
        <div className="flex flex-col gap-2 text-center">
          Question :
          <span className="text-xl">
            <span className="font-bold">{questionNumber}</span>/10
          </span>
        </div>
        <div className="flex flex-col gap-2 text-center">
          Progression :
          <span className="text-xl">
            <span className="font-bold">{progressPercent}</span> %
          </span>
        </div>
      </div>
      <div className="border border-solid h-8 m-5 rounded flex flex-col justify-center py-0 px-1.5">
        <div
          className="h-5 text-center rounded bg-red-700"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  )
}

export default ProgressBar
