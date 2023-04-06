import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const EachJobCard = props => {
  const {eachItem} = props
  const {id} = eachItem
  return (
    <li className="each-job-item">
      <Link to={`/jobs/${id}`} className="link">
        <div id="upper-container">
          <img
            src={eachItem.company_logo_url}
            alt="company logo"
            id="company-logo"
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
        <div className="middle-container">
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
          <div className="cont">
            <p className="salary">{eachItem.package_per_annum}</p>
          </div>
        </div>
        <hr className="line-main" />
        <h1 className="description">Description</h1>
        <p className="job-description-para">{eachItem.job_description}</p>
      </Link>
    </li>
  )
}

export default EachJobCard
