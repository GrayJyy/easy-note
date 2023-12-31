import React from 'react'

type Props = {}

const NoteListSkeleton = (props: Props) => {
  return (
    <div>
      <ul className='notes-list skeleton-container'>
        <li className='v-stack'>
          <div className='sidebar-note-list-item skeleton' style={{ height: '5em' }} />
        </li>
        <li className='v-stack'>
          <div className='sidebar-note-list-item skeleton' style={{ height: '5em' }} />
        </li>
        <li className='v-stack'>
          <div className='sidebar-note-list-item skeleton' style={{ height: '5em' }} />
        </li>
      </ul>
    </div>
  )
}

export default NoteListSkeleton
