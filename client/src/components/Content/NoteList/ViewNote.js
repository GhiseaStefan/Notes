import styled from 'styled-components';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

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

const Container = styled.div`
background-color: #fff;
height: 435px;
color: #000;
border-radius: 10px;
width: 60vw;
`;

const Title = styled.div`
margin: 0px 10px 0 30px;
padding-top: 20px;
`;

const Content = styled.div`
margin: 20px 10px 0 30px;
list-style-position:inside;
`;

const ViewNote = ({ note, viewNote, handleViewClick }) => {
  const title = DOMPurify.sanitize(note.title);
  const content = DOMPurify.sanitize(note.content);

  return (
    <>
      {viewNote &&
        <>
          <Backdrop onClick={handleViewClick} />
          <Modal>
            <Container>
              <Title>{parse(title)}</Title>
              <Content>{parse(content)}</Content>
            </Container>
          </Modal>
        </>
      }
    </>
  );
}

export default ViewNote