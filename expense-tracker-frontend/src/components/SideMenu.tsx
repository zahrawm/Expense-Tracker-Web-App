import React, { useContext } from "react";


interface User {
  fullName?: string;
  profileImageUrl?: string;
}

interface UserContextType {
  user: User | null;
  clearUser: () => void;
}

interface MenuItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  path: string;
}

interface SideMenuProps {
  activeMenu: string;
}


import { Home, DollarSign, CreditCard, LogOut } from "lucide-react";


const UserContext = React.createContext<UserContextType | null>(null);

const SIDE_MENU_DATA = [
  {
    id: "01",
    icon: Home,
    label: "Dashboard", 
    path: "/dashboard"
  },
  {
    id: "02",
    icon: DollarSign,
    label: "Income",
    path: "/income"
  },
  {
    id: "03", 
    icon: CreditCard,
    label: "Expense",
    path: "/expense"
  },
  {
    id: "04",
    icon: LogOut,
    label: "Logout",
    path: "logout"
  }
];

export const SideMenu: React.FC<SideMenuProps> = ({ activeMenu }) => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("SideMenu must be used within a UserContext provider");
  }
  
  const { user, clearUser } = context;
  
  
  const navigate = (route: string) => {
    console.log(`Navigating to: ${route}`);
  };

  const handleClick = (path: string) => {
    if (path === "logout") {
      clearUser();
      navigate("/login");
      return;
    }
    navigate(path);
  };

  const handleLogout = () => {
    
    clearUser();
    navigate("/login");
  };

  return (
    <div className="h-full w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl flex flex-col">
    
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {user?.profileImageUrl ? (
              <img 
                src={user.profileImageUrl || ""} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/30 shadow-lg"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">
                  {user?.fullName?.charAt(0) || "?"}
                </span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h5 className="text-lg font-semibold text-white truncate">
              {user?.fullName || "Guest User"}
            </h5>
            <p className="text-sm text-slate-400">Online</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {SIDE_MENU_DATA.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeMenu === item.path;
          
          return (
            <button
              key={item.id}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium
                transition-all duration-200 group relative overflow-hidden
                ${isActive 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105" 
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50 hover:scale-102"
                }
              `}
              onClick={() => handleClick(item.path)}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
              )}
              
              <IconComponent className={`
                w-5 h-5 transition-transform duration-200 relative z-10
                ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}
                ${isActive ? "animate-pulse" : "group-hover:scale-110"}
              `} />
              
              <span className="relative z-10 text-left">
                {item.label}
              </span>
              
              {isActive && (
                <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};


 export const DemoApp = () => {
  const [activeMenu, setActiveMenu] = React.useState("/dashboard");
  
  const mockContext: UserContextType = {
    user: { 
      fullName: "John Doe", 
      profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
    },
    clearUser: () => console.log("User cleared")
  };

  return (
    <UserContext.Provider value={mockContext}>
      <div className="h-screen bg-gray-100 flex">
        <SideMenu activeMenu={activeMenu} />
        <div className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600 mb-6">Active menu: <span className="font-semibold text-blue-600">{activeMenu}</span></p>
            
            <div className="grid grid-cols-2 gap-4">
              {SIDE_MENU_DATA.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.path)}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200
                    ${activeMenu === item.path 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }
                  `}
                >
                  Switch to {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default SideMenu;