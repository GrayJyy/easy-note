import React from 'react'
import dayjs from 'dayjs'
import SidebarNoteItemContent from './SidebarNoteItemContent'

type Props = {
  noteId: string
  note: {
    title: string
    content: string
    updateTime: string
  }
}

const SidebarNoteItem = ({ noteId, note }: Props) => {
  const { title, content, updateTime } = note
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={<p className='sidebar-note-excerpt'>{content.substring(0, 20) || <i>(No content)</i>}</p>}
    >
      <header className='sidebar-note-header'>
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
      </header>
    </SidebarNoteItemContent>
  )
}

export default SidebarNoteItem
