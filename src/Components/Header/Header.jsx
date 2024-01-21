import React from 'react'
import { Logoutbtn, Logo, Container } from '../';
import { useSelector } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";


export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const [navbarOpen, setNavbarOpen] = React.useState(false);
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
                {/* <nav className="flex py-3 justify-between">
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
                </nav> */}
                <nav className="relative flex flex-wrap items-center justify-between px-2 py-3  mb-3">
                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                            <div className="mr-4">
                                <Link to="/">
                                    <Logo width='70px' />
                                </Link>
                            </div>
                            <button
                                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                type="button"
                                onClick={() => setNavbarOpen(!navbarOpen)}
                            >
                                <FaBarsStaggered />
                            </button>
                        </div>
                        <div
                            className={
                                "lg:flex flex-grow items-center w-full lg:w-auto" +
                                (navbarOpen ? " flex justify-center" : " hidden")
                            }
                            id="example-navbar-danger"
                        >
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                <ul className='flex flex-wrap flex-col lg:flex-row  ml-auto nav-item'>
                                    {nevItem.map((item) =>
                                        item.active ? (
                                            <li key={item.name} className='block' >
                                                <NavLink
                                                    onClick={() => (navigate(item.slug), setNavbarOpen(!navbarOpen))}
                                                    className={({ isActive }) =>
                                                        `inline-block px-2 mx-3   py-2 duration-200 hover:bg-blue-100 rounded-full ${isActive ? "bg-blue-100" : ""} `
                                                    }
                                                    to={item.slug}
                                                >{item.name}</NavLink>
                                            </li>
                                        ) : null
                                    )}
                                    {authStatus && (<li><Logoutbtn /></li>)}
                                </ul>
                            </ul>
                        </div>
                    </div>
                </nav>
            </Container>
        </header >
    )
}
