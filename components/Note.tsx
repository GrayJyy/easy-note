import React from 'react'
import EditButton from './EditButton'
import NotePreview from './NotePreview'
import dayjs from 'dayjs'

type Props = {
  noteId: string
  note: {
    title: string
    content: string
    updateTime: string
  }
}

const Note = ({ noteId, note }: Props) => {
  const { title, content, updateTime } = note
  return (
    <div className='note'>
      <div className='note-header'>
        <h1 className='note-title'>{title}</h1>
        <div className='note-menu' role='menubar'>
          <small className='note-updated-at' role='status'>
            Last updated on {dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview>{content}</NotePreview>
    </div>
  )
}

export default Note
