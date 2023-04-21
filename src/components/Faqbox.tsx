import Image from "next/image"
import logo from "../assets/faqbocs-logo.png"
import {BiSearch} from 'react-icons/bi'
import {useState} from 'react'
import AccordionItem from "./AccordionItem"
import PopupQuestion from "./PopupQuestion"

export default function(){
  const data = [
    {
      id:1,
      q:"Siapa nama saya?",
      a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus sit qui beatae obcaecati laborum fugit itaque atque illo quaerat labore."
    },
    {
      id:2,
      q:"Apa hobi saya?",
      a:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus sit qui beatae obcaecati laborum fugit itaque atque illo quaerat labore."
    },
    {
      id:3,
      q:"Apa pelajaran kesukaan saya ?",
      a:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus sit qui beatae obcaecati laborum fugit itaque atque illo quaerat labore."
    },
    {
      id:4,
      q:"Apakah saya sudah punya pacar ?",
      a:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus sit qui beatae obcaecati laborum fugit itaque atque illo quaerat labore."
    }
  ]
  const [search, setSearch] = useState("");
  const [dataSearched, setDataSearched] = useState<{id: number, q: string, a: string}[]>(data);
  const [pop, setPop] = useState(false);

  const handleSearch = (e:any) => {
    setSearch(e.target.value);
    setDataSearched(data.filter((faq)=>faq.q.toLowerCase().includes(search.toLowerCase())))
  }


  return(
    <>
      {pop && <PopupQuestion setPop={setPop}/>}
      <div className="flex flex-col min-h-[100vh] align-middle sm:max-w-md justify-between py-16 px-10 mx-auto">
        <div className="mx-auto flex flex-col items-center">
          <div className="bg-[#f4f4f4] w-36 h-36 shadow-md rounded-full flex relative">
            <Image
              src={logo}
              height={100}
              width={100}
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
          
          <button className="bg-slate-900 text-slate-50 rounded-full w-full py-2 px-5 mt-3 font-semibold hover:bg-slate-700" onClick={() => setPop(true)}>Question?</button>
          <section>
            {
              dataSearched.map((faq) => (<AccordionItem key={faq.id} question={faq.q} answer={faq.a}/>))
            }
        </section>
        </div>
      </div>
    </>
    
  )
}