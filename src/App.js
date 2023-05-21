import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/index.css';
import Search from './pages/Search';
import User from './pages/User';
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route exact path="/" element={<Search />}/>
          <Route exact path='/user/:username' element={<User />} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;
