import { Home } from './home';
import './styles/app.scss';
import { Watch } from './components/watch';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/Temp";

const App = () => {
   const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Home route */}
      <Route path='/' element={user ? <Home /> : <Navigate to="/register" />} />

      {/* Protected routes */}
      {user && (
        <>
          <Route path='/watch' element={<Watch />} />
          <Route path='/movies' element={<Home type="movies" />} />
          <Route path='/series' element={<Home type="series" />} />
        </>
      )}

      {/* Auth routes */}
      <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
    </Routes>
  );
};

export default App;
