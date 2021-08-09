import React from 'react'
import {
    useRecoilState,
  } from 'recoil';

import {
    Editor, 
    ContentState,
    EditorState
  } from 'draft-js'
import 'draft-js/dist/Draft.css';

import './Text.css'

import itemText from '../../../../Recoil/Atoms/itemText'

const EditorComponent = 
        () => {
                    const [ 
                      text
                    , setTextState 
                    ] = useRecoilState(itemText)

                    const contentState = ContentState.createFromText(text)
                    const editorState = EditorState.createWithContent(contentState)
            
                    const onChange = 
                            editorState => { 
                                const text = editorState.getCurrentContent().getPlainText('\u0001')
                                setTextState(text) 
                            }

                    return <Editor 
                                editorState={editorState} 
                                onChange={onChange} 
                            />
                }

const Text =
        () => (
            <div className="text-editor">
                <EditorComponent />
            </div>
        )  

export default Text