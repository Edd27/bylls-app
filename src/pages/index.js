import Layout from '@/components/Layout'
import PropTypes from 'prop-types'
import { prisma } from '@/lib/prisma'
import ServiceCard from '@/components/ServiceCard'

export const getServerSideProps = async () => {
  const services = await prisma.service.findMany({
    where: {
      status: true
    },
    include: {
      profiles: true
    }
  })

  return {
    props: {
      services: JSON.parse(JSON.stringify(services))
    }
  }
}

const Home = ({ services = [] }) => {
  return (
    <Layout>
      <h2 className="font-bold text-xl my-5">
        Todos los servicios disponibles
      </h2>
      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </Layout>
  )
}

Home.propTypes = {
  services: PropTypes.array
}

export default Home
