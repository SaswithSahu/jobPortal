import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillEnvelopeFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onclickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <div className="header-container-large">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="text-container">
          <Link to="/" className="element">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="element">
            <li>Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onclickLogout}>
          Logout
        </button>
      </div>

      <div className="header-container-small">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <ul>
          <li>
            <AiFillHome className="icons" />
          </li>
          <li>
            <BsFillEnvelopeFill className="icons" />
          </li>
          <li>
            <FiLogOut className="icons" onClick={onclickLogout} />
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
