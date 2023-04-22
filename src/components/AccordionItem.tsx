import {Collapse} from "react-collapse"
import {useState} from "react"
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export default function AccordionItem({question, answer}:any){
  const [open, setOpen] = useState(false);
  return(
    <div className="mt-3">
      <div className="rounded-3xl bg-gray-100 shadow-md">
        <div className={`px-5 py-3 flex justify-between items-center align-middle cursor-pointer gap-3`} onClick={() => setOpen(!open)}>
          <p className="font-poppins font-semibold">{question}</p>
          {open ? <AiOutlineMinus className="w-5"/> : <AiOutlinePlus className="w-5"/>}
        </div>
        <Collapse isOpened={open}>
          <div className="font-poppins pb-3 px-5 transition ">{answer}</div>
        </Collapse>
      </div>
      
    </div>
  )
}