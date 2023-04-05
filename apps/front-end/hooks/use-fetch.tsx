import { Modal } from '@/components'
import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useState } from 'react'

type RequestProps = {
  onSuccess?: (data) => void
  delayLoading?: boolean
} & AxiosRequestConfig

const instance = axios.create({
  baseURL: process.env.NX_BASE_URL_CLIENT
    ? `${process.env.NX_BASE_URL_CLIENT}/api`
    : '/api',
  withCredentials: true,
})

type Props = () => {
  doRequest: (request: RequestProps) => Promise<any>
  loading: boolean
  errors: string[]
}
export const useFetch: Props = () => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [])

  const doRequest = useCallback(
    async ({ onSuccess, delayLoading, ...props }: RequestProps) => {
      setLoading(true)

      try {
        setErrors(null)
        const response = await instance(props)
        if (onSuccess) {
          onSuccess(response.data)
        }

        return response.data
      } catch (err) {
        // server side throw error
        if (err.response.data.message) {
          Modal.alert(err.response.data)
          setErrors(err.response.data)
          return err.response.data
        }
      } finally {
        if (delayLoading) {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        } else {
          setLoading(false)
        }
      }
    },
    []
  )

  return { doRequest, errors, loading }
}
