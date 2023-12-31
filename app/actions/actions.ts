'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis'
import { revalidatePath } from 'next/cache'

export async function saveNote(previousState: { success: boolean; message: string }, formData: FormData) {
  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  })
  const noteId = formData.get('noteId')

  if (noteId) {
    await updateNote(noteId, data)
    revalidatePath('/', 'layout')
  } else {
    await addNote(data)
    revalidatePath('/', 'layout')
  }

  previousState.success = true
  previousState.message = 'Save Success!'
  return previousState
}

export async function deleteNote(_: void, formData: FormData) {
  const noteId = formData.get('noteId')
  delNote(noteId)
  revalidatePath('/', 'layout')
  redirect('/')
}
