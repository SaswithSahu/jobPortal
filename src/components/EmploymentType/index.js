import './index.css'

const EmploymentType = props => {
  const {eachItem, setEmploymentType, status} = props

  const setEmployType = () => {
    setEmploymentType(eachItem.employmentTypeId, status)
  }

  return (
    <li className="list-item" onClick={setEmployType}>
      <input type="checkBox" id={eachItem.label} />
      <label htmlFor={eachItem.label} className="label-element">
        {eachItem.label}
      </label>
    </li>
  )
}

export default EmploymentType
