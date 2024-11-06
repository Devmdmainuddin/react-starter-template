import { useEffect, useState } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import Image from "./Image";

import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
// IoMdClose,
const Navbar = () => {
    const { user, logOut } = useAuth()
    const [showMenu, setShowMenu] = useState(false);
    const [proOpen, setProOpen] = useState(false);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const links = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'about',
            path: '/about'
        },
        {
            title: 'contact',
            path: '/contact'
        },
        {
            title: 'Blog',
            path: '/blog'
        },
        {
            title: 'login',
            path: '/login'
        }
    ]
    useEffect(() => {
        function resize() {
            if (window.innerWidth < 767.99) {
                setProOpen(false)
                setShowMenu(false)
            }
        }
        resize()
        window.addEventListener("resize", resize)
    }, [])
    return (
        <div>

            <div className="relative z-10 shadow-md w-full  duration-300 " >
                <Container className='py-3'>
                   
                        <div className="flex items-center justify-between py-6 ">
                            <div className="logo"> <h2>logo</h2></div>
                            <nav className="hidden md:inline-block">
                                <ul className={`flex gap-6 items-center`}>
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <Link to={link.path}>{link.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            {/* Profile */}
                            <div className=" hidden md:flex w-12">
                                <Image src={user?.photoURL || '/user.png'} className='rounded-full' alt=''></Image>
                                {/* <Image src='/user.png' className='rounded full' alt=''></Image> */}
                            </div>
                            {/* Hamburger */}
                            <div className="flex items-center gap-4 md:hidden ">
                                {showMenu ? (
                                    <HiMenuAlt1
                                        onClick={toggleMenu}
                                        className=" cursor-pointer transition-all"
                                        size={30}
                                    />
                                ) : (
                                    <HiMenuAlt3
                                        onClick={toggleMenu}
                                        className="cursor-pointer transition-all"
                                        size={30}
                                    />
                                )}
                            </div>

                        </div>

                 
                    <div className={`${showMenu ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[278px] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-500 md:hidden rounded-r-xl shadow-md`} >
                        <div className="card">
                            <div onClick={() => setProOpen(!proOpen)} className="profile-menu">
                                {/* <Image src={user?.photoURL} className='rounded full' alt=''></Image> */}
                            </div>
                            <nav>
                                <ul className={`space-y-4 text-lg`}>
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <Link to={link.path} className="mb-2 inline-block">{link.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>


                        </div>
                        <div className="footer">

                        </div>
                    </div>
                </Container>

            </div>
        </div>
    );
};

export default Navbar;