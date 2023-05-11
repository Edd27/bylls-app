import Input from '@/components/Input'
import Layout from '@/components/Layout'
import { Form, Formik } from 'formik'
import { getServerSession } from 'next-auth'
import * as Yup from 'yup'
import { authOptions } from '../api/auth/[...nextauth]'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

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

  if (!permissions.includes('CREATE.SERVICES')) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const CreateService = () => {
  const [disabled, setDisabled] = useState(false)

  const router = useRouter()

  const initialValues = {
    name: '',
    price: '',
    cost: '',
    paymentDay: '',
    maxUsers: '',
    description: '',
    instructions: '',
    username: '',
    password: ''
  }

  const ServiceSchema = Yup.object().shape({
    name: Yup.string().trim().required('Este campo es requerido'),
    price: Yup.number().required('Este campo es requerido'),
    cost: Yup.number().required('Este campo es requerido'),
    paymentDay: Yup.number().required('Este campo es requerido'),
    maxUsers: Yup.number().required('Este campo es requerido'),
    description: Yup.string().trim().required('Este campo es requerido'),
    instructions: Yup.string().trim().required('Este campo es requerido'),
    username: Yup.string().trim().required('Este campo es requerido'),
    password: Yup.string().trim().required('Este campo es requerido')
  })

  const handleSubmit = async (values) => {
    let toastId
    try {
      setDisabled(true)
      toastId = toast.loading('Agregando servicio...')
      await axios.post('/api/services', values)
      toast.success('Agregado', { id: toastId })
      router.push('/')
    } catch (e) {
      toast.error('Algo salió mal, intenta de nuevo.', { id: toastId })
      setDisabled(false)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <Layout>
      <div className="mx-auto w-[50%] mb-20">
        <h2 className="font-bold text-xl my-5">Agregar nuevo servicio</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={ServiceSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grid gap-3">
              <Input
                id="name-add-service"
                label="Nombre"
                name="name"
                type="text"
                placeholder="Nombre del servicio"
                spellCheck={false}
              />
              <Input
                id="price-add-service"
                label="Precio"
                name="price"
                type="number"
                placeholder="Precio del servicio"
                spellCheck={false}
              />
              <Input
                id="cost-add-service"
                label="Costo"
                name="cost"
                type="number"
                placeholder="Costo del servicio"
                spellCheck={false}
              />
              <Input
                id="paymentday-add-service"
                label="Dia de pago"
                name="paymentDay"
                type="number"
                placeholder="Día de pago"
                spellCheck={false}
              />
              <Input
                id="maxusers-add-service"
                label="Maximo de usuarios"
                name="maxUsers"
                type="number"
                placeholder="Maximo de usuarios"
                spellCheck={false}
              />
              <Input
                id="description-add-service"
                label="Descripción"
                name="description"
                type="textarea"
                placeholder="Descripción del servicio"
                spellCheck={false}
              />
              <Input
                id="instructions-add-service"
                label="Instrucciones"
                name="instructions"
                type="textarea"
                placeholder="Instrucciones de uso"
                spellCheck={false}
              />
              <Input
                id="username-add-service"
                label="Nombre de usuario"
                name="username"
                type="text"
                placeholder="Usuario o correo de acceso al servicio"
                spellCheck={false}
              />
              <Input
                id="password-add-service"
                label="Contraseña"
                name="password"
                type="text"
                placeholder="Contraseña de acceso al servicio"
                spellCheck={false}
              />
              <button
                disabled={disabled}
                className="bg-orange-600 hover:bg-orange-500 transition text-white px-3 py-2 rounded-md"
              >
                {disabled ? 'Agregando...' : 'Agregar'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default CreateService
