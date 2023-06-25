import styled from 'styled-components';
import { BsTrash, BsPencil } from 'react-icons/bs';

const Container = styled.div`
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
background-color: #fff;
width: 50%;
position: absolute;
top: 30px;
right: 20px;
border-radius: 10px;
z-index: 2;
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
margin-right: 10px;
`;

const PencilIcon = styled(BsPencil)`
margin-right: 10px;
`;

const FolderOptions = ({ handleDelete, handleViewEdit }) => {
  return (
    <Container>
      <Button onClick={handleViewEdit}><PencilIcon />Edit</Button>
      <Button onClick={handleDelete}><TrashIcon />Delete</Button>
    </Container>
  )
}

export default FolderOptions