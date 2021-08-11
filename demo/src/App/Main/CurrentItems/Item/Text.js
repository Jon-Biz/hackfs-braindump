import React from 'react'
import {
    useRecoilState,
  } from 'recoil';

import {
    Editor, 
    ContentState,
    EditorState,
    convertToRaw,
    convertFromRaw
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

                    let editorState

                    try {
                      debugger
                      const rawJson = JSON.parse(text)
                      const contentState = convertFromRaw(rawJson)
                      editorState = EditorState.createWithContent(contentState)
                    }
                    catch (e) {
                      console.log('fail whale')
                      editorState = EditorState.createEmpty()
                      // const raw = convertToRaw(editorState.getCurrentContent())
                      // const rawStr = JSON.stringify(raw)
                      // const rawJson = JSON.parse(rawStr)
                      // const unRaw = convertFromRaw(rawJson)
                      // editorState = EditorState.createWithContent(unRaw)
                    }
            
                    const onChange = 
                            editorState => { 
                                const json = convertToRaw(editorState.getCurrentContent())
                                const text = JSON.stringify(json)
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