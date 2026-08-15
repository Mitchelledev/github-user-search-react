function Usercard({user}) {
    if(!user) return null;

    return(
        <div>
            <img src= {user.avatar_url} alt = {user.login} width="100"/>;
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
            <p>followers: {user.followers}</p>
            <p>public Repos: {user.public_repos}</p>
            <a href={user.html_url} target ="_blank"> View github profile</a>
        </div>
    )
}
export default Usercard;

