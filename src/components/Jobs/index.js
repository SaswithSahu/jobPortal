import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import EachJobCard from '../EachJobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const {searchInput, employmentType, salaryRange} = this.state
    console.log(searchInput)
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.setState({
        jobsList: data.jobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  setSearchInput = () => {
    this.getAllJobs()
  }

  setEmploymentType = (type, status) => {
    const {employmentType} = this.state
    if (status) {
      const newArr = employmentType.filter(eachItem => eachItem !== type)
      this.setState({employmentType: [...newArr]}, this.getAllJobs)
    } else {
      this.setState(
        {employmentType: [...employmentType, type]},
        this.getAllJobs,
      )
    }
  }

  setActiveSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getAllJobs)
  }

  onclickRetry = () => {
    this.getAllJobs()
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#f1f5f9" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-head"> Oops! Something Went Wrong</h1>
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

  renderAllJobs = () => {
    const {jobsList} = this.state
    const noOfJobs = jobsList.length
    return noOfJobs ? (
      <ul>
        {jobsList.map(eachItem => (
          <EachJobCard eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-head">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobs()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {employmentType} = this.state
    return (
      <div className="job-container">
        <Header />
        <div className="body-container">
          <div className="container1">
            <ProfileDetails />
            <hr className="line" />
            <h1 className="header2">Type of Employment</h1>
            <ul className="list-container">
              {employmentTypesList.map(eachItem => (
                <EmploymentType
                  eachItem={eachItem}
                  key={eachItem.employmentTypeId}
                  setEmploymentType={this.setEmploymentType}
                  status={employmentType.includes(eachItem.employmentTypeId)}
                />
              ))}
            </ul>
            <hr className="line" />
            <h1 className="header2">Salary Range</h1>
            <ul className="list-container">
              {salaryRangesList.map(eachItem => (
                <SalaryRange
                  eachItem={eachItem}
                  key={eachItem.salaryRangeId}
                  setActiveSalaryRange={this.setActiveSalaryRange}
                />
              ))}
            </ul>
          </div>
          <div className="container2">
            <div className="search-container">
              <input
                type="search"
                id="inputElement"
                className="input-search-element"
                placeholder="Search"
                onChange={this.getSearchInput}
              />
              <button
                type="button"
                onClick={this.setSearchInput}
                data-testid="searchButton"
                className="button-search"
              >
                <BsSearch className="icon" />
              </button>
            </div>
            {this.renderAllProducts()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
