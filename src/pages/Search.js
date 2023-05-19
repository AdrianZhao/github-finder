
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const history = useNavigate();
  const onSubmit = ({ username }) => {
    history(`/user/${username}`);
  };

  return (
    <div className="wrapper">
      <h2>Github Finder</h2>
      <form className="search-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <input 
          type='text' 
          {...register('name', { 
            required: { 
              value: true, 
              message: "Name is reuqired"
            }
          })} 
        />
      <input type="submit"></input>
      </form>
      <p className="message">{errors.name?.message}</p>
    </div>
  );
};

export default Search;

