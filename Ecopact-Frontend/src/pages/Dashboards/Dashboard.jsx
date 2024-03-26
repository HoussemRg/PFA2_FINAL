import { SidebarNav } from "../../components/SidebarNav"
import TopBar from "../../components/TopBar"
import Main from "../../components/Main";


const Dashboard = () => {

  return (
    
    <div className="flex w-full"> 
        <div className="flex flex-col gap-8 w-full">
          <div className="top w-full h-[50px]">
            <TopBar/>
          </div>
          <div className=" w-11/12 h-full flex flex-col  gap-5 mx-auto mb-12 ">
            <Main />
          </div>
        </div>
    </div>
  )
}

export default Dashboard