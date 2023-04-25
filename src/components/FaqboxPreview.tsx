import Image from "next/image"
import logo from "../assets/round-logo-light.png"
import {BiSearch} from 'react-icons/bi'
import {useState, useEffect} from 'react'
import AccordionItem from "./AccordionItem"
import PopupQuestion from "./PopupQuestion"
import parse from 'html-react-parser' 

type Props = {
  data : {id:number, q:string, a:string}[]
}
export default function({data}:Props){
  
  const [search, setSearch] = useState("");
  const [dataSearched, setDataSearched] = useState<{id: number, q: string, a: string}[]>(data);

  const handleSearch = (e:any) => {
    setSearch(e.target.value);
    setDataSearched(data.filter((faq)=>faq.q.toLowerCase().includes(search.toLowerCase())))
  }

  useEffect(()=>{
    setDataSearched(data)
  },[data])


  return(
    <div className="flex flex-col w-[400px] min-h-[850px] absolute  origin-top-left scale-[0.625] align-middle sm:max-w-md justify-between py-16 px-10 mx-auto bg-white">
      <div className="mx-auto flex flex-col items-center">
        <div className=" w-36 h-36 shadow-md rounded-full relative z-0">
          <Image
            src={logo}
            fill
            alt=""
            className="m-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mt-5">Faqbocs.com</h1>
        <div className={`bg-gray-100  transitions duration-300  text-sm rounded-full font-poppins px-5 py-3  mt-3  max-w-md  flex justify-between gap-3 items-center w-full`}>
          <BiSearch className="text-xl"/>
          <input id="search" type="text" className=" w-full transitions duration-300  outline-none bg-transparent " placeholder="Search..."
          autoComplete='off' 
          value={search}
          onChange={handleSearch}/>
        </div>
        
        <button className="bg-slate-900 text-slate-50 rounded-full w-full py-2 px-5 mt-3 font-semibold hover:bg-slate-700">More question?</button>
        <section>
          {
            dataSearched.map((faq) => (<AccordionItem key={faq.id} question={faq.q} answer={parse(faq.a)}/>))
          }
      </section>
      </div>
    </div>
    
  )
}