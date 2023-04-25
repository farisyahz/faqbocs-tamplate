'use client'

import Placeholder from '@tiptap/extension-placeholder'
import {
  BubbleMenu, EditorContent, generateHTML, useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import {GoBold} from 'react-icons/go'
import {AiOutlineItalic} from 'react-icons/ai'
import {BsTypeStrikethrough} from 'react-icons/bs'
import Link from '@tiptap/extension-link'

type Props = {
  newAnswer : string,
  setNewAnswer : React.Dispatch<React.SetStateAction<string>>
}

const TiptapEdit = ({newAnswer, setNewAnswer}:Props) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'py-1 text-sm border-b-2 border-slate-300 focus:border-slate-900 outline-none w-full cursor-text',
        spellcheck: 'false'
      },
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Answer ...',
      }),
      Link.configure({
        autolink:true,
        openOnClick:true,
        HTMLAttributes:{
          class: 'text-blue-500 hover:underline'
        },
        validate: href => /^(http(s)?:\/\/)?(.*).(co|me|com|id|ee)(.+)?/.test(href)
      })
    ],
    content: `${newAnswer}`,
    onUpdate: ({ editor }) => {
      const json = editor.getHTML()
      setNewAnswer(`${json}`);
    },
  })

  editor?.setEditable(true)

  

  return (
    <>
      {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className='flex gap-1 p-2 rounded-md bg-white'>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive('bold') ? 'bg-slate-900 text-slate-50 ' : 'hover:bg-gray-100'} rounded-md  p-1 relative`}
          >
            <GoBold className='text-xl'/>
            <div className="w-full h-full absolute top-0 right-0"></div>
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor.isActive('italic') ? 'bg-slate-900 text-slate-50 ' : 'hover:bg-gray-100'} rounded-md  p-1 relative`}
          >
            <AiOutlineItalic className='text-xl'/>
            <div className="w-full h-full absolute top-0 right-0"></div>
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${editor.isActive('strike') ? 'bg-slate-900 text-slate-50 ' : 'hover:bg-gray-100'} rounded-md  p-1 relative`}
          >
            <BsTypeStrikethrough className='text-xl'/>
            <div className="w-full h-full absolute top-0 right-0"></div>
          </button>
        </div>
      </BubbleMenu>}
      <EditorContent editor={editor} />
    </>
  )
}

export default TiptapEdit