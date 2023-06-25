import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import AddFolder from './AddFolder';
import FolderList from './FolderList/FolderList';
import { VscAccount } from 'react-icons/vsc';

const Container = styled.div`
position: fixed;
margin-top: 2%;
margin-left: 2%;
width: 260px;
height: 94%;
background-color: #fff;
border-radius: 10px;
`;

const LogoWrapper = styled.div`
margin: 15px;
border-bottom: 2px solid #dcdddf; 
`;

const LogoImage = styled.img`
width: 100%;
height: 100%;
`

const AccountContainer = styled.div`
margin: 15px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
height: 50px;
`;

const AccountIcon = styled(VscAccount)`
font-size: 20px;
position: absolute;
left: 10px;
`;

const NormalText = styled.p`
font-size: 24px;
color: #000;
`;

const SearchContainer = styled.form`
margin: 15px;
position: relative;
`;

const SearchIcon = styled(BsSearch)`
width: 20px;
height: 20px;
position: absolute;
top: 10px;
left: 10px;
`;

const SearchInput = styled.input`
height: 40px;
width: 100%;
padding-left: 40px;
padding-right: 10px;
border-radius: 10px;
outline: none;
border: none;
background-color: #f3f6fd;
font-size: 18px;
`;

const LogoutButton = styled.div`
position: absolute;
bottom: 0px;
margin: 15px;
display: flex;
align-items: center;
height: 30px;
width: 30%;
padding-left: 10px;
border-radius: 10px;
background-color: #000;
font-size: 18px;
color: #fff;
text-align: left;
cursor: pointer;
`;

const Sidebar = ({ user, handleLogout, activeFolder, setActiveFolder, folders, setFolders }) => {
  const username = user.email[0].toUpperCase() + user.email.split('@')[0].slice(1);
  return (
    <Container>
      <LogoWrapper>
        <LogoImage src='/images/Notes.png' />
      </LogoWrapper>
      <AccountContainer>
        <AccountIcon />
        <NormalText>{username}</NormalText>
      </AccountContainer>
      <SearchContainer>
        <SearchIcon />
        <SearchInput type='text' placeholder='Search' />
      </SearchContainer>
      <AddFolder user={user} setFolders={setFolders} />
      <FolderList user={user} folders={folders} setFolders={setFolders} activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
    </Container>
  )
}

export default Sidebar