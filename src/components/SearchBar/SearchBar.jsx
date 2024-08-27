function SearchBar({value, onChange}) {
  return (
    <div id="search-bar">
      <label htmlFor="search">Search:</label>
      <input id="search" placeholder="Search something here!" value={value} onChange={onChange} />
    </div>
  )
}

export default SearchBar