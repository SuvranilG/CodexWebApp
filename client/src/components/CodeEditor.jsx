import { useRef, useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../utils/constraints";
import Output from "./Output";
import './CssForComponents.scss'

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setValue(CODE_SNIPPETS[language]);
    setLanguage(language);
  };


  

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
              value={value}
              onChange={(value) => setValue(value)}
            />

          </div>
          
        </Box>
        <Output editorRef={editorRef} language={language} />

      </HStack>

    </Box>
    
  );
};
export default CodeEditor;