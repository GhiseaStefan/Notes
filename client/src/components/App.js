import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { useState } from 'react';
import { User } from '../utils';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLogged from './AppLogged';
import Register from './Account/Register';
import Login from './Account/Login';
import { useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;

const Container = styled.div`
background-color: #f1f4fb;
display: flex;
min-height: 100vh;
`;

const App = () => {
  const [user, setUser] = useState(new User('', '', '', false));
  const [loading, setLoading] = useState(true);

  const handleLoggedIn = async () => {
    try {
      setUser(await user.checkLoggedIn());
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setUser(new User('', '', '', false));
        setLoading(false);
      } else {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    handleLoggedIn();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Container>
      <GlobalStyle />
      <Routes>
        {user.isLoggedIn ?
          <>
            <Route path='/' element={<AppLogged user={user} setUser={setUser} />} />
            <Route path='/register' element={<Navigate replace to='/' />} />
            <Route path='/login' element={<Navigate replace to='/' />} />
          </> :
          <>
            <Route path='/register' element={<Register setUser={setUser} />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/' element={<Navigate replace to='/login' />} />
          </>
        }
      </Routes>
    </Container>
  )
}

export default App