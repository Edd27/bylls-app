import Head from 'next/head'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import { useState } from 'react'
import AuthModal from './AuthModal'
import { useSession } from 'next-auth/react'

const Layout = ({ children = null }) => {
  const [showModal, setShowModal] = useState(false)

  const { data: session, status } = useSession()

  const user = session?.user

  const isLoadingUser = status === 'loading'

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      <Head>
        <title>Bylls</title>
        <meta name="title" content="Servicios de streaming en familia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col relative text-gray-700">
        <Navbar
          openModal={openModal}
          isLoadingUser={isLoadingUser}
          user={user}
        />
        <main className="pt-16 pb-4 px-4 md:px-24">
          {typeof children === 'function' ? children(openModal) : children}
        </main>
        <AuthModal show={showModal} onClose={closeModal} />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

export default Layout
