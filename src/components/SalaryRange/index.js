import './index.css'

const SalaryRange = props => {
  const {eachItem, setActiveSalaryRange} = props
  const setSalaryRange = () => {
    setActiveSalaryRange(eachItem.salaryRangeId)
  }
  return (
    <li className="list-item" onClick={setSalaryRange}>
      <input type="radio" id={eachItem.label} name="salary" />
      <label htmlFor={eachItem.label} className="label-element">
        {eachItem.label}
      </label>
    </li>
  )
}

export default SalaryRange
