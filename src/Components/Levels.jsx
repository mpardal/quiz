const levelNames = {
  debutant: 'Débutant',
  confirme: 'Confirmé',
  expert: 'Expert',
}

/**
 *
 * @param {string} level
 * @return {JSX.Element}
 * @constructor
 */
const Levels = ({ level }) => {
  const levelName = levelNames[level]

  return (
    <div className="ml-10 text-left xl:text-center xl:ml-0">
      <h2 className="ml-5">
        Niveau : <span className="font-bold">{levelName}</span>
      </h2>
    </div>
  )
}

export default Levels
