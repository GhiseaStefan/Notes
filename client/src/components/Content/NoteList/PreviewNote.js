import styled from 'styled-components';
import { BiCalendar, BiDotsHorizontalRounded } from 'react-icons/bi';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import NoteOptions from './NoteOptions';
import { useState, useEffect, useRef } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import ViewNote from './ViewNote';
import EditNote from './EditNote';

const Container = styled.div`
flex: 0 0 calc(33.33% - 20px);
height: 235px;
margin: 10px;
position: relative;
transition: all .3s ease-out;
overflow: hidden;
border-top-left-radius: 10px;
border-top-right-radius: 10px;

::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    border-radius: 10px;
    height: 4px;
    width: 100%;
    background-color: #000; 
}
`
const NoteTitle = styled.div`
margin: 30px 10px 0 10px;
`;

const NoteContent = styled.div`
margin: 30px 10px 0 10px;
list-style-position:inside;
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
`;

const CalendarIcon = styled(BiCalendar)`
font-weight: bold;
position: absolute;
left: -20px;
`
const NoteDate = styled.p`
font-weight: bold;
position: absolute;
bottom: 10px;
right: 20px;
`
const HorizontalDots = styled(BiDotsHorizontalRounded)`
position: absolute;
top: 10px;
right: 20px;
font-size: 24px;
cursor: pointer;
`;

const ViewIcon = styled(BsFillEyeFill)`
position: absolute;
bottom: 10px;
left: 10px;
font-size: 20px;
cursor: pointer;
`;

const PreviewNote = ({ user, note, setNotes, activeFolder }) => {
  const [viewOptions, setViewOptions] = useState(false);
  const [viewNote, setViewNote] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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

  const handleViewClick = () => {
    setViewNote(!viewNote);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
    setViewOptions(false);
  };

  const handleDelete = async () => {
    try {
      const updatedNotes = await user.deleteNote(activeFolder, note._id);
      setNotes(updatedNotes);
      setViewOptions(false);
    } catch (err) {
      console.error(err);
    }
  }

  const title = DOMPurify.sanitize(note.title);
  const content = DOMPurify.sanitize(note.content);
  const day = note.date.slice(8, 10);
  const month = new Date(note.date).toLocaleString('default', { month: 'short' });
  const year = note.date.slice(0, 4);
  const date = `${day} ${month} ${year}`;

  return (
    <Container ref={containerRef}>
      <NoteTitle>{parse(title)}</NoteTitle>
      <NoteContent>{parse(content)}</NoteContent>
      <NoteDate><CalendarIcon />{date}</NoteDate>
      <HorizontalDots onClick={() => setViewOptions(!viewOptions)} />
      {viewOptions && <NoteOptions handleDelete={handleDelete} handleEditClick={handleEditClick} />}
      <ViewIcon onClick={handleViewClick} />
      <ViewNote note={note} viewNote={viewNote} handleViewClick={handleViewClick} />
      <EditNote showEdit={showEdit} handleEditClick={handleEditClick} user={user} note={note} setShowEdit={setShowEdit} setNotes={setNotes} activeFolder={activeFolder} />
    </Container>
  );
}

export default PreviewNote