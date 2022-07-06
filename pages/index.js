import { useState } from "react";
import Head from 'next/head'
import Image from 'next/image'
import BaseLayout from '@layouts/Layout'
import { QuotesUI } from '@utils/Constants'
import { Oval } from  'react-loader-spinner'
import  quotes  from 'quotesy'

export default function Home(props) {
  const [author, setAuthor] = useState(props.data.author)
  const [tags, setTags] = useState(props.data.tags)
  const [quote, setQuote] = useState(props.data.text)
  const [buttonMessage, setButtonMessage] = useState("New Quote")
  
  const getQuotes = () => {

    try{
      setButtonMessage("Loading...");     
      setTimeout(() => {
	//Fetch quotes data from the quotesy json file
	const quote = quotes.random();
	setAuthor(quote.author);
        setQuote(quote.text);
        setTags(quote.tags);
        setButtonMessage("New quote");
      }, 1000);
    }catch{
      new Error("Load failed");
      console.log("Quotes loading failed");
    }
  }

  return (
    <>
   <Head>
     <title>QuotesUI - Inspiring Quotes from quotesy</title>
     <link rel="icon" href={QuotesUI.logo} />
     </Head>
     <BaseLayout>
    <div className="container py-4 mx-auto text-center">
      <div className="my-8 brand">
      <h1 className="text-3xl font-bold">Quotes<span className="text-green-500">UI</span></h1>
      </div>
<div className="max-w-md py-4 mx-auto px-8 bg-white shadow-lg rounded-lg my-20">
<div className="flex justify-center md:justify-end -mt-16">
    <Image alt={"Author"} width={128} height={128} className="w-40 h-40 rounded-full border-2 border-green-500" src={QuotesUI.logo}/>
</div>
<div>
  <h2 className="text-gray-800 m-4 text-2xl font-semibold">{author}</h2>
  {

  }<p className="mt-2 text-1xl italic text-gray-600">{quote}</p>
</div>
<div className="flex justify-end mt-4">
  <p className="text-1xl font-medium text-green-500"> {tags}</p>
</div>
<div className="flex justify-center text-center mx-auto">
{buttonMessage == "Loading..."? (
  <Oval className="loader text-green-500" height={28} width={28} />
): (
  <button className="quoteBtn text-1xl font-bold text-white p-3 m-4 bg-green-500  rounded focus:outline-none hover:bg-gray-800 transition duration-300 ease-in-out" onClick={getQuotes}>{buttonMessage}</button>
)

}
</div>
</div>
</div>
</BaseLayout>
</>
  )
}

export async function getStaticProps(){
 
  const data = await quotes.random()
  
  return{
    props : {data}
  }
}
