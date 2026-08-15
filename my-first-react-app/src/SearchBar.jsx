function SearchBar({username, setUsername, onSearch}) {
    return(
        <div>
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Enter user name"
            />
            <button onClick={onSearch}>search</button>
        </div>
    )
}
export default SearchBar; 