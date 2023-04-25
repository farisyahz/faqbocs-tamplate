
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState} from 'react';
import {RxDragHandleDots2} from 'react-icons/rx'
import {CiTrash, CiEdit} from 'react-icons/ci'
import {FiCheck} from 'react-icons/fi'
import parse from 'html-react-parser'
import TiptapEdit from "./TiptapEdit";

type ItemProps = {
  data : {id:number, q:string, a:string}[],
  setData: React.Dispatch<React.SetStateAction<{id:number, q:string, a:string}[]>>
  id:number,
  q:string,
  a:string,
  handleDelete:(id:number)=>void
}

export default function SortableItem({data, setData, id, q, a, handleDelete}:ItemProps){

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
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({animateLayoutChanges, id:id })

  const style = {
    transition,
    transform : CSS.Translate.toString(transform),
    
  }

  const [showAnswer, setShowAnswer] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newAnswer, setNewAnswer] = useState(a);
  const [newQuestion, setNewQuestion] = useState(q);

  const handleSubmitEdit = (id:number) => {
    setData(data.map((item) => item.id === id ? {...item, q:newQuestion, a:newAnswer} : {...item}))
  }

  const handleCancelEdit = () => {
    setNewAnswer(a);
    setNewQuestion(q);
  }

  return(
    <div ref={setNodeRef} style={style}  {...attributes} >
      {!edit && (
        <div className="font-poppins cursor-default w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-t-lg flex mt-3 transition duration-300 group">
          <span {...listeners} ref={setActivatorNodeRef} className="w-10 touch-none flex cursor-grab active:cursor-grabbing">
          <RxDragHandleDots2 className="text-lg m-auto"/>
          </span>
          <div className="w-full p-3">
            <div className=" font-semibold mb-1">{q}</div>
            {showAnswer && <div className="text-sm relative break-words">{parse(a)}</div>}
          </div>
        </div>
      )}
      
      {edit && (
        <div className="font-poppins cursor-default w-full bg-white/50 backdrop-blur-md border-[1px] border-gray-200 rounded-t-lg flex flex-col mt-3 group gap-2 p-5">
          <label htmlFor="question">Question : </label>
          <input type="text" name="question" id="question" className=" py-1 text-sm border-b-2 border-slate-300 bg-transparent focus:border-slate-800 outline-none w-full" 
          autoComplete="off" autoFocus 
          spellCheck="false" 
          placeholder="Question..." 
          value={newQuestion} 
          onChange={(e)=>{setNewQuestion(e.target.value);}}
          onKeyDown={(e) => {if(e.key === 'Enter') e.preventDefault()}}/>

          <label htmlFor="question" className="mt-2">Answer : </label>
          <TiptapEdit newAnswer={newAnswer} setNewAnswer={setNewAnswer} />
        </div>
      )}

      {deleteConfirm && (
        <div className={`bg-white cursor-default flex flex-wrap font-poppins text-sm justify-center items-center gap-2 py-2 border-t-[1px] border-t-gray-200 rounded-b-lg overflow-hidden  transition duration-500`}>
          <p>Delete this forever?</p> 
          <button className="bg-gray-100 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition" onClick={() => {setDeleteConfirm(false);setShowAnswer(true)}}>Cancel</button>
          <button className="bg-red-100 py-2 px-3 hover:bg-red-500 hover:text-white rounded-full text-red-600 transition" onClick={() => handleDelete(id)}>Delete</button>
        </div>
      )}

      {edit && (
        <div className="bg-white cursor-default rounded-b-lg px-5 py-3 flex gap-2 font-poppins text-sm justify-center">
          <button className="bg-gray-100 py-2 px-3 hover:bg-slate-900 hover:text-white rounded-full transition" onClick={() => {setEdit(false);handleCancelEdit()}}>Cancel</button>
          <button className="py-2 px-3 relative text-sm rounded-full transition bg-blue-100 text-blue-800 hover:bg-blue-600 hover:text-white flex items-center gap-1"
            onClick={() => {handleSubmitEdit(id);setEdit(false)}}
          >Submit<FiCheck className="text-lg"/></button>
        </div>
      )}

      {(!edit && !deleteConfirm) && (
        <div className="bg-white cursor-default rounded-b-lg pl-12 py-2 flex gap-2 font-poppins">
          <button className="py-1 px-2 text-sm rounded-md transition bg-gray-100 font-normal" 
          onClick={()=>setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>

          <button className="py-1 px-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold"
            onClick={() => {setEdit(true);setDeleteConfirm(false)}}
          ><CiEdit className="text-xl"/></button>

          <button className="py-1 px-2 relative text-sm rounded-md transition hover:bg-gray-100 font-semibold" onClick={() => {setDeleteConfirm(true);setShowAnswer(true)}}><CiTrash className="text-xl"/></button>
        </div>
      )}
    </div>
  )
}