import './App.css';
import AuthContextState from "./Context/AuthContext/AuthContextState";
import Wrapper from './Wrapper';

function App() {
  return (
    <>
      <AuthContextState>
        <Wrapper />
      </AuthContextState>
    </>
  );
}

export default App;
