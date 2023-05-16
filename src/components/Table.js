import PropTypes from 'prop-types'

const HeaderCell = ({ content }) => {
  return <th className="px-6 py-3">{content}</th>
}

HeaderCell.propTypes = {
  content: PropTypes.string
}

const RowItem = ({ cells }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      {cells.map((cell, index) => (
        <td key={index} className="px-6 py-4">
          {cell}
        </td>
      ))}
    </tr>
  )
}

RowItem.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.string)
}

const Table = ({ titles = [], rows = [] }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {titles.map((title) => (
              <HeaderCell key={title} content={title} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <RowItem key={row.id} cells={row.cells} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Table
