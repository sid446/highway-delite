// components/Navbar.tsx
'use client'
import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onSearch?: (searchTerm: string) => void;
}

function Navbar({ onSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <nav className='w-full bg-[#F9F9F9] shadow-md'>
      <div className='flex justify-between items-center px-4 sm:px-8 lg:px-[124px] h-[87px]'>
        {/* Logo */}
        <div>
          <img className='w-[80px] sm:w-[100px]' src="/logo2.png" alt="Logo" />
        </div>

        {/* Desktop Search Bar */}
        <div className='hidden md:flex gap-2.5 items-center'>
          <input
            className='px-4 h-[42px] w-[340px] bg-[#EDEDED] rounded-sm text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD643]'
            placeholder="Search experiences"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={handleSearch}
            className='flex items-center justify-center w-[87px] h-[42px] text-[14px] bg-[#FFD643] text-[#161616] font-medium rounded-sm hover:bg-[#FFC700] transition-colors'
          >
            Search
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2'
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className='text-black' />
          ) : (
            <Menu size={24} className='text-black' />
          )}
        </button>
      </div>

      {/* Mobile Search Bar */}
      {isOpen && (
        <div className='md:hidden border-t border-gray-200 px-4 py-3 bg-white'>
          <div className='flex flex-col gap-2'>
            <input
              className='px-4 h-[42px] w-full bg-[#EDEDED] rounded-sm text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD643]'
              placeholder="Search experiences"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={handleSearch}
              className='w-full h-[42px] text-[14px] bg-[#FFD643] text-[#161616] font-medium rounded-sm hover:bg-[#FFC700] transition-colors'
            >
              Search
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar