import PropTypes from 'prop-types'

const CalendarDollarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`icon icon-tabler icon-tabler-calendar-dollar ${className}`}
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M13 21h-7a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3"></path>
    <path d="M16 3v4"></path>
    <path d="M8 3v4"></path>
    <path d="M4 11h12.5"></path>
    <path d="M21 15h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
    <path d="M19 21v1m0 -8v1"></path>
  </svg>
)

CalendarDollarIcon.propTypes = {
  className: PropTypes.string
}

export default CalendarDollarIcon
