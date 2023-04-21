
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react';
import {RxDragHandleDots2} from 'react-icons/Rx'

export default function SortableItem({id, q, a}:{id:number, q:string, a:string}){
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id:id, data:{qna:{id:id, q:q, a:a}}})

  const style = {
    transform : CSS.Transform.toString(transform),
    transition
  }

  const [showAnswer, setShowAnswer] = useState(false);

  return(
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="font-poppins w-full border-2 border-slate-900 bg-white rounded-lg flex mt-3">
        <span className="w-10 flex">
         <RxDragHandleDots2 className="text-2xl m-auto"/>
        </span>
        <div className="w-full p-3">
          <div className="text-lg font-bold ">{q}</div>
          <button className="py-2 px-3 m-1 bg-gray-100 font-semibold" 
          onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>
          {showAnswer && <p >{a}</p>}
        </div>
        
      </div>
      
    </div>
  
    
  )
}