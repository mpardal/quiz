const Levels = ({ level }) => {
  let levelName
  switch (level) {
    case 'debutant':
      levelName = 'Débutant'
      break
    case 'confirme':
      levelName = 'Confirmé'
      break
    case 'expert':
      levelName = 'Expert'
      break
    default:
      console.log('erreur')
  }

  return (
    <div>
      <h2 className="ml-5">
        Niveau : <span className="font-bold">{levelName}</span>
      </h2>
    </div>
  )
}

export default Levels
