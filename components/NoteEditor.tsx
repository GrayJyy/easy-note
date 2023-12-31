'use client'

import React, { useMemo, useReducer } from 'react'
import { useFormState } from 'react-dom'
import { deleteNote, saveNote } from '../app/actions/actions'
import NotePreview from './NotePreview'
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'
import { FormStat } from '@/types'

type Props = {
  noteId: string | null
  initialTitle: string
  initialBody: string
}

type InitialState = { title: string; body: string }

const initialState: InitialState = { title: '', body: '' }
const init = ({ title, body }: InitialState): InitialState => {
  return { title: title, body: body }
}

const reducer = (state: InitialState, action: { type: 'add'; payload: InitialState }): InitialState => {
  switch (action.type) {
    case 'add':
      return {
        title: action.payload.title,
        body: action.payload.body,
      }

    default:
      throw new Error('Invalid action type')
  }
}

const NoteEditor = ({ noteId, initialTitle, initialBody }: Props) => {
  const [saveState, saveFormAction] = useFormState<FormStat, FormData>(saveNote, { success: false, message: '' })
  const [delState, delFormAction] = useFormState<void, FormData>(deleteNote, undefined)
  const isDraft = useMemo(() => noteId === null, [noteId])
  const [state, dispatch] = useReducer(reducer, initialState, () => init({ title: initialTitle, body: initialBody }))
  const { title, body } = state

  return (
    <div className='note-editor'>
      <form className='note-editor-form' autoComplete='off'>
        <div className='note-editor-menu' role='menubar'>
          <input type='hidden' name='noteId' value={noteId || ''} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className='note-editor-menu'>{saveState?.message}</div>
        <label className='offscreen' htmlFor='note-title-input'>
          Enter a title for your note
        </label>
        <input
          id='note-title-input'
          type='text'
          name='title'
          value={title}
          onChange={e => dispatch({ type: 'add', payload: { title: e.target.value, body } })}
        />
        <label className='offscreen' htmlFor='note-body-input'>
          Enter the body for your note
        </label>
        <textarea
          name='body'
          value={body}
          id='note-body-input'
          onChange={e => dispatch({ type: 'add', payload: { title, body: e.target.value } })}
        />
      </form>
      <div className='note-editor-preview'>
        <div className='label label--preview' role='status'>
          Preview
        </div>
        <h1 className='note-title'>{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}

export default NoteEditor
