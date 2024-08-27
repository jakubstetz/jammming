function SearchResults({search}) {
  return (
    <div className="tracks-container">
      <div className="tracks-container-header">
        <p>Current search: <span>{search}</span></p>
      </div>
    </div>
  );
}

export default SearchResults;