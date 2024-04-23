import { useRef, useEffect,useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../utils/constraints";
import Output from "./Output";
import ACTIONS from '../utils/actions';

import './CssForComponents.scss'

const CodeEditor = ({ socketRef, roomId, onCodeChange, onLangChange }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const isSocket = useRef(true);
  let debounceTimer;
  

  const onMount = (editor) => {
    editorRef.current = editor;
    // editor.focus();
    isSocket.current = true;

  };

  const onSelect = (language) => {
    setValue(CODE_SNIPPETS[language]);
    isSocket.current = false;
    setLanguage(language);
    onLangChange(language);
    if(!isSocket.current ) {
      socketRef.current.emit(ACTIONS.LANG_CHANGE, {
          roomId,
          language,
      });}
    isSocket.current = true;

  };

  
  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
    isSocket.current = true;

  }

  useEffect(() => {
    async function init() {
          editorRef.current.onDidChangeModelContent(() => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
          const code = editorRef.current.getValue();
          onCodeChange(code);

            if(!isSocket.current ) {
              socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                  roomId,
                  code
              });
            console.log(editorRef.current);
            // console.log(event);

            }
        isSocket.current=true;
            
          }, 70);

        });


    }
    if(editorRef.current){
    init();
    }

    return () => {
     
  };
    
}, [editorRef.current]);


  useEffect(() => {
    if (socketRef.current ) {

        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code}) => {
            if (code !== null) {
                setValue(code);
                // editorRef.current?.setValue(code);
                isSocket.current = true;

                
            }
        });

        socketRef.current.on(ACTIONS.LANG_CHANGE, ({ language}) => {
          if (language !== null) {
            setLanguage(language);
            isSocket.current = true;
              
          }
      });
    }

    return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
}, [socketRef.current,language]);
  

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
                  enabled: true,
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
              onKeyDown={
                setTimeout(() => {
                  isSocket.current=false;
                },0)
              
              }
            />

          </div>
          
        </Box>
        <Output editorRef={editorRef} language={language} />

      </HStack>

    </Box>
    
  );
};
export default CodeEditor;