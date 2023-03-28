const QuizOver = ({ score, userAnswers, goodAnswers }) => {
  const answers = [{ goodAnswers, userAnswers }]
  console.log(answers)

  const displayUserAnswer = userAnswers.map((answer, index) => {
    return (
      <tr key={index}>
        <td className="text-xl mt-2 pl-8">{answer}</td>
      </tr>
    )
  })

  const displayGoodAnswer = goodAnswers.map((goodAnswer, index) => {
    return (
      <tr key={index}>
        <td className="text-xl ml-8 mt-2 pl-8">{goodAnswer}</td>
      </tr>
    )
  })

  return (
    <>
      <div className="flex flex-col gap-4 items-center mt-8">
        <h2 className="text-xl">Votre score est de : </h2>
        <p className="text-4xl font-bold">{score}</p>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <table className="w-1/5">
          <thead>
            <tr>
              <th className="text-2xl text-center underline">Vos réponse</th>
            </tr>
          </thead>
          <tbody>{displayUserAnswer}</tbody>
        </table>
        <table className="w-1/5">
          <thead>
            <tr>
              <th className="text-2xl text-center underline">Les bonnes réponses</th>
            </tr>
          </thead>
          <tbody>{displayGoodAnswer}</tbody>
        </table>
      </div>
    </>
  )
}

export default QuizOver
