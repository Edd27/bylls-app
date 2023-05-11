import PropTypes from 'prop-types'

const LogoIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`icon icon-tabler icon-tabler-brand-bilibili ${className}`}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M3 10a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-6z"></path>
    <path d="M8 3l2 3"></path>
    <path d="M16 3l-2 3"></path>
    <path d="M9 13v-2"></path>
    <path d="M15 11v2"></path>
  </svg>
)

LogoIcon.propTypes = {
  className: PropTypes.string
}

export default LogoIcon
