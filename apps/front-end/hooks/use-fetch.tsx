import { Modal } from '@/components'
import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useState } from 'react'

type RequestProps = {
  onSuccess?: (data) => void
} & AxiosRequestConfig

const instance = axios.create({
  baseURL: process.env.NX_BASE_URL_CLIENT,
  withCredentials: true,
})

export const useFetch = () => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  console.log(process.env.NX_BASE_URL_CLIENT)
  const doRequest = useCallback(
    async ({ onSuccess, ...props }: RequestProps) => {
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
          // client side throw error
        } else {
          debugger
        }
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    },
    []
  )

  return { doRequest, errors, loading }
}
