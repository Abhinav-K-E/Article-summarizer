import React from 'react'

import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center 
    flex-col items-center'>
        <nav className='mb-4 flex justify-between items-center 
         h-full w-full pt-3'>
            <h1 className='font-bold text-3xl logo'>
                Sum..
            </h1>

            <button 
            type='submit'
            onClick={() => window.open('https://github.com/Abhinav-K-E')}
            className='black_btn'>
                Github
            </button>
        </nav>

        <h1 className='head_text mb-8'>
            Summarize Article with the power of 
            <span className='orange_gradient ml-3'>AI</span>
        </h1>
        <h2 className='desc'>
            Simplify your reading with Summize, an open-source article summarizer
            that transforms lengthy articles into clear and concise summaries
        </h2>
    </header>
  )
}

export default Hero