import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Input, Button, Modal } from '@/components'
import { useFetch } from '@/hooks'
import { useRouter } from 'next/router'
import { GlobalContext } from '../_app'
import { useContext } from 'react'
import Link from 'next/link'

type FormValues = {
  email: string
  password: string
}

const schema: yup.ObjectSchema<FormValues> = yup.object().shape({
  email: yup.string().required('必填').email('請輸入有效email'),
  password: yup.string().required('必填'),
})

const Signup = () => {
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
      url: '/auth/signup',
      data: {
        email: data.email,
        password: data.password,
      },
      method: 'post',
      onSuccess: (currentUser) => {
        Modal.alert('註冊成功', () => {
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
      <div className="w-full max-w-3xl space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            註冊
          </h2>
        </div>
        <div className="flex gap-12 items-center">
          <div className="hidden lg:block flex-1">
            <Image
              src="/empty.png"
              alt="Signup"
              width={1200}
              height={1200}
              className="flex-1"
            />
          </div>
          <form className="space-y-6 flex-1" onSubmit={onSubmit}>
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

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <span className="text-black">已經有帳號？</span>
                <Link
                  href="/login"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  登入
                </Link>
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
                註冊
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      pageTitle: '註冊',
    },
  }
}

export default Signup
