import BusinessPlanIcon from '@/icons/BusinessPlanIcon'
import CalendarDollarIcon from '@/icons/CalendarDollarIcon'
import UsersIcon from '@/icons/UsersIcon'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import { Tooltip } from 'react-tooltip'

const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN'
})

const ServiceCard = ({ service }) => {
  const { data: session } = useSession()

  const showRegisterButton = !session?.user?.subscriptions?.some(
    (subscription) => subscription.serviceId === service.id
  )

  const canRegister = service.maxUsers - service.profiles.length > 0 && session

  return (
    <div className="border shadow rounded-lg overflow-hidden text-gray-700">
      <header className="flex items-center gap-3 h-fit border-b p-3 relative">
        <div>
          <Image
            src={
              service.image ||
              'https://zntkmbxcutbjufpjomxo.supabase.co/storage/v1/object/sign/bylls/brand-bilibili.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJieWxscy9icmFuZC1iaWxpYmlsaS5wbmciLCJpYXQiOjE2ODM3Njc5MjYsImV4cCI6MTcxNTMwMzkyNn0.ww4tsvcsZHVdZGnatD71yNqZxgu9meNO9Fwt1D3fDj8&t=2023-05-11T01%3A18%3A46.911Z'
            }
            alt={service.name}
            width={64}
            height={64}
            className="w-[64px] h-[64px] object-center object-cover rounded-full border border-orange-600"
          />
        </div>
        <div>
          <h2 className="font-bold text-orange-600 text-xl">{service.name}</h2>
          <p>{service.description}</p>
        </div>
        {showRegisterButton && canRegister && (
          <button className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-500 transition">
            Solicitar
          </button>
        )}
        {!showRegisterButton && (
          <>
            <span
              className="absolute top-2 right-2 text-orange-600 border border-orange-600 px-3 py-1 rounded-lg"
              data-tooltip-id={`${service.id}-tooltip`}
              data-tooltip-content="Ya estás suscrito a este servicio"
              data-tooltip-place="top"
            >
              Suscrito
            </span>
            <Tooltip
              id={`${service.id}-tooltip`}
              className="!bg-orange-600 !opacity-100 !z-40"
            />
          </>
        )}
      </header>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-lg items-center justify-center p-3 border-r w-full">
          <span>
            <BusinessPlanIcon />
          </span>
          <span className="text-orange-600">
            {formatter.format(service.price / service.maxUsers)} / mes
          </span>
        </div>
        <div
          className="flex gap-3 text-lg items-center justify-center p-3 border-r w-[40%]"
          data-tooltip-id={`${service.id}-payment-day-tooltip`}
          data-tooltip-content="El servicio se paga en este día de cada mes"
          data-tooltip-place="top"
        >
          <span>
            <CalendarDollarIcon />
          </span>
          <span className="text-orange-600">{service.paymentDay}</span>
        </div>
        <Tooltip
          id={`${service.id}-payment-day-tooltip`}
          className="!bg-orange-600 !opacity-100 !z-40"
        />
        <div
          className="flex gap-3 text-lg items-center justify-center p-3 w-[40%]"
          data-tooltip-id={`${service.id}-profiles-left-tooltip`}
          data-tooltip-content="Número de perfiles disponibles"
          data-tooltip-place="top"
        >
          <span>
            <UsersIcon />
          </span>
          <span className="text-orange-600">
            {service.maxUsers - service.profiles.length}
          </span>
        </div>
        <Tooltip
          id={`${service.id}-profiles-left-tooltip`}
          className="!bg-orange-600 !opacity-100 !z-40"
        />
      </div>
    </div>
  )
}

ServiceCard.propTypes = {
  service: PropTypes.object
}

export default ServiceCard
