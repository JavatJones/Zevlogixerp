import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

//icons
import { ChevronLeftCircle } from 'lucide-react';
import { TfiWorld } from "react-icons/tfi";
import { GiMexico } from "react-icons/gi";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const data = [
  {
      id: 1,
      icon: <GiMexico />,
      name: "Nacional",
      route: "national"
  },
  {
      id: 2,
      icon: <TfiWorld />,
      name: "Internacional",
      route: "international"
  },
];


const LoadsPage = () => {
  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Embarques
        </h1>
      </div>

      <article className='container max-w-2xl grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10'>

        {data.map((data, index) => (
          <Link key={index} href={`/loads/${data.route}`} className='hover:scale-105 transition-all'>
            <Card className='flex flex-col items-center justify-center p-5 gap-3 drop-shadow-xl '>

              <div className='flex items-center justify-center'>
                <p className='text-5xl text-red-600'>{data.icon}</p>
              </div>

              <div className='flex flex-col items-center justify-center font-bold'>
                <span>{data.name}</span>
              </div>
            </Card>
          </Link>
        ))}

      </article>

    </section>
  )
}

export default LoadsPage