import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Input, Button, Modal } from '@/components'
import { useFetch } from '@/hooks'
import { useRouter } from 'next/router'
import { GlobalContext } from '../_app'
import { useContext } from 'react'

type FormValues = {
  email: string
  password: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  email: yup.string().required('必填').email('請輸入有效email'),
  password: yup.string().required('必填'),
})

const Login = () => {
  const router = useRouter()
  const { doRequest } = useFetch()
  const { setGlobalState } = useContext(GlobalContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })

  const onSubmit = handleSubmit(async (data) => {
    await doRequest({
      url: '/auth/signin',
      data: {
        email: data.email,
        password: data.password,
      },
      method: 'post',
      onSuccess: (currentUser) => {
        Modal.alert('登入成功', () => {
          setGlobalState({ currentUser })
          const returnUrl = router.query.returnUrl as string
          if (returnUrl) {
            router.push(returnUrl)
            return
          }
          router.push('/')
        })
      },
    })
  })

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            登入
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md">
            <Input
              name="email"
              label="Email"
              error={errors?.email}
              placeholder={'Email'}
              register={register('email')}
            />
            <Input
              name="password"
              type="password"
              error={errors?.password}
              label={'密碼'}
              placeholder="密碼"
              register={register('password')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                記住我
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                忘記密碼？
              </a>
            </div>
          </div>
          <div>
            <Button variant="primary" type="submit" fullWidth={true}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-sky-500 group-hover:text-sky-400"
                  aria-hidden="true"
                />
              </span>
              登入
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      pageTitle: '登入',
    },
  }
}

export default Login
