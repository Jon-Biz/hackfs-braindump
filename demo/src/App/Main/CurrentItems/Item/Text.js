import React from 'react'
import 'draft-js/dist/Draft.css'

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

function MyEditor() {
    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty(),
    );
  
    return <Editor editorState={editorState} onChange={setEditorState} />;
  }
  

const Text =
        () => (
            <div>
                Text
            <MyEditor />
            </div>
        )  

export default Text