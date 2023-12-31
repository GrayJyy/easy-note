import Note from '@/components/Note'
import { getNote } from '@/lib/redis'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {
  const { id } = params
  const note = await getNote(id)

  if (note === null) {
    return (
      <div className='note--empty-state'>
        <span className='note-text--empty-state'>Click a note on the left to view something! 🥺</span>
      </div>
    )
  }
  return <Note noteId={id} note={note} />
}

export default Page
