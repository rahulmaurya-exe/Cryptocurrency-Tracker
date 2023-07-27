import React, { useState, useEffect, useRef } from 'react'
import CardSection from './Components/CardSection'
import ChartSection from './Components/ChartSection'
import initialData from './Data'
import Header from './Components/Header'

const App = () => {
  const [data, setData] = useState({ id: 'bitcoin', info: initialData })
  const [currency, setCurrency] = useState('inr')
  const fetchData = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/' + data.id)
    const jsonData = await res.json()
    setData((data) => ({ id: data.id, info: jsonData }))
    console.log('in fetch data ', data)
  }

  const handleSubmit = async (event) => {
    console.log(event.target.value)
    await setData({ id: event.target.value, info: data.info })
    fetchData()
  }
  const changeCurrency = async (event) => {
    await setCurrency(event.target.value)
    fetchData()
  }
  useEffect(() => {
    fetchData()
  }, [data.id])

  useEffect(() => {
    const interval = setInterval(() => fetchData(), 2000)
    return () => clearInterval(interval)
  }, [data.id])

  return (
    <div>
      <Header handleSubmit={handleSubmit} changeCurrency={changeCurrency} />
      <CardSection data={data} currency={currency} />
      <ChartSection data={data} currency={currency} />
    </div>
  )
}

export default App
