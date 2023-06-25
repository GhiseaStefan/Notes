import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

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
`;

const EditorButtons = styled.div`
position: absolute;
bottom: 10px;
right: 20px;
`;

const GlobalStyles = createGlobalStyle`
  .ql-container.ql-snow {
    border: none;
    outline: none;
    margin-bottom: 20px;
  }
  
  .ql-toolbar.ql-snow {
    background-color: #fff;
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
  }
  
  .ql-formats {
    margin-top: 10px;
  }
  
  .ql-picker {
    margin-left: 20px;
  }
  
  .ql-toolbar.ql-snow::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    border-radius: 10px;
    height: 1px;
    width: 95%;
    background-color: #848486;
    transform: translate(-50%);
  }
  
  .ql-editor {
    height: 300px;
    font-size: 16px;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-left: 40px;
    padding-right: 40px;
    max-width: 100%;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
`;

const NoteEditor = ({ user, activeFolder, viewEditor, setViewEditor, setNotes }) => {
  const [value, setValue] = useState('');

  const handleSave = async () => {
    if (activeFolder !== false) {
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
        const updatedNotes = await user.addNote(activeFolder, title, content);
        setValue('');
        setNotes(updatedNotes);
      } catch (err) {
        console.error(err);
      }
      setViewEditor(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      {viewEditor &&
        <EditorContainer>
          <ReactQuill value={value} onChange={setValue} />
          <EditorButtons>
            <Button1 onClick={() => setViewEditor(false)}>Close</Button1>
            <Button2 onClick={handleSave}>Save</Button2>
          </EditorButtons>
        </EditorContainer>
      }
    </>
  );
};

export default NoteEditor;
