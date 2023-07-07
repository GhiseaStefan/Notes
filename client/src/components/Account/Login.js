import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { User, SERVER } from '../../utils';

const Container = styled.div`
background-color: #fff;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
user-select: none;
padding: 50px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const FormContainer = styled.div`
width: 600px;
border-radius: 10px;
padding: 10px;
`;

const CenteredWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
`;

const Header = styled.h2`
font-weight: normal;
`;

const Text = styled.p`
color: rgb(118, 132, 146);
`;

const MarginTopWrapper = styled.div`
margin-top: ${({ marginTop }) => marginTop}px;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
margin-top: 30px;
position: relative;
`;

const Input = styled.input`
color: #000;
height: 45px;
line-height: 30px;
border: 1px solid #dcdddf;
font-size: 14px;
border-radius: 10px;
padding: 0 10px;
margin-top: 10px;

:focus {
  outline: 1px solid #000;
}
`;

const ButtonsContainer = styled.div`
display: grid;
grid-template-columns: auto 1fr;
justify-items: end;
align-items: center;
margin-top: 30px;
`;

const CheckboxContainer = styled.div`
display: flex;
align-items: center;
`;

const Checkbox = styled.input`
appearance: none;
background-color: #fff;
border: 2px solid #333;
height: 14px;
min-width: 14px;
border-radius: 10px;
position: relative;
outline: none;
cursor: pointer;
margin-right: 10px;

:checked {
  background-color: #000;
  border: 2px solid #000;
  outline: 2px solid #fff;
  outline-offset: -5px;
}
`;

const CheckboxLabel = styled.label`
color: rgb(118, 132, 146);
cursor: pointer;
`;

const Button = styled.button`
cursor: pointer;
background-color: #000;
color: #fff;
display: inline-block;
padding: 8px 16px;
border-radius: 10px;
border: none;
font-size: 16px;
`;

const CreateAccountLink = styled.span`
position: absolute;
top: 10px;
right: 20px;
color: rgb(118, 132, 146);
cursor: pointer;
`;

const Error = styled.div`
color: red;
position: absolute;
bottom: -30px;
`;

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER}/user/login`, {
        email: loginData.email,
        password: loginData.password,
        rememberMe: rememberMe
      });
      if (response.status === 200) {
        setUser(new User(response.data.payload._id, response.data.payload.email, response.data.token, true));
        localStorage.setItem('token', response.data.token);
      }
    } catch (err) {
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        setError(err.response.data.error);
      } else {
        console.error(err);
      }
    }
  }

  return (
    <Container>
      <FormContainer>
        <CenteredWrapper>
          <CreateAccountLink onClick={() => navigate('/register')}>Create an Account</CreateAccountLink>
          <Header>Sign In</Header>
          <MarginTopWrapper marginTop={10}>
            <Text>Login to stay connected</Text>
          </MarginTopWrapper>
        </CenteredWrapper>
        <Form onSubmit={handleLogin}>
          <Input type="email" placeholder="Email" name='email' onChange={handleChange} value={loginData.email} />
          <Input type="password" placeholder="Password" name='password' onChange={handleChange} value={loginData.password} />
          <input type='submit' style={{ 'display': 'none' }} />
          {error && <Error>{error}</Error>}
        </Form>
        <ButtonsContainer>
          <CheckboxContainer>
            <Checkbox type="checkbox" id="rememberMe" value={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <CheckboxLabel htmlFor="rememberMe">Remember Me</CheckboxLabel>
          </CheckboxContainer>
          <Button onClick={handleLogin}>Sign In</Button>
        </ButtonsContainer>
      </FormContainer>
    </Container>
  );
};

export default Login;
