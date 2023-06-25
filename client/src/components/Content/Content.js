import styled from 'styled-components';
import { useState, useEffect } from 'react';
import NoteList from './NoteList/NoteList'
import WriteNote from '../Content/WriteNote';
import NoteEditor from './NoteEditor';

const Container = styled.div`
flex-grow: 1;
margin-left: calc(2% + 260px + 2%);
margin-top: 2%;
margin-right: 2%;
overflow-x: auto;
`
const Content = ({ activeFolder, user }) => {
  const [viewEditor, setViewEditor] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    user.fetchNotes(activeFolder).then((n) => setNotes(n));
  }, [activeFolder]);

  return (
    <Container>
      <WriteNote setViewEditor={setViewEditor} />
      <NoteEditor user={user} activeFolder={activeFolder} viewEditor={viewEditor} setViewEditor={setViewEditor} setNotes={setNotes} />
      <NoteList user={user} notes={notes} setNotes={setNotes} activeFolder={activeFolder} />
    </Container>
  )
}

export default Content