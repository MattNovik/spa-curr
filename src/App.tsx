import './App.css';
import Board from './components/Board/Board';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Board />
      </Wrapper>
    </div>
  );
}

export default App;
