import { getNote } from '@/lib/redis'
import React from 'react'
import NoteEditor from '@/components/NoteEditor'

type Props = {
  params: { id: string | null }
}

const Page = async ({ params }: Props) => {
  const noteId = params.id
  const note = await getNote(noteId)

  const { title, content } = note

  if (note === null) {
    return (
      <div className='note--empty-state'>
        <span className='note-text--empty-state'>Click a note on the left to view something! 🥺</span>
      </div>
    )
  }

  return <NoteEditor noteId={noteId} initialTitle={title} initialBody={content} />
}

export default Page
