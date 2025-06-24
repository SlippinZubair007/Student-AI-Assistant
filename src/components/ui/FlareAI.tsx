import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div >
        <Image
          src="/FlareAI.png"
          alt="Flare AI Assistant"
          width={400}
          height={60}
          className="rounded-full shadow-lg"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
  )
}

export default Header
