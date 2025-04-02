function SearchBar({value, changeHandler, searchHandler}) {
  return (
    <form id="search-bar" onSubmit={searchHandler}>
      <label htmlFor="search">Search:</label>
      <input id="search" placeholder="Search something here!" value={value} onChange={changeHandler} />
      <button type="submit"></button>
    </form>
  )
}

export default SearchBar