import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState('');
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    const token = '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';
    const options = {headers: { Authorization: `Bearer ${token}`}};
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`, options);
        setUser(response.data);
      } catch (error) {
        setUser('');
      }
    };
    fetchUser();
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, options);
        setRepos(response.data);
      } catch (error) {
        setRepos([]);
      }
    };
    fetchRepo();
  }, [username]);
  return (
    <section>
      <div className='container board'>
        <div className='info-wrapper'>
          <img src={user.avatar_url} alt={user.name} />
          <h1>{user.login}</h1>
          <div className='detail-wrapper'>
            <p>Repositories:<span>{user.public_repos}</span></p>
            <p>Followers:<span>{user.followers}</span></p>
            <p>Following:<span>{user.following}</span></p>
          </div>
          <button>
            <Link 
              className='link' 
              target="_blank"
              to={`https://github.com/${user.login}`}>
              GitHub Page
            </Link>
          </button>
        </div>
        <div className='repos-wrapper'>
          <h2>My Repositories</h2>
          {repos.sort((a, b) => b.id - a.id).map((repo) => (
            <div className="repo" key={repo.id}>
              <div>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </div>
              <div className="time">
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
