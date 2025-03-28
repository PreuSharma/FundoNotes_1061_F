import "./App.css";
import RoutingModule from "./RoutingModule";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RoutingModule />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
