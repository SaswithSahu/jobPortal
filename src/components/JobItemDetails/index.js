import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import Skills from '../Skills'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    jobSkills: [],
    similarJobData: [],
    lifeAtCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        jobData: data.job_details,
        similarJobData: data.similar_jobs,
        jobSkills: data.job_details.skills,
        lifeAtCompany: data.job_details.life_at_company,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onclickRetry = () => {
    this.getJobData()
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderEachJob = () => {
    const {jobData, similarJobData, jobSkills, lifeAtCompany} = this.state
    return (
      <div className="job-details-container">
        <Header />
        <div className="job-item-details">
          <div className="upper-container">
            <img
              src={jobData.company_logo_url}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="job-title">{jobData.title}</h1>
              <div className="rating-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                  alt="star"
                  className="star"
                />
                <p className="job-rating">{jobData.rating}</p>
              </div>
            </div>
          </div>
          <div className="middle-container">
            <div className="job-location">
              <div className="cont">
                <MdLocationOn className="icons" />
                <p>{jobData.location}</p>
              </div>
              <div className="cont">
                <BsFillBriefcaseFill className="icons" />
                <p>{jobData.employment_type}</p>
              </div>
            </div>
            <div className="cont">
              <p className="salary">{jobData.package_per_annum}</p>
            </div>
          </div>
          <hr />
          <div className="final-container">
            <h1 className="description">Description</h1>
            <a href={jobData.company_website_url} className="link">
              <div className="visit-button-container">
                Visit
                <BiLinkExternal className="link-icon" />
              </div>
            </a>
          </div>
          <p className="description-para">{jobData.job_description}</p>
          <h1 className="description">Skills</h1>
          <ul className="skills-container">
            {jobSkills.map(eachItem => (
              <Skills eachItem={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="description">Life at Company</h1>
          <div className="lifeAtCompany-container">
            <p className="description-para">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="company-image"
              style={{marginTop: '-50px'}}
            />
          </div>
        </div>
        <h1 className="description-similar">Similar Jobs</h1>
        <ul className="last-container">
          {similarJobData.map(eachItem => (
            <SimilarJobs eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-head">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="logout-button"
        onClick={this.onclickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEachJob()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderAllProducts()}</div>
  }
}
export default JobItemDetails
