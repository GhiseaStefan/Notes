import { useState } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
.ql-editor {
    padding-left: 30px;
    padding-right: 30px;
    color: #000;
}
`;

const Backdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0, 0, 0, 0.5);
z-index: 10;
`;

const Modal = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 11;
`;

const Button1 = styled.button`
background-color: #fff;
color: #000;
border-radius: 10px;
border: 1px solid #000;
padding: 6px 12px;
cursor: pointer;
font-size: 18px;
`;

const Button2 = styled.button`
background-color: #000;
color: #fff;
border-radius: 10px;
border: 1px solid #000;
padding: 6px 12px;
cursor: pointer;
font-size: 18px;
margin-left: 10px;
`;

const EditorContainer = styled.div`
position: relative;
background-color: #fff;
height: 435px;
color: #000;
border-radius: 10px;
width: 60vw;
`;

const EditorButtons = styled.div`
position: absolute;
bottom: 10px;
right: 20px;
`;

const EditNote = ({ showEdit, handleEditClick, user, note, setShowEdit, setNotes, activeFolder }) => {
  const [value, setValue] = useState(`${note.title}${note.content}`);

  const handleUpdate = async () => {
    const headerTags = ['h1', 'h2', 'h3'];
    let title = '';
    let content = value;

    for (let header of headerTags) {
      if (value.includes(`<${header}>`)) {
        const startTitleIndex = value.indexOf(`<${header}>`);
        const endTitleIndex = value.indexOf(`</${header}>`) + `</${header}>`.length;

        if (endTitleIndex > startTitleIndex) {
          title = value.slice(startTitleIndex, endTitleIndex);
          content = value.slice(endTitleIndex);
          break;
        }
      }
    }

    try {
      const updatedNotes = await user.editNote(activeFolder, note._id, title, content);
      setShowEdit(false);
      setNotes(updatedNotes);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {showEdit &&
        <>
          <Backdrop onClick={handleEditClick} />
          <Modal>
            <EditorContainer>
              <GlobalStyles />
              <ReactQuill value={value} onChange={setValue} />
              <EditorButtons>
                <Button1 onClick={() => setShowEdit(false)}>Close</Button1>
                <Button2 onClick={handleUpdate}>Save</Button2>
              </EditorButtons>
            </EditorContainer>
          </Modal>
        </>
      }
    </>
  )
}

export default EditNote