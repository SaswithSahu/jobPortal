import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <div className="home-container">
      <Header />
      <h1 className="head-element">Find The Job That Fits Your Life</h1>
      <p className="para-element">
        Millions of people are searching for jobs, salary information, company
        reviews.Find the job that fits your ability and potential
      </p>
      <Link to="/jobs" className="link">
        <button type="button" className="find-job-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
