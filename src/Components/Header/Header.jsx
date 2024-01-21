import React from 'react'
import { Logoutbtn, Logo, Container } from '../';
import { useSelector } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const nevItem = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Post",
            slug: "/all-post",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        },
    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className="flex py-3 justify-between">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {nevItem.map((item) =>
                            item.active ? (
                                <li key={item.name} >
                                    <NavLink
                                        onClick={() => navigate(item.slug)}
                                        className={({ isActive }) =>
                                            `inline-block px-2 mx-3  py-2 duration-200 hover:bg-blue-100 rounded-full ${isActive ? "bg-blue-100" : ""} `
                                        }
                                        to={item.slug}
                                    >{item.name}</NavLink>
                                </li>
                            ) : null
                        )}
                        {authStatus && (<li><Logoutbtn /></li>)}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
