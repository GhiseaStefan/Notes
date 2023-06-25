import { useState } from 'react';
import styled, { css } from 'styled-components'
import PreviewNote from './PreviewNote';

const Container = styled.div`
`;

const NotesContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;
min-height: 795px;
background-color: #fff;
border-radius: 10px;
`;

const Pagination = styled.div`
display: flex;
justify-content: center;
border-radius: 10px;
margin-top: 18px;
margin-bottom: 20px;
`;

const PageNumber = styled.button`
background-color: #fff;
color: #000;
border-radius: 10px;
border: 1px solid #000;
padding: 4px 8px;
cursor: pointer;
font-size: 12px;
margin-left: 20px;

${props => props.isActive && css`
  background-color: #000;
  color: #fff;
`}
`;

const NoteList = ({ user, notes, setNotes, activeFolder }) => {
  const notesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const currentNotes = notes.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage);

  return (
    <Container>
      <NotesContainer>
        {currentNotes.map((note, index) => (<PreviewNote user={user} key={index} note={note} setNotes={setNotes} activeFolder={activeFolder} />))}
      </NotesContainer>
      <Pagination>
        {[...Array(totalPages)].map((page, index) =>
          <PageNumber key={index} onClick={() => setCurrentPage(index + 1)} isActive={currentPage === index + 1}>
            {index + 1}
          </PageNumber>
        )}
      </Pagination>
    </Container>
  );
}

export default NoteList
