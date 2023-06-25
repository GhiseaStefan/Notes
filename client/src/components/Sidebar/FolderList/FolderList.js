import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io';
import { BsFolderPlus } from 'react-icons/bs';
import { useState } from 'react';
import Folder from './Folder';

const Container = styled.div`
margin: 15px;
user-select: none;
`;

const Folders = styled.div`
display: flex;
align-items: center;
position: relative;
background-color: #fff;
height: 40px;
width: 100%;
padding-left: 10px;
border-radius: 10px;
font-size: 18px;
text-align: left;
cursor: pointer;
`

const DownArrowIcon = styled(IoIosArrowDown)`
position: absolute;
right: 20px;
transform: ${({ rotate }) => rotate};
transition: all .3s ease-out;
`;

const FoldersIcon = styled(BsFolderPlus)`
margin-right: 10px;
`;

const FoldersContainer = styled.div`
display: ${({ viewFolders }) => viewFolders ? 'block' : 'none'};
`;

const FolderList = ({ user, folders, setFolders, activeFolder, setActiveFolder }) => {
  const [viewFolders, setViewFolders] = useState(false);

  return (
    <Container>
      <Folders onClick={() => setViewFolders(!viewFolders)}><FoldersIcon /> Folders <DownArrowIcon rotate={viewFolders ? 'rotate(0deg)' : 'rotate(-90deg)'} /></Folders>
      <FoldersContainer viewFolders={viewFolders}>
        {folders.map((f) =>
          <Folder user={user} key={f._id} folder={f} setFolders={setFolders} activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
        )}
      </FoldersContainer>
    </Container>
  )
}

export default FolderList