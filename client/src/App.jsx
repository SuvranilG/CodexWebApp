import { useState } from 'react'
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import './App.css'

function App() {
  

  return (
    <div className='mainWrapper'>
    
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={1} py={1} >
      <CodeEditor />
    </Box>

    </div>
  )
}

export default App
