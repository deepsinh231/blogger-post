import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Store/AuthSlice'
function Logoutbtn() {
    const dispatch = useDispatch()
    const logouthendalar = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <>
            <button className='inline-block mx-3 px-2 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logouthendalar}>Logout</button>
        </>
    );
}

export default Logoutbtn;