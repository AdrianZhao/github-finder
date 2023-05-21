import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Search = () => {

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const onSubmit = ({ name }) => {
    navigate(`/user/${name}`);
  };

  return (
    <div className='container box'>
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
    </div>
  );
};

export default Search;

