import React from 'react'

const FilterForm = ({text, showSelected, handleFilterChange}) => {
    return (
      <div>
        {text} <input
        value={showSelected}
        onChange={handleFilterChange}
        />
      </div>
    )
  }

export default FilterForm