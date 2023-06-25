import Sidebar from './Sidebar/Sidebar'
import Content from './Content/Content';
import { useEffect, useState } from 'react';

const AppLogged = ({ user, setUser }) => {
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(false);

  useEffect(() => {
    user.fetchFolders().then((f) => setFolders(f));
  }, []);

  useEffect(() => {
    if (folders.length > 0) {
      setActiveFolder(folders[0]._id);
    }
  }, [folders]);

  const handleLogout = async () => {
    const loggedOutUser = await user.logout();
    localStorage.removeItem('token');
    setUser(loggedOutUser);
  }

  return (
    <>
      <Sidebar user={user} handleLogout={handleLogout} activeFolder={activeFolder} setActiveFolder={setActiveFolder} folders={folders} setFolders={setFolders} />
      {activeFolder !== false && <Content activeFolder={activeFolder} user={user} />}
    </>
  )
}

export default AppLogged