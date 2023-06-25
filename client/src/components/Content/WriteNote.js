import styled from 'styled-components'
import { BsPencil } from 'react-icons/bs';

const Container = styled.div`
background-color: #fff;
border-radius: 10px;
height: 80px;
margin-bottom: 20px;
display: flex;
align-items:center;
`;

const Pencil = styled(BsPencil)`
margin-right: 5px;
`;

const WriteButton = styled.div`
color: #848486;
margin-left: 20px;
transition: all .3s ease-out;
cursor: pointer;

:hover {
  color: #000;
}
`;

const WriteNote = ({ setViewEditor }) => {
  return (
    <Container>
      <WriteButton onClick={() => setViewEditor(true)}><Pencil /> Write Your Note</WriteButton>
    </Container>
  )
}

export default WriteNote