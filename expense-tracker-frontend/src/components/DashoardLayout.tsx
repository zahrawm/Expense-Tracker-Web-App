import React, { useContext } from 'react';
import { UserContext } from "../context/UserContext";
import {Navbar} from '../components/NavBar';
import  {SideMenu} from "../components/SideMenu";

interface DashboardLayoutProps {
   children: React.ReactNode;
   activeMenu: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({children, activeMenu}) => {
   const { user } = useContext(UserContext)!;

   return (
       <div className="">
           <Navbar activeMenu={activeMenu} />
           {
               user ? (
                  <div className="flex">
                       <div className="max-w-[100px] hidden">
                           <SideMenu activeMenu={activeMenu} />
                       </div>
                       <div className="grow mx-5">
                           {children}
                       </div>
                   </div>
               ) : null
           }
       </div>
   )
}