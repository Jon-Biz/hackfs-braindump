import React from 'react'
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

import './Text.css'

const MyEditor = 
        () => {
                    const [editorState, setEditorState] = React.useState(
                        () => EditorState.createEmpty(),
                    );
                    
                    const onChange = (editorState) => {
                        console.log(editorState);
                        setEditorState(editorState);
                    }

                    return <Editor editorState={editorState} onChange={onChange} />;
                }

const Text =
        () => (
            <div className="text-editor">
                <MyEditor />
            </div>
        )  

export default Text