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

const Button = styled.input`
cursor: pointer;
background-color: #000;
color: #fff;
display: inline-block;
padding: 8px 16px;
border-radius: 10px;
border: none;
font-size: 16px;
margin-top: 40px;
width: 20%;
`;

const Link = styled.span`
cursor: pointer;
`;

const LogInLink = styled(Link)`
position: absolute;
top: 10px;
right: 20px;
color: rgb(118, 132, 146);
`;

const Error = styled.div`
color: red;
position: absolute;
bottom: 45px;
`;

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password === registerData.confirmPassword) {
      try {
        const response = await axios.post(`${SERVER}/user/register`, {
          email: registerData.email,
          password: registerData.password,
        });
        if (response.status === 201) {
          setUser(new User(response.data.payload._id, response.data.payload.email, response.data.token, true));
          localStorage.setItem('token', response.data.token);
        }
      } catch (err) {
        if (err.response && err.response.status >= 400 && err.response.status < 500) {
          setError(err.response.data.error)
        } else {
          console.error(err);
        }
      }
    } else {
      setError("Passwords don't match");
    }
  }

  return (
    <Container>
      <FormContainer>
        <CenteredWrapper>
          <LogInLink onClick={() => navigate('/login')}>Log In</LogInLink>
          <Header>Sign Up</Header>
          <MarginTopWrapper marginTop={10}>
            <Text>Register your account</Text>
          </MarginTopWrapper>
        </CenteredWrapper>
        <Form onSubmit={handleRegister}>
          <Input type="email" placeholder="Email" name='email' onChange={handleChange} value={registerData.email} />
          <Input type="password" placeholder="Password" name='password' onChange={handleChange} value={registerData.password} />
          <Input type="password" placeholder="Confirm Password" name='confirmPassword' onChange={handleChange} value={registerData.confirmPassword} />
          {error && <Error>{error}</Error>}
          <Button type='submit' value='Sign Up' />
        </Form>
      </FormContainer>
    </Container>
  );
}

export default Register