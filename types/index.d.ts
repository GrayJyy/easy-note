import { ZodIssue } from 'zod'
export type FormStat = {
  success: boolean
  message: string
  errors: ZodIssue[]
}
