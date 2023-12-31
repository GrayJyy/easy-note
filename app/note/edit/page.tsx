import React from 'react'
import NoteEditor from '@/components/NoteEditor'

const Page = async () => {
  return <NoteEditor noteId={null} initialTitle='Untitled' initialBody='' />
}

export default Page
