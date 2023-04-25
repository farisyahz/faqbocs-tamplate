import AdminNav from "./AdminNav";
import Faqbox from "./Faqbox";
import FaqboxPreview from "./FaqboxPreview";

export default function AdminLayout({children}:{children:React.ReactNode}){
  return (
    <div className="font-popppins">
      <AdminNav/>
      <div className="min-h-[100vh] sm:ml-[200px] bg-orange-100 py-10 sm:px-[30px] md:px-[50px] md:grid lg:grid-cols-[_1fr_350px] 2xl:grid-cols-[_1fr,_1fr] ">
        <div className="fixed top-20 left-40 w-40 h-40 rounded-full bg-orange-400 blur-3xl z-0"></div>
        <div className="fixed bottom-20 right-60 w-60 h-60 rounded-full bg-orange-400 blur-[100px] z-0"></div>
        {children}
        
      </div>
    </div>
  )
}