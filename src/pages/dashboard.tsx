import SortableItem from "@/components/SortableItem"
import { HiPlus } from 'react-icons/hi';
import { DndContext,
  closestCenter,
  useSensor,
  useSensors
  } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import {useState} from 'react'
import type { PointerEvent } from "react";
import { PointerSensor } from "@dnd-kit/core";



export default function Dashboard(){

  const [addQuestion, setAddQuestion] = useState(false);
  
  const [data, setData] = useState<{id:number, q:string, a:string}[]>([
    {
      id:1,
      q:"Siapa nama saya?",
      a:"Nama saya Faris Rafie Syahzani. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto reprehenderit porro magnam deleniti ad provident est autem totam? Enim, inventore."
    },
    {
      id:2,
      q:"Apa hobi saya",
      a:"Hobi saya adalah programming"
    },
    {
      id:3,
      q:"Apa pelajaran favorit saya?",
      a:"Pelajaran Favorite saya adalah Matematika, Fisika, dan komputer"
    },
  ])

  const handleDragEnd = (event:any) => {
    console.log("Drag");
    const {active, over} = event;

    if(active.id !== over.id){
      setData((items) => {
        const activeIndex = items.map(item => item.id).indexOf(active.id)
        const overIndex = items.map(item => item.id).indexOf(over.id)
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  class SmartPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: "onPointerDown" as any,
            handler: ({ nativeEvent: event }: PointerEvent) => {
                if (
                    !event.isPrimary ||
                    event.button !== 0 ||
                    isInteractiveElement(event.target as Element)
                ) {
                    return false;
                }
  
                return true;
            },
        },
    ];
  }
  
  function isInteractiveElement(element: Element | null) {
    const interactiveElements = [
        "button",
        "input",
        "textarea",
        "select",
        "option",
        "div"
    ];
    if (
        element?.tagName &&
        interactiveElements.includes(element.tagName.toLowerCase())
    ) {
        console.log(element.tagName)
        return true;
    }
  
    return false;
  }

  const sensors = [useSensor(SmartPointerSensor)];

  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const handleSumbit = () => {
    setAddQuestion(!addQuestion)
    setData([{id:(data.length+1), q:newQuestion, a:newAnswer}, ...data])
    setNewQuestion("")
    setNewAnswer("")
  }

  return(
    <div className="w-[100vw] h-[100vh] bg-sky-300">
      <div className="sm:max-w-lg w-[95%] mx-auto pt-10">
        <h1 className="font-poppins text-3xl font-semibold text-center">Dashboard</h1>

        {!addQuestion && <button className="bg-blue-600 mt-5 hover:bg-blue-500 flex justify-center items-center py-2 px-3 w-full transition font-poppins font-semibold gap-1 rounded-lg text-slate-50" onClick={() => setAddQuestion(!addQuestion)}><HiPlus className="text-xl"/>Add Question</button>}
        {addQuestion && (
          <form onSubmit={handleSumbit} className="w-full p-5 flex font-poppins flex-col backdrop-blur-md bg-white/50 border-[1px] border-gray-200 rounded-lg gap-2 mt-3">
            <label htmlFor="question">Question : </label>
            <input type="text" name="question" id="question" className=" px-2 py-1 text-sm border-b-2 border-slate-400 bg-slate-50/70 focus:border-slate-800 outline-none w-full" autoFocus placeholder="Question..." value={newQuestion} onChange={(e)=>{setNewQuestion(e.target.value);}}/>
            <label htmlFor="question">Answer : </label>
            <input type="text" name="answer" id="answer" className=" px-2 py-1 text-sm border-b-2 border-slate-400 bg-slate-50/70 focus:border-slate-800 outline-none w-full" placeholder="Answer..."
            value={newAnswer} onChange={(e)=>setNewAnswer(e.target.value)}/>
            <button type="submit" className="bg-blue-600 text-sm text-slate-50 py-2 px-3 rounded-md font-semibold w-fit flex gap-2 mt-2" >Add <HiPlus className="text-lg"/></button>
          </form>
        )}
        
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={data}
            strategy={verticalListSortingStrategy}
          >
            {data.map((item) => (<SortableItem key={item.id} {...item}/>))}

          </SortableContext>

        </DndContext>

        

      </div>
    </div>
    
  )
}