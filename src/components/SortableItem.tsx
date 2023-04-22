
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react';
import {RxDragHandleDots2} from 'react-icons/rx'
import {CiTrash, CiEdit} from 'react-icons/ci'

export default function SortableItem({id, q, a}:{id:number, q:string, a:string}){
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id:id, data:{qna:{id:id, q:q, a:a}}})

  const style = {
    transform : CSS.Translate.toString(transform),
    transition
  }

  const [showAnswer, setShowAnswer] = useState(false);

  return(
    <div ref={setNodeRef} style={style} className="touch-none" {...attributes} {...listeners}>
      <div className="font-poppins w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-t-lg flex mt-3 transition duration-300 group">
        <span className="w-10 flex cursor-grab active:cursor-grabbing">
         <RxDragHandleDots2 className="text-lg m-auto"/>
        </span>
        <div className="w-full p-3">
          <div className=" font-semibold mb-1">{q}</div>
          {showAnswer && <div>{a}</div>}
          
        </div>
      </div>
      <div className="bg-white rounded-b-lg pl-12 py-2 flex gap-2 ">
        <button className="py-1 px-2 text-sm rounded-md transition bg-gray-100 font-normal" 
        onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>
        <button className="py-1 px-2  text-sm rounded-md transition hover:bg-gray-100 font-semibold"><CiEdit className="text-xl"/></button>
        <button className="py-1 px-2 text-sm rounded-md transition hover:bg-gray-100 font-semibold"><CiTrash className="text-xl"/></button>
      </div>

      
    </div>
  
    
  )
}