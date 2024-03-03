import React from 'react'
import Link from 'next/link'
//ui
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

//icons
import { ChevronLeftCircle } from 'lucide-react';

const InternationalLoadsPage = () => {
  return (
    <section className='flex flex-col space-y-8'>
      <div className='flex flex-row items-center space-x-4'>
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={'/loads'}>
            <ChevronLeftCircle size={30} />
          </Link>
        </Button>
        <h1 className='text-lg font-semibold'>
          Embarques Internacional
        </h1>
      </div>

      <section className=''>

        content international

      </section>

    </section>
  )
}

export default InternationalLoadsPage