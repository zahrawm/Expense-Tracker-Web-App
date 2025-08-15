import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from  "../utils/data";

interface SideMenuProps {
   activeMenu: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ activeMenu }) => {
   const { user, clearUser } = useContext(UserContext)!;
   const navigate = useNavigate();

   const handleClick = (route: string) => {
       if(route === "logout") {
           clearUser();
           navigate("/login");
           return;
       }
       navigate(route);
   };

   const handleLogout = () => {
       localStorage.clear();
       clearUser();
       navigate("/login");
   };

   return (
       <div className="">
           <div className="">
               <h2>SideMenu</h2>
               {user ? (
                   <p>Welcome, {user.fullName}</p>
               ) : (
                   <p>Please log in</p>
               )}
           </div>
       </div>
   );
};