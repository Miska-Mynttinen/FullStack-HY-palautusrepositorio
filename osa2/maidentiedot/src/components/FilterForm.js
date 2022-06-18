const FilterForm = ({showSelected, handleFilterChange}) => {
    return (
      <form>
        find countries <input
          value={showSelected}
          onChange={handleFilterChange}
          />
      </form>
    )
  }

export default FilterForm