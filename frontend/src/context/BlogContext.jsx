import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate()

    const [menuActive,setMenuActive] = useState("home")


    const [postArray,setPostArray] = useState([])
    const [token,setToken] = useState("")
    const [authors,setAuthors] = useState([])
    const [userData,setUserData] = useState([])


    // ************* code to set date *************************

    const timeAgo = (date) => {

        const currentDate = new Date();
        const targetDate = new Date(date);
        
        const diffInMilliseconds = currentDate - targetDate;
        
        const seconds = Math.floor(diffInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30); // Approximation
        const years = Math.floor(days / 365); // Approximation
      
        if (seconds < 60) {
          return `${seconds == 1 ? `${seconds} second ago` : `${seconds} seconds ago` } `;
        } else if (minutes < 60) {
          return `${minutes == 1 ? `${minutes} minute ago` : `${minutes} minutes ago` } `;
        } else if (hours < 24) {
          return `${hours == 1 ? `${hours} hour ago` : `${hours} hours ago` } `;
        } else if (days < 30) {
          return `${days == 1 ? `${days} day ago` : `${days} days ago` } `;
        } else if (months < 12) {
          return `${months == 1 ? `${months} month ago` : `${months} months ago` } `;
        } else {
          `${years == 1 ? `${years} year ago` : `${years} years ago` } `;
        }
      }


    // ************** code to set token *************************

    useEffect(() => {

        if(!token && localStorage.getItem('token')){

            setToken(localStorage.getItem('token'))
        }
    },[])

     // ************** code to fetch all posts *************************

    const getAllposts = async () => {

        try {

            const response = await axios.get(backend_url + '/api/post/get-all-posts')

            if(response.data.success)(

                setPostArray(response.data.allPosts)
            )
            
            
        } catch (error) {

            console.log(error);

            toast.error(error.message)
            
        }
    }

    // ************** code to get authors *************************

    const getAuthors = async () => {

        try {

            const response = await axios.get(backend_url + '/api/user/get-authors')


            if(response.data.success){

                setAuthors(response.data.allAuthors)
                                
            }        
            
        } catch (error) {

            console.log(error);

            toast.error(error.message)
        }
    }

     // ************** render *************************

    useEffect(() => {

        getAllposts()
        getAuthors()

    },[])


     // ************** code to get current user info *************************


    const getUserInfo = async () => {

        try {

            const response = await axios.post(backend_url + '/api/user/get-user-info',{},{headers:{token}})

            if(response.data.success){

                setUserData(response.data.userInfo)
                
            }
    
            
        } catch (error) {

            console.log(error);

            toast.error(error.message)
            
        }


    }
    
     // ************** render *************************

    useEffect(() => {

        if(token){

            getUserInfo()
        }

        },[token])


    const values = {
                        backend_url,
                        postArray,setPostArray,
                        token,setToken,
                        authors,
                        userData,
                        navigate,
                        timeAgo,
                        menuActive,setMenuActive
                    
                    }

    return (

        <BlogContext.Provider value={values}>

            {props.children}

        </BlogContext.Provider>

    )

}

export default BlogContextProvider