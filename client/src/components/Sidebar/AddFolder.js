import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: 15px;
`;

const PlusIcon = styled(FiPlus)`
margin-right: 10px;
`;

const AddButton = styled.div`
display: flex;
align-items: center;
height: 40px;
width: 100%;
padding-left: 10px;
border-radius: 10px;
background-color: #000;
font-size: 18px;
color: #fff;
text-align: left;
cursor: pointer;
`;

const FolderInput = styled.input`
height: 40px;
width: 100%;
padding-left: 10px;
padding-right: 10px;
border-radius: 10px;
outline: none;
border: none;
background-color: #f3f6fd;
font-size: 18px;
margin-top: 15px;
`;

const AddFolder = ({ user, setFolders }) => {
  const [folderName, setFolderName] = useState('');

  const createFolder = async () => {
    try {
      const updatedFolders = await user.addFolder(folderName);
      setFolders(updatedFolders);
      setFolderName('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <AddButton onClick={createFolder}><PlusIcon />Add New Folder</AddButton>
      <FolderInput type='text' placeholder='Folder name...' value={folderName} onChange={(e) => setFolderName(e.target.value)} />
    </Container>
  )
}

export default AddFolder