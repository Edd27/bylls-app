// import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { readFileSync } from 'fs'
import path from 'path'
import GoogleProvider from 'next-auth/providers/google'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  },
  secure: false
})

const emailsDir = path.resolve(process.cwd(), 'src/emails')

const sendVerificationRequest = async ({ identifier, url }) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8'
  })
  const emailTemplate = Handlebars.compile(emailFile)
  await transporter.sendMail({
    from: `"Bylls" ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Tu enlace de acceso a Bylls',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier
    })
  })
}

const sendWelcomeEmail = async ({ user }) => {
  const { email } = user

  try {
    const userRole = await prisma.role.findUnique({
      where: { name: 'Usuario' }
    })

    await prisma.user.update({
      where: { id: user.id },
      data: {
        roleId: userRole.id
      }
    })

    const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
      encoding: 'utf8'
    })

    const emailTemplate = Handlebars.compile(emailFile)

    await transporter.sendMail({
      from: `"Bylls" ${process.env.EMAIL_FROM}`,
      to: email,
      subject: 'Bienvenido a Bylls! 🎉',
      html: emailTemplate({
        base_url: process.env.NEXTAUTH_URL,
        support_email: 'contacto@edgarbenavides.dev'
      })
    })
  } catch (error) {
    console.log(
      `❌ No se pudo enviar el correo electrónico al usuario (${email})`
    )
  }
}

const PrismaAdapter = (p) => {
  return {
    createUser: (data) => p.user.create({ data }),
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
    getUserByAccount: async (providerProviderAccountId) => {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId: providerProviderAccountId },
        select: { user: true }
      })
      return account?.user ?? null
    },
    updateUser: (data) => p.user.update({ where: { id: data.id }, data }),
    deleteUser: (id) => p.user.delete({ where: { id } }),
    linkAccount: (data) => p.account.create({ data }),
    unlinkAccount: (providerProviderAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId: providerProviderAccountId }
      }),
    getSessionAndUser: async (sessionToken) => {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              createdAt: true,
              updatedAt: true,
              emailVerified: true,
              phone: true,
              role: {
                select: {
                  id: true,
                  name: true,
                  permissions: {
                    select: {
                      operation: {
                        select: {
                          code: true,
                          module: {
                            select: {
                              code: true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              subscriptions: true
            }
          }
        }
      })
      if (!userAndSession) return null
      const { user, ...session } = userAndSession
      const userSanitized = {
        ...user,
        role: {
          ...user.role,
          permissions: user.role.permissions.map(
            (permission) =>
              `${permission.operation.code}.${permission.operation.module.code}`
          )
        }
      }
      return { user: userSanitized, session }
    },
    createSession: (data) => p.session.create({ data }),
    updateSession: (data) =>
      p.session.update({ data, where: { sessionToken: data.sessionToken } }),
    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
    createVerificationToken: (data) => p.verificationToken.create({ data }),
    useVerificationToken: async (identifierToken) => {
      try {
        return await p.verificationToken.delete({
          where: { identifier_token: identifierToken }
        })
      } catch (error) {
        if (error.code === 'P2025') {
          return null
        }
        throw error
      }
    }
  }
}

export const authOptions = {
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/'
  },
  providers: [
    EmailProvider({
      maxAge: 10 * 60,
      sendVerificationRequest
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  events: { createUser: sendWelcomeEmail },
  callbacks: {
    session: ({ session, user, token }) => {
      session.user = user
      session.token = token
      return session
    }
  }
}

export default NextAuth(authOptions)
