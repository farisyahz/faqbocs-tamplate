
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {useState} from 'react';
import {RxDragHandleDots2} from 'react-icons/rx'
import {CiTrash, CiEdit} from 'react-icons/ci'
import {FiCheck} from 'react-icons/fi'
import parse from 'html-react-parser'

export default function SortableItem({id, q, a, handleDelete}:{id:number, q:string, a:string, handleDelete:(id:number)=>void}){

  function animateLayoutChanges(args:any) {
    const {isSorting, wasDragging} = args;
  
    if (isSorting || wasDragging) {
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
  } = useSortable({animateLayoutChanges, id:id })

  const style = {
    transition,
    transform : CSS.Translate.toString(transform),
    
  }

  const [showAnswer, setShowAnswer] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [edit, setEdit] = useState(false);

  return(
    <div ref={setNodeRef} style={style} className="touch-none" {...attributes} {...listeners}>
      {!edit && (
        <div className="font-poppins cursor-default w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-t-lg flex mt-3 transition duration-300 group">
          <span className="w-10 flex cursor-grab active:cursor-grabbing">
          <RxDragHandleDots2 className="text-lg m-auto"/>
          </span>
          <div className="w-full p-3">
            <div className=" font-semibold mb-1">{q}</div>
            {showAnswer && <div className="text-sm relative break-words">{parse(a)}</div>}
          </div>
        </div>
      )}
      {edit && (
        <div className="font-poppins cursor-default w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-t-lg flex mt-3 transition duration-300 group">
          <div className="w-full p-5">
            <div>This is being edited</div>
          </div>
        </div>
      )}
      {deleteConfirm && (
        <div className={`bg-white cursor-default flex flex-wrap font-poppins text-sm justify-center items-center gap-2 py-2 border-b-[1px] border-b-gray-200 overflow-hidden  transition duration-500`}>
          <p>Delete this forever?</p> 
          <button className="bg-gray-100 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition" onClick={() => setDeleteConfirm(false)}>Cancel</button>
          <button className="bg-red-100 py-2 px-3 hover:bg-red-500 hover:text-white rounded-full text-red-600 transition" onClick={() => handleDelete(id)}>Delete</button>
        </div>
      )}

      {edit && (
        <div className="bg-white cursor-default rounded-b-lg px-5 py-3 flex gap-2 font-poppins text-sm justify-center">
          <button className="bg-gray-100 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition" onClick={() => setEdit(false)}>Cancel</button>
          <button className="py-2 px-3 relative text-sm rounded-full transition bg-blue-100 text-blue-800 hover:bg-blue-600 hover:text-white flex items-center gap-1"
            onClick={() => setEdit(false)}
          >Submit<FiCheck className="text-lg"/><div className="absolute top-0 left-0 z-10 w-full h-full"></div></button>
        </div>
      )}

      {!edit && (
        <div className="bg-white cursor-default rounded-b-lg pl-12 py-2 flex gap-2 font-poppins">
          <button className="py-1 px-2 text-sm rounded-md transition bg-gray-100 font-normal" 
          onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>

          <button className="py-1 px-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"
            onClick={() => {setEdit(true);setDeleteConfirm(false)}}
          ><CiEdit className="text-xl"/><div className="absolute top-0 left-0 z-10 w-full h-full"></div></button>

          <button className="py-1 px-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold" onClick={() => setDeleteConfirm(!deleteConfirm)}><CiTrash className="text-xl"/><div className="absolute top-0 left-0 z-10 w-full h-full"></div></button>
        </div>
      )}
    </div>
  )
}