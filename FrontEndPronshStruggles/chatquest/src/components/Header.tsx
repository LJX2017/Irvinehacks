import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from 'next/image';
import Booknote from "../../public/Booknote.gif";
import 'tailwindcss/tailwind.css';


const Header: React.FC = () => {
    return (
        <Navbar className='glass-navbar px-4 my-3 justify-end'>
            <div className='gap-10em mx-20  '>
                <NavbarContent className='gap-10vw'> 
                    <NavbarItem>    
                        <Image src={Booknote} alt="Booknote" width="50" height="50" />
                    </NavbarItem>
                    <NavbarBrand>ChatQuest</NavbarBrand>
                </NavbarContent>
            </div>
        </Navbar>
)};

export default Header;
