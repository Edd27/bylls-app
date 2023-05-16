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

  if (!permissions.includes('READ.ROLES')) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const roles = await prisma.role.findMany({
    include: {
      permissions: {
        include: {
          operation: {
            include: {
              module: true
            }
          }
        }
      }
    }
  })

  return {
    props: {
      roles: JSON.parse(JSON.stringify(roles))
    }
  }
}

const Roles = ({ roles = [] }) => {
  return (
    <Layout>
      <div className="mx-auto mb-20">
        <h2 className="font-bold text-xl my-5">Roles</h2>
        <Table
          titles={['nombre', 'permisos']}
          rows={roles.map((role) => ({
            id: role.id,
            cells: [
              role.name,
              `${role.permissions
                .map((p) =>
                  `${p.operation.name}:${p.operation.module.name}`.toUpperCase()
                )
                .join(', ')}`
            ]
          }))}
        />
      </div>
    </Layout>
  )
}

Roles.propTypes = {
  roles: PropTypes.array
}

export default Roles
