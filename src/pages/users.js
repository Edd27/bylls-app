import Layout from '@/components/Layout'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import PropTypes from 'prop-types'
import Table from '@/components/Table'

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const permissions = session.user.role.permissions

  if (!permissions.includes('READ.USERS')) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const users = await prisma.user.findMany({
    include: {
      role: true
    }
  })

  return {
    props: {
      users: JSON.parse(JSON.stringify(users))
    }
  }
}

const Users = ({ users = [] }) => {
  return (
    <Layout>
      <div className="mx-auto mb-20">
        <h2 className="font-bold text-xl my-5">Usuarios</h2>
        <Table
          titles={['nombre', 'email', 'teléfono', 'rol']}
          rows={users.map((user) => ({
            id: user.id,
            cells: [user.name, user.email, user.phone, user.role.name]
          }))}
        />
      </div>
    </Layout>
  )
}

Users.propTypes = {
  users: PropTypes.array
}

export default Users
