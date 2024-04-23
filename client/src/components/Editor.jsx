import React, { useEffect,useState, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/php/php';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint";
import { Box, HStack, Text } from "@chakra-ui/react";
import { CODE_SNIPPETS } from "../utils/constraints";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import ACTIONS from '../utils/actions';

const Editor = ({ socketRef, roomId, onCodeChange,onLangChange }) => {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState("javascript");

    const onSelect = (language) => {
        const code=CODE_SNIPPETS[language];
        editorRef.current.setValue(code);
        setLanguage(language);
        onLangChange(language);
          socketRef.current.emit(ACTIONS.LANG_CHANGE, {
              roomId,
              language,
          });
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
        });
    
      };

    useEffect(() => {
        async function init() {

            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: language, json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                    extraKeys: { "Ctrl-Space": "autocomplete" },
                }
            );

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        }
        init();
    }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });

            socketRef.current.on(ACTIONS.LANG_CHANGE, ({ language}) => {
                if (language !== null) {
                  setLanguage(language);
                    
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
            
          <textarea id="realtimeEditor" />

          </div>
          
        </Box>
        
        <Output editorRef={editorRef} language={language||'javascript'} />

      </HStack>

    </Box>
    
    )
};

export default Editor;