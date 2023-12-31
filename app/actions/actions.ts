'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis'
import { revalidatePath } from 'next/cache'
import { ZodIssue, z } from 'zod'

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, 'Please enter content').max(500, 'Content is too long'),
})
export async function saveNote(
  previousState: { success: boolean; message: string; errors: ZodIssue[] },
  formData: FormData
) {
  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  })
  const noteId = formData.get('noteId')
  const validated = schema.safeParse(JSON.parse(data))
  if (!validated.success) return { errors: validated.error.issues, success: false, message: 'Validation Error' }

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
