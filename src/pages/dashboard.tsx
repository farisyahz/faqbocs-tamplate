import SortableItem from "@/components/SortableItem"
import type { MouseEvent, KeyboardEvent } from 'react'
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

  return(
    <div className="w-[100vw] h-[100vh] bg-sky-300">
      <div className="sm:max-w-lg w-[95%] mx-auto pt-10">
        <h1 className="font-poppins text-3xl font-semibold text-center">Dashboard</h1>
        <button className="bg-blue-600 mt-5 hover:bg-blue-500 flex justify-center items-center py-2 px-3 w-full font-poppins text-lg font-semibold gap-3 rounded-lg text-slate-50">Add Question<HiPlus className="text-2xl"/></button>
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