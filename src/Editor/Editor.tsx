import React, { useEffect, useMemo, useState } from 'react';
import JoditReact from "jodit-react";
import './Editor.css';

interface MyEditorProps {
  buttons: string[],
  element: any,
  content: string
}

function MyEditor(props: MyEditorProps) {
    const [content, setContent] = useState(''); // State to store editor content
    useEffect(() => {
        setContent(props.content);
    }, [])

    const handleChange = (newContent: string) => {
      setContent(newContent);
      props.element.value = newContent;
    };

    const config = useMemo(() => ({
      readonly: false, 
      uploader: { "insertImageAsBase64URI": true },
      buttons: [...props.buttons],
      language: 'es',
      showPlaceholder: false,
      statusbar: false,
      toolbarAdaptive: false,
    }), []);
  
    return (
      <div>
        <JoditReact value={content} onChange={handleChange} config={config} />
      </div>
    );
  }
  
  export default MyEditor;