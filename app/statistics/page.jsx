import React from 'react'
import SalesChart from '../components/saleschart'
import SimpleRadarChart from '../components/SimpleRadarChart'
import BestSellerChart from '../components/bestSellerChart'

export default function Statistics() {
  return (
    <div className='min-h-dvh p-5 ml-[65]  md:ml-[220]'>
        <SalesChart/>
        <SimpleRadarChart/>
        <BestSellerChart/>
    </div>
  )
}
