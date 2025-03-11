import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card"

import { features } from '../../data/features'


function Features() {
    return (
        <div className='mt-10'>
            <h1 className='text-center font-bold  text-3xl md:text-5xl'>Powerful features for you <span className='text-purple-500'>Career</span>Growth</h1>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-3 place-content-center'>

                {
                    features.map((item, index) => (
                        <Card key={index} className='h-[15rem]  bg-transparent text-white border-hidden hover:border-solid hover:border-white backdrop-filter '>
                            <CardHeader>
                                <CardTitle >{item.icon}</CardTitle>
                                <CardDescription>{item.title}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                           
                        </Card>

                    ))
                }
            </div>
        </div>
    )
}

export default Features

