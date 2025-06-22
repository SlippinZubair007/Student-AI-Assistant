import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div className="absolute flex mt-2 right-0">
      <Image
      src="/FlareAI.png"
      alt="Flare AI Assistant"
      width={500}
      height={60}
      />

    </div>
  )
}

export default Header
