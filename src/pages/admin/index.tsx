import SortableItem from "@/components/SortableItem"
import { HiPlus } from 'react-icons/hi';
import { DndContext,
  closestCenter,
  MeasuringStrategy,
  useSensor,
  useSensors,
  DragOverlay
  } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import {useState} from 'react'
import {RxCross1} from "react-icons/rx"
import { SmartPointerSensor } from "@/utils/helper";
import Tiptap from "@/components/Tiptap";
import AdminLayout from "@/components/AdminLayout";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import FaqboxPreview from "@/components/FaqboxPreview";



export default function Dashboard(){

  const [addQuestion, setAddQuestion] = useState(false);
  const sensors = [useSensor(SmartPointerSensor)];
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")
  const [empty, setEmpty] = useState(false)
  
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

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    }
  };

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
  
  const handleSumbit = (e:any) => {
    e.preventDefault()
    if(newQuestion.trim() && newAnswer.trim()){
      setAddQuestion(!addQuestion)
      setData([{id:(data.length+1), q:newQuestion, a:newAnswer}, ...data])
      setNewQuestion("")
      setNewAnswer("")
      setEmpty(false)
    }else{
      setEmpty(true)
    }
  }

  const handleDelete = (id:number)=>{
    setData(data.filter((item) => item.id !== id))
  }

  return(
    <AdminLayout>
      <div className=" sm:w-full sm:max-w-lg lg:max-w-2xl w-[95%] sm:m-0 mx-auto relative z-10">
        <h1 className="font-poppins text-3xl font-semibold text-center ">Dashboard</h1>

        {!addQuestion && <button className="bg-blue-600 mt-5 hover:bg-blue-800 flex justify-center items-center py-2 px-3 w-full transition font-poppins font-semibold gap-1 rounded-lg text-slate-50" onClick={() => setAddQuestion(!addQuestion)}><HiPlus className="text-xl"/>Add Question</button>}
        {addQuestion && (
          <form onSubmit={handleSumbit} className={`w-full p-5 flex font-poppins flex-col backdrop-blur-md bg-white/50 border-[1px] border-gray-200 rounded-lg gap-2 mt-3 relative`}>
            <button className="h-8 w-8 rounded-full flex justify-center items-center text-slate-900 bg-gray-200 transition hover:text-white hover:bg-red-500 text-xl p-0 absolute -top-2 -right-2" onClick={()=>{setAddQuestion(false);setEmpty(false);setNewQuestion("")}}><RxCross1 className="text-xl"/></button>

            <label htmlFor="question">Question : </label>

            <input type="text" name="question" id="question" className="py-1 text-sm border-b-2 border-slate-300 focus:border-slate-900 bg-transparent outline-none w-full" 
            autoComplete="off" autoFocus placeholder="Question..." 
            value={newQuestion} 
            onChange={(e)=>{setNewQuestion(e.target.value);}}
            onKeyDown={(e) => {if(e.key === 'Enter') e.preventDefault()}}/>

            <label htmlFor="question" className="mt-2">Answer : </label>
            <Tiptap newAnswer={newAnswer} setNewAnswer={setNewAnswer}/>
            {empty && <p className="text-red-500 text-sm">*Please fill the question and answer</p>}

            <button type="submit" className="bg-blue-600 text-sm text-slate-50 py-2 px-3 rounded-md font-semibold w-fit flex gap-2 mt-2" >Add <HiPlus className="text-lg"/></button>
          </form>
        )}
        
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          measuring={measuringConfig}
          modifiers={[restrictToWindowEdges, restrictToVerticalAxis]}
        >
          <SortableContext
            items={data}
            strategy={verticalListSortingStrategy}
          >
            {data.map((item) => (<SortableItem data={data} setData={setData} handleDelete={handleDelete} key={item.id} {...item}/>))}

          </SortableContext>
        </DndContext>
      </div>
      <div className="lg:flex hidden h-fit sticky top-24 z-10">
        <div className="w-[250px] h-[531.25px] rounded-2xl mx-auto bg-slate-900  font-semibold  relative  overflow-x-hidden hidden-scrollbar">
          <FaqboxPreview data={data}/>
        </div>
      </div>
    </AdminLayout>
  )
}