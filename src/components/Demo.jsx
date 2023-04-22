import React from 'react'

import { useState , useEffect } from 'react';

import {copy , linkIcon , loader ,tick} from '../assets';

import  { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {

    const [article , setArticle] = useState({
        url : '',
        summary : ''
    })

    // For History purpose
    const [allArticles , setAllArticles] =useState([]);

    useEffect(() =>{
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        )

        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage)
        }
    },[])

   // RTK lazy query
   const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    const handleSubmit = async(e) =>{
        // alert('ok');

        e.preventDefault();

        const {data} = await getSummary({articleUrl:article.url});

        if(data?.summary){
            const newArticle = {...article , summary:data.summary};
            const updatedArticle =  [newArticle , ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedArticle);

            console.log(newArticle);

            // save into localStorage
            localStorage.setItem('articles' ,JSON.stringify(updatedArticle))
        }
    }

    //copy

    const [copied , setCopied ] = useState();
    const handleCopy = (copyUrl)=>{
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);

        setTimeout(()=>setCopied(false) , 3000)
    }

  return (
    <section className='mt-16 w-full max-w-xl'>
    {/* search */}
    <div className='flex flex-col w-full
     gap-2'>
        <form className='relative
         flex justify-center items-center'
         onSubmit={handleSubmit}>
            <img src={linkIcon}
            alt='link'
            className='absolute left-0 my-2 
            ml-3 w-5' />

            <input
            type='url'
            placeholder='https://example.com'
            value={article.url}
            onChange={(e)=> setArticle({...article , url:e.target.value})}
            required
            className='url_input peer'
            />
            
            <button className='submit_btn peer-focus:border-grey-600'
            type='submit'>
                🚀
            </button>
        </form>

        {/* history of urls */}

        <div className='flex flex-col max-h-60
         overflow-y-auto'>
            {
                allArticles.map((item , index)=>(
                    <div key={`link-${index}`}
                    onClick={() => setArticle(item)}
                    className='link_card'
                    >
                        <div className='flex gap-2 items-center'>
                            <img src={copied === item.url ? text : copy} 
                            onClick={() => handleCopy(item.url)}
                            alt='copy'
                            className='w-4 h-4 object-contain'
                            />
                            <p
                            className='flex-1 font-satoshi text-blue-500
                             font-light text-sm trancate'
                            >{item.url}</p>
                        </div>
                    </div>
                ))
            }
        </div>


        {/* display results */}

        <div className='my-10 max-w-full flex justify-center
         items-center'>
            {
                (isFetching)?(
                    <img src={loader} alt='loader'
                    className='w-20 h-20 object-contain' />
                ): error?(
                    <p className='font-inter font-bold 
                    text-black text-center'>
                        Well,that wasn't supposed to happen
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ):(
                    article.summary&&(
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-satoshi font-bold
                             text-gray-900 text-xl'
                            >Article <span className='blue_gradient'>Summary</span>
                            </h2>
                            <div className='summary_box'>
                                <p
                                className='font-inter font-normal text-sm text-gray-900 '
                                >
                                    {article.summary}
                                </p>
                            </div>
                        </div>

                    )
                )
            }
        </div>
    </div>
    </section>
  )
}

export default Demo