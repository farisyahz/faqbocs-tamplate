
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react';
import {RxDragHandleDots2} from 'react-icons/rx'
import {CiTrash, CiEdit} from 'react-icons/ci'
import parse from 'html-react-parser'

export default function SortableItem({id, q, a, handleDelete}:{id:number, q:string, a:string, handleDelete:(id:number)=>void}){

  function animateLayoutChanges(args:any) {
    const {isSorting, wasSorting} = args;
  
    if (isSorting || wasSorting) {
      return defaultAnimateLayoutChanges(args);
    }
  
    return true;
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({animateLayoutChanges, id:id})

  const style = {
    transform : CSS.Translate.toString(transform),
    transition
  }

  const [showAnswer, setShowAnswer] = useState(false);

  return(
    <div ref={setNodeRef} style={style} className="touch-none" {...attributes} {...listeners}>
      <div className="font-poppins cursor-default w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-t-lg flex mt-3 transition duration-300 group">
        <span className="w-10 flex cursor-grab active:cursor-grabbing">
         <RxDragHandleDots2 className="text-lg m-auto"/>
        </span>
        <div className="w-full p-3">
          <div className=" font-semibold mb-1">{q}</div>
          {showAnswer && <div className="text-sm">{parse(a)}</div>}
        </div>
      </div>
      <div className="bg-white cursor-default rounded-b-lg pl-12 py-2 flex gap-2 ">
        <button className="py-1 px-2 text-sm rounded-md transition bg-gray-100 font-normal" 
        onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>
        <button className="py-1 px-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"><CiEdit className="text-xl"/><div className="absolute top-0 left-0 z-10 w-full h-full"></div></button>
        <button className="py-1 px-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold" onClick={() => handleDelete(id)}><CiTrash className="text-xl"/><div className="absolute top-0 left-0 z-10 w-full h-full"></div></button>
      </div>

      
    </div>
  
    
  )
}