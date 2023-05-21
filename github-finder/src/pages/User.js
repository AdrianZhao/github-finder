import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (error) {
        setUser('');
      }
    };
    fetchUser();
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
      } catch (error) {
        setRepos('');
      }
    };
    fetchRepo();
  }, [username]);

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <section>
      <div className='container'>
       <div className='info-wrapper'>
        <img src={user.avatar_url} alt={user.name} />
        <h1>{user.name}</h1>
        <span>{user.public_repos}</span> 
        <span>{user.followers}</span>
        <span>{user.following}</span>
        <div className='p'>
          <p>Repositories</p>
          <p>Followers</p>
          <p>Following</p>
        </div>
        <button>
        <Link 
          className='link' 
          target="_blank"
          to={`https://github.com/${user.login}`}>
          GitHub
        </Link>
        </button>
      </div>
      <div className='repos'>
        <h2>My Repositories</h2>
        {repos.map((repo) => (
          <div className="repo" key={repo.id}>
            <div>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </div>
            <div className="last-updated">
              Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', 
              { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
        </div>
      ))}
    </div>
    </div>
  </section>
  )
};

export default User;
