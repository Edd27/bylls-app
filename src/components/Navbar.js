import LogoIcon from '@/icons/LogoIcon'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import UserIcon from '@/icons/UserIcon'
import Image from 'next/image'
import ChevronDownIcon from '@/icons/ChevronDownIcon'
import PlusIcon from '@/icons/PlusIcon'
import LogoutIcon from '@/icons/LogoutIcon'
import PropTypes from 'prop-types'
import { signOut } from 'next-auth/react'
import { Fragment } from 'react'

const menuItems = [
  {
    label: 'Nuevo servicio',
    icon: PlusIcon,
    href: '/services/create',
    permission: 'CREATE.SERVICES'
  },
  {
    label: 'Salir',
    icon: LogoutIcon,
    onClick: signOut,
    permission: null
  }
]

const Navbar = ({ openModal, isLoadingUser, user }) => {
  const permissions = user?.role?.permissions || []

  return (
    <nav className="w-full h-16 fixed border-b shadow top-0 left-0 bg-white z-50">
      <div className="h-full p-2 md:px-24 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 hover:scale-105 transition"
        >
          <LogoIcon className="shrink-0 w-8 h-8 text-orange-600 hover:text-orange-500" />
          <span className="text-xl font-semibold tracking-wide">Bylls</span>
        </Link>
        <div className="flex items-center space-x-4">
          {isLoadingUser && (
            <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
          )}
          {user && (
            <Menu as="div" className="relative z-50">
              <Menu.Button className="flex items-center space-x-px group">
                <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                  {user?.image && (
                    <Image
                      src={user?.image}
                      alt={user?.name || 'Avatar'}
                      fill
                    />
                  )}
                  {!user?.image && (
                    <UserIcon className="text-gray-400 w-6 h-6" />
                  )}
                </div>
                <ChevronDownIcon className="w-5 h-5 shrink-0 text-gray-500 group-hover:text-current" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-72 overflow-hidden mt-1 divide-y divide-gray-100 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="flex items-center space-x-2 py-4 px-4 mb-2">
                    <div className="shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9">
                      {user?.image && (
                        <Image
                          src={user?.image}
                          alt={user?.name || 'Avatar'}
                          fill
                        />
                      )}
                      {!user?.image && (
                        <UserIcon className="text-gray-400 w-6 h-6" />
                      )}
                    </div>
                    <div className="flex flex-col truncate">
                      <span>{user?.name}</span>
                      <span className="text-sm text-gray-500">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <div className="py-2">
                    {menuItems
                      .filter(
                        (el) =>
                          permissions.includes(el.permission) || !el.permission
                      )
                      .map(({ label, href, onClick, icon: Icon }) => (
                        <div
                          key={label}
                          className="px-2 last:border-t last:pt-2 last:mt-2"
                        >
                          <Menu.Item>
                            <>
                              {href && (
                                <Link
                                  href={href}
                                  className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                >
                                  <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                  <span>{label}</span>
                                </Link>
                              )}
                              {!href && (
                                <button
                                  className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                                  onClick={onClick}
                                >
                                  <Icon className="w-5 h-5 shrink-0 text-gray-500" />
                                  <span>{label}</span>
                                </button>
                              )}
                            </>
                          </Menu.Item>
                        </div>
                      ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
          {!user && (
            <button
              type="button"
              onClick={openModal}
              className="ml-4 px-4 py-1 rounded-md bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 text-white transition"
            >
              Ingresar
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  openModal: PropTypes.func.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  user: PropTypes.object
}

export default Navbar
