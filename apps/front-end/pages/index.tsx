import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Button } from '@/components'
import './index.module.css'

const Index = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  return (
    <div
      className="bg-cover bg-center h-full py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521747116042-5a810fda9664')",
      }}
    >
      <div className="container mx-auto max-w-lg px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-10">
          即刻預定非凡旅程
        </h1>
        <form className="w-full mx-auto">
          <div className="flex flex-wrap flex-col -mx-3 mb-6 md:flex-row">
            <div className="md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                旅遊地點
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                value="台北"
                disabled
              />
            </div>
            <div className="md:w-1/2 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-start-date"
              >
                入住日期
              </label>
              <DatePicker
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update)
                }}
              />
            </div>
            <div className="px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-guests"
              >
                入住人數
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-guests"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 11l3-3 3 3h-6z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <Button variant="primary">搜尋</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
