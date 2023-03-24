const ProgressBar = ({ idQuestions }) => {
  const getWidth = (totalQuestions, questionId) => {
    return (100 / totalQuestions) * questionId
  }
  const questionNumber = idQuestions + 1
  const progressPercent = getWidth(10, questionNumber)

  return (
    <>
      <div className="flex flex-row justify-around my-5">
        <div>Question {questionNumber}/10</div>
        <div>Progression : {progressPercent} %</div>
      </div>
      <div className="border border-solid h-8 my-0 mx-5 rounded flex flex-col justify-center py-0 px-1.5">
        <div
          className="h-5 text-center rounded bg-red-700"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  )
}

export default ProgressBar
