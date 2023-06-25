import styled from 'styled-components';
import { BsFolder } from 'react-icons/bs';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import FolderOptions from './FolderOptions';
import { useState, useEffect, useRef } from 'react';

const Container = styled.div`
display: flex;
align-items: center;
position: relative;
background-color: #fff;
height: 40px;
width: 95%;
color: ${({ isActive }) => isActive ? '#000' : '#9b9b9d'};
padding-left: 10px;
border-radius: 10px;
margin-left: 10px;
margin-top: 10px;
font-size: 18px;
text-align: left;
cursor: pointer;
`;

const FolderIcon = styled(BsFolder)`
margin-right: 10px;
`;

const FolderIcon2 = styled(BsFolder)`
margin-right: 10px;
color: #000;
`;

const HorizontalDots = styled(BiDotsHorizontalRounded)`
position: absolute;
top: 10px;
right: 20px;
font-size: 24px;
cursor: pointer;
`;

const InputContainer = styled.div`
display: flex;
align-items: center;
position: relative;
height: 40px;
border-radius: 10px;
margin-top: 10px;
text-align: left;
`

const FolderInput = styled.input`
color: #000;
font-size: 18px;
border: none;
width: 95%;
outline: none;
`;

const TitleContainer = styled.div`
display: flex;
align-items: center;
`;

const Folder = ({ user, folder, setFolders, activeFolder, setActiveFolder }) => {
  const [viewOptions, setViewOptions] = useState(false);
  const [viewEdit, setViewEdit] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);

  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setViewOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const activateOptions = (e) => {
    e.stopPropagation();
    setViewOptions(!viewOptions);
  }

  const handleDelete = async () => {
    try {
      const updatedFolders = await user.deleteFolder(folder._id);
      setFolders(updatedFolders);
    } catch (err) {
      console.error(err);
    }
  }

  const handleViewEdit = () => {
    setViewEdit(true);
    setViewOptions(false);
  }

  const handleEdit = async (e) => {
    if (e.key === 'Enter') {
      try {
        const editSuccessful = await user.editFolder(folder._id, folderName);
        if (editSuccessful) {
          setViewEdit(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <Container isActive={activeFolder === folder._id} ref={containerRef}>
      {!viewEdit &&
        <TitleContainer onClick={() => setActiveFolder(prevActiveFolder => prevActiveFolder === folder._id ? false : folder._id)}>
          <FolderIcon />{folderName}<HorizontalDots onClick={activateOptions} />
        </TitleContainer>
      }
      {viewOptions && <FolderOptions handleDelete={handleDelete} handleViewEdit={handleViewEdit} />}
      {viewEdit &&
        <InputContainer>
          <FolderIcon2 />
          <FolderInput type='text' value={folderName} onChange={(e) => setFolderName(e.target.value)} onKeyDown={handleEdit} />
        </InputContainer>
      }
    </Container>
  )
}

export default Folder