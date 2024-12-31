import vine from '@vinejs/vine'

export const CreateUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const result = await db.from('users').select('email').where('email', value).first()
        return result ? false : true
      }),

    password: vine
      .string()
      .confirmed({ confirmationField: 'confirm_password' })
      .minLength(8)
      .maxLength(16),
  })
)
