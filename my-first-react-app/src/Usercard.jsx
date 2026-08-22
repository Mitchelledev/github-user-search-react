function Usercard({user}) {
    if(!user) return null;

    return(
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg text-black">
            <img src= {user.avatar_url} alt = {user.login} className="w-24 h-24 rounded-full"/>;
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>followers: {user.followers}</p>
            <p>public Repos: {user.public_repos}</p>
            <a href={user.html_url} target ="_blank" className="text-blue-600 hover:underline"> View github profile</a>
        </div>
    )
}
export default Usercard; 

