import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {eachItem} = props
  return (
    <li className="similar-job-container">
      <div className="upper-container">
        <img
          src={eachItem.company_logo_url}
          alt="similar job company logo"
          className="company-logo"
        />
        <div>
          <h1 className="job-title">{eachItem.title}</h1>
          <div className="rating-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="star"
              className="star"
            />
            <p className="job-rating">{eachItem.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p className="description-para">{eachItem.job_description}</p>
      <div className="job-location">
        <div className="cont">
          <MdLocationOn className="icons" />
          <p>{eachItem.location}</p>
        </div>
        <div className="cont">
          <BsFillBriefcaseFill className="icons" />
          <p>{eachItem.employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
