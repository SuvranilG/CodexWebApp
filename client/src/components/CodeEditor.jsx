import { useRef, useEffect,useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../utils/constraints";
import Output from "./Output";
import ACTIONS from '../utils/actions';

import './CssForComponents.scss'

const CodeEditor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const isSocket = useRef(false);
  let debounceTimer;
  

  const onMount = (editor) => {
    editorRef.current = editor;
    // editor.focus();
  };

  const onSelect = (language) => {
    setValue(CODE_SNIPPETS[language]);
    setLanguage(language);
  };

  
  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  useEffect(() => {
    async function init() {
          editorRef.current.onDidChangeModelContent((event) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
          const code = editorRef.current.getValue();
          onCodeChange(code);
          

      // console.log(editorRef.current);
      // console.log(event);


            // if (event.origin !== monaco.editor.TextChangeOrigin.ModelSetValue) {                      
            // if(!isSocket.current) {
              // if(event.changes[0].forceMoveMarkers===false){ 
              socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                  roomId,
                  code
              });
              
                
            // }
            // else{isSocket.current = false;}
            
          }, 10);
        });
    }
    if(editorRef.current){
    init();
    }
    
}, [editorRef.current]);


  useEffect(() => {
    if (socketRef.current ) {

        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code}) => {
            if (code !== null) {
                isSocket.current = true;

                setValue(code);
                
            }
        });
    }

    return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
}, [socketRef.current]);
  

  return (
    
    
    <Box className="">
      <div className="menu">
        <LanguageSelector  language={language} onSelect={onSelect}   />
        
      </div>
      <HStack spacing={4}>
        <Box w="54%">
        

          <div className="menu">
          </div>
          <div className="editor">
            
            <Editor 
              className="editor"
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              height="70vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              editorDidMount={handleEditorDidMount}
              value={value}
              onChange={(value) => {setValue(value)}}
            />

          </div>
          
        </Box>
        <Output editorRef={editorRef} language={language} />

      </HStack>

    </Box>
    
  );
};
export default CodeEditor;