import styled from 'styled-components';
import { BsTrash, BsPencil } from 'react-icons/bs';

const Container = styled.div`
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
background-color: #fff;
width: 30%;
position: absolute;
top: 30px;
right: 20px;
border-radius: 10px;
`;

const Button = styled.div`
padding: 8px 16px;
margin-top: 5px;
color: #000;
display: flex;
align-items: center;
cursor: pointer;
user-select: none;

:last-child {
  margin-bottom: 5px;
}
`

const TrashIcon = styled(BsTrash)`
margin-right: 5px;
`;

const PencilIcon = styled(BsPencil)`
margin-right: 5px;
`;

const NoteOptions = ({ handleDelete, handleEditClick }) => {
  return (
    <Container>
      <Button onClick={handleEditClick}><PencilIcon />Edit</Button>
      <Button onClick={handleDelete}><TrashIcon />Delete</Button>
    </Container>
  )
}

export default NoteOptions