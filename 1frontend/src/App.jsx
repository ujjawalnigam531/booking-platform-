  import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  
  function App(){
    const notify = () => toast("  ordered");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer  />
      </div>
    );
  }
  
  export default App
  