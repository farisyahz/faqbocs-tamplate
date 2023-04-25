import Image from 'next/image'
import LogoText from '../assets/logo-light.png'
import Link from 'next/link'
import {BsViewList} from 'react-icons/bs'
import {IoShareSocial, IoSettingsOutline, IoShareSocialOutline} from 'react-icons/io5'
import {FaShapes} from 'react-icons/fa'
import {BsShare} from 'react-icons/bs'



export default function AdminNav(){
  return(
    <div className="fixed hidden top-0 left-0 h-[100vh] w-[200px] bg-white text-slate-950 p-5 font-poppins font-medium z-10 sm:flex flex-col justify-between shadow-lg">
      <div className='flex flex-col gap-5'>
      <Link href={'admin/'} className='flex gap-3 my-2 items-center flex-col '>
        <div className='rounded-full h-20 w-20 bg-slate-950 flex justify-center items-center font-semibold text-4xl text-white '>F</div>
        <p className='font-semibold font-poppins text-slate-950'>@faris_rafie</p>
      </Link>
      <Link href={'admin/'} className='py-3 px-4 hover:bg-slate-100 transition rounded-lg flex gap-2 items-center'><BsViewList className='text-2xl'/>Dashboard</Link>
      <Link href={'admin/'} className='py-3 px-4 hover:bg-slate-100 transition rounded-lg flex gap-2 items-center '><FaShapes className='text-2xl '/>Appearence</Link>
      <Link href={'admin/'} className='py-3 px-4 hover:bg-slate-100 transition rounded-lg flex gap-2 items-center'><IoSettingsOutline className='text-2xl'/>Settings</Link>
      <Link href={'admin/'} className='py-3 px-4 border-[1px] border-slate-300 transition rounded-full hover:border-transparent hover:bg-slate-100 flex justify-center gap-2 items-center'><IoShareSocial className='text-2xl '/>Share</Link>
      <Link href={'/supportus'} className='py-3 px-4 bg-slate-100 transition rounded-full hover:bg-blue-600 justify-center hover:text-white flex gap-2 items-center'>Support Us</Link>
      </div>

      <Link href={'admin/'} className=' relative w-full flex justify-center items-center gap-2 my-2'>
        <Image
          src={LogoText}
          alt='faqbocs'
          height={40}
        />
        <p className=' text-2xl'>faqbocs</p>
      </Link>
      
      
    </div>
  )
}