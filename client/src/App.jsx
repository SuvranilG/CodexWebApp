import { useState } from 'react'
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import './App.css'
import { Toaster } from 'react-hot-toast';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
function App() {
  

  return (
    <div className='mainWrapper'>
    
    {/* <Box minH="100vh" bg="#0f0a19" color="gray.500" px={1} py={1} >
      <CodeEditor />
    </Box> */}

      <div>
          <Toaster
              position="top-right"
              toastOptions={{
                  success: {
                      theme: {
                          primary: '#4aed88',
                      },
                  },
              }}
          ></Toaster>
      </div>

      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
              path="/editor/:roomId"
              element={<EditorPage />}
          ></Route>
      </Routes>

    

    </div>
  )
}

export default App
