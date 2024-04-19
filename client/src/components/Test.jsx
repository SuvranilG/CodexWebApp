import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function MyComponent() {
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize the editor when it mounts
    if (editorRef.current) {
      // Set up the Monaco editor instance
      editorRef.current.onDidChangeModelContent((event) => {
        const code = editorRef.current.getValue();
        onCodeChange(code);

        // Emit code changes to the server (if not originating from setValue)
        if (event.origin !== monaco.editor.TextChangeOrigin.ModelSetValue) {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });

      // Listen for incoming code changes from the server
      if (socketRef.current) {
        socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
          if (code !== null) {
            editorRef.current.setValue(code);
          }
        });
      }

      // Clean up event listeners when the component unmounts
      return () => {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      };
    }
  }, []);

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// Welcome to My Editor"
      editorDidMount={(editor) => {
        editorRef.current = editor;
      }}
    />
  );
}

export default MyComponent;
