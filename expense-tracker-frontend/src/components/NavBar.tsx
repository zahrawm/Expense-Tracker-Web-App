import { useState } from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import  {SideMenu} from "../components/SideMenu";

interface NavbarProps {
   activeMenu: string;
}

export const Navbar: React.FC<NavbarProps> = ({activeMenu}) => {
   const [openSideMenu, setopenSideMenu] = useState(false);

   return (
       <div className="flex gap-x-2 items-center justify-between bg-white p-4 shadow-md">
           <button className="block lg:hidden text-black"
               onClick={() => setopenSideMenu(!openSideMenu)}>
               {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
           </button>
           <h2 className="text-lg font-bold">Expense Tracker</h2>
           {openSideMenu && <SideMenu activeMenu={activeMenu} />}
       </div>
   );
}