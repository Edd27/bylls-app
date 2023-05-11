import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  const permissions = session.user.role.permissions

  if (!permissions.includes('CREATE.SERVICES')) {
    return res.status(401).json({ message: 'Unauthorized.' })
  }

  if (req.method === 'POST') {
    try {
      const {
        name,
        price,
        cost,
        paymentDay,
        maxUsers,
        description,
        instructions,
        username,
        password
      } = req.body

      const service = await prisma.service.create({
        data: {
          name,
          price,
          cost,
          paymentDay,
          maxUsers,
          description,
          instructions,
          username,
          password
        }
      })

      res.status(200).json(service)
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` })
  }
}

export default handler
