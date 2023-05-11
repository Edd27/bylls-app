import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useField } from 'formik'
import ExclamationCircleIcon from '@/icons/ExclamationCircleIcon'

const Input = ({ type = '', label = '', className = '', ...props }) => {
  const [field, meta] = useField(props)
  const error = meta?.touched && meta?.error

  return (
    <div className={classNames(className, 'flex flex-col space-y-1 h-fit')}>
      {label && (
        <label htmlFor={props.id} className="text-gray-600">
          {label}
        </label>
      )}
      <div className="flex-1">
        {type === 'textarea' && (
          <textarea
            {...field}
            {...props}
            className={classNames(
              'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-orange-400 text-orange-800 focus:border-orange-400 focus:ring-orange-400'
                : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
            )}
          />
        )}
        {type !== 'textarea' && (
          <div className="relative">
            <input
              {...field}
              {...props}
              type={type}
              className={classNames(
                'w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed',
                error
                  ? 'border-orange-400 text-orange-800 focus:border-orange-400 focus:ring-orange-400'
                  : 'border-gray-300 focus:border-gray-400 focus:ring-gray-400'
              )}
            />
            {error && type !== 'number' && (
              <span className="pr-2 absolute right-0 top-1/2 -translate-y-1/2">
                <ExclamationCircleIcon className="w-6 h-6 text-orange-500" />
              </span>
            )}
          </div>
        )}
      </div>
      {error && (
        <p
          name="email"
          className="text-orange-600 text-sm first-letter:uppercase"
        >
          {error}
        </p>
      )}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired
}

export default Input
