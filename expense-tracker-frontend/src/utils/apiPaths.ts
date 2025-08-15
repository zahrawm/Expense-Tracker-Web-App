 export const BASE_URL = "http://localhost:3000";

 export const API_PATHS = {
     AUTH : {
         LOGIN: "/api/auth/login",
         REGISTER: "/api/auth/register",
         GET_USER_INFO: "/api/auth/getUserInfo"
     },
     DASHBOARD  : {
         GET_DASHBOARD_DATA: "/api/dashboard",
          
      },
       INCOME : {
            ADD_INCOME: "/api/income/add",
            GET_ALL_INCOME: "/api/income/getAll",
            DELETE_INCOME: (id: string) => `/api/income/${id}`,
            DOWNLOAD_INCOME_EXCEL: "/api/income/download/excel"
       },
       EXPENSE : {
           ADD_EXPENSE: "/api/expense/add",
           GET_ALL_EXPENSE: "/api/expense/getAll",
           DELETE_EXPENSE: (id: string) => `/api/expense/${id}`,
           DOWNLOAD_EXPENSE_EXCEL: "/api/expense/download/excel"
       },
       IMAGE: {
          UPLOAD : "/api/image/upload",
          GET_ALL: "/api/image/getAll",
          DELETE: (id: string) => `/api/image/${id}`
       }
       
 };