import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        profileDetails: {...data.profile_details},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-container">
        <img src={profileDetails.profile_image_url} alt="profile" />
        <h1 className="profile-head">{profileDetails.name}</h1>
        <p className="profile-para">{profileDetails.short_bio}</p>
      </div>
    )
  }

  onclickRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-view">
      <button
        type="button"
        className="logout-button"
        onClick={this.onclickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderAllProducts()}</div>
  }
}

export default ProfileDetails
