import { Modal } from '@/components'
import axios, { AxiosRequestConfig } from 'axios'
import { useState } from 'react'

type RequestProps = {
  onSuccess?: (data) => void
} & AxiosRequestConfig

const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: true,
})

export const useFetch = () => {
  const [errors, setErrors] = useState(null)

  const doRequest = async ({ onSuccess, ...props }: RequestProps) => {
    try {
      setErrors(null)
      const response = await instance(props)

      if (onSuccess) {
        onSuccess(response.data)
      }

      return response.data
    } catch (err) {
      Modal.alert(err.response.data.message)
      setErrors(err.response.data)
      return err.response.data
    }
  }

  return { doRequest, errors }
}
