import React from 'react'
import { getAllNotes } from '@/lib/redis'
import SidebarNoteListFilter from './SidebarNoteListFilter'
import SidebarNoteItem from '@/components/SidebarNoteItem'
import SidebarNoteItemHeader from './SidebarNoteItemHeader'

const NoteList = async () => {
  const notes = await getAllNotes()

  const arr = Object.entries(notes)

  if (arr.length === 0) return <div className='notes-empty'>No notes created yet!</div>

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />,
        }
      })}
    />
  )
}

export default NoteList
