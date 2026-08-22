function SearchBar({username, setUsername, onSearch}) {
    return(
        <div className="flex gap-2 mb-4 justify-center">
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Enter a username"
            className="px-4 py-2 border border-gray-300 rounded hover:border-blue-500"
            />
            <button onClick={onSearch} className="px-4 py-2 bg-blue-600 text-white rounded bg-blue-500 hover:bg-blue-700">search</button>
        </div>
    )
}
export default SearchBar; 