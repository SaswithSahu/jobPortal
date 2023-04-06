import './index.css'

const Skills = props => {
  const {eachItem} = props
  return (
    <li className="each-skill">
      <img
        src={eachItem.image_url}
        alt={eachItem.name}
        className="skill-logo"
      />
      <h1 className="skill">{eachItem.name}</h1>
    </li>
  )
}

export default Skills
