import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="py-5 px-10 border-b flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-extrabold">
          <Link href="/">日報</Link>
        </h1>
      </div>
      <div>
        <nav className="text-sm font-midium">
          <Link href="/articles/new" className="bg-blue-400 hover:bg-blue-600 px-3 py-2 rounded-md">書く</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
