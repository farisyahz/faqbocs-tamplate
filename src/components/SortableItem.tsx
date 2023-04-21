
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react';
import {RxDragHandleDots2} from 'react-icons/rx'

export default function SortableItem({id, q, a}:{id:number, q:string, a:string}){
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id:id, data:{qna:{id:id, q:q, a:a}}})

  const style = {
    transform : CSS.Transform.toString(transform),
    transition
  }

  const [showAnswer, setShowAnswer] = useState(false);

  return(
    <div ref={setNodeRef} style={style} className="touch-none" {...attributes} {...listeners}>
      <div className="font-poppins w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-lg flex mt-3">
        <span className="w-10 flex">
         <RxDragHandleDots2 className="text-2xl m-auto"/>
        </span>
        <div className="w-full p-3">
          <div className=" font-semibold mb-1">{q}</div>
          {showAnswer && <p>{a}</p>}
          <button className="py-1 px-2 mt-2 text-sm rounded-md bg-gray-100 font-semibold" 
          onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>
          
        </div>
        
      </div>
      
    </div>
  
    
  )
}