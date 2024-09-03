function SearchBar({value, changeHandler, searchHandler}) {
  return (
    <div id="search-bar">
      <label htmlFor="search">Search:</label>
      <input id="search" placeholder="Search something here!" value={value} onChange={changeHandler} />
      <button onClick={searchHandler}></button>
    </div>
  )
}

export default SearchBar