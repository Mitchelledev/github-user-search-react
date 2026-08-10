function SearchBar({username, setUsername, onSearch }) {
    return(
        <div>
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder="Enter Github username"
            />
            <button onClick={onSearch}>Search</button>
        </div>
    )
}
export default SearchBar; 