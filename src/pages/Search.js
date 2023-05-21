import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_GIT_HUB_TOKEN;
const Search = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const options = {headers: { Authorization: `Bearer ${apiKey}`}};

  const isUser = async (name) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${name}`, options);
      console.log(response.data);
      navigate(`/user/${name}`);
    } catch (error) {
      setErrorMessage('User not found. Please try again');
      name = '';
    }
  };
  const onSubmit = ({ name }) => {
    isUser(name);
  };

  return (
    <div className='container box'>
      <div className="wrapper">
        <h2>Github Finder</h2>
        <div className='message-wrapper'>
          <p className="message">{errors.name?.message}</p>
        </div>
        <form className="search-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <input 
            type='text' 
            {...register('name', { 
              required: { 
                value: true, 
                message: "Name is reuqired",
              }
            })} 
          />
        <input type="submit"></input>
        </form>
        <p className="message">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Search;

