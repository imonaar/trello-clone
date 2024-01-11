import React from 'react'

export default function Layout({children}:{children: React.ReactNode}) {
  return (
      <div className='h-full w-full flex flex-col items-center justify-center'>{children}</div>
  )
}
