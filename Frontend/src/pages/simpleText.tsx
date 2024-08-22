import React, { useRef, useState } from 'react'
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Dialoag } from '../components/simpleText/protectText';
// import { DialogDemo } from './protectText';
import { Earth, Settings } from "lucide-react"

import { gsap } from 'gsap';


const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[@#$%]/.test(password);
    const isLongEnough = password.length > 6;

    return hasUppercase && hasLowercase && hasSpecialChar && isLongEnough;
};

export default function SimpleText() {
    const [MessageDialog, setMessageDialog] = useState(false)
    const boxRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);


    const [text, setText] = useState('');
    const [isProtected, setIsProtected] = useState(false);

    const handleTextChange = (e: any) => {
        setText(e.target.value);
    };


 

    const handleClick = () => {
        if (isVisible) {
            gsap.to(boxRef.current, { x: '-100%', duration: 1, ease: 'power2.out' });

        } else {
            gsap.to(boxRef.current, { x: '0%', duration: 1, ease: 'power2.out' });
        }
        setIsVisible(!isVisible)
    };

    return (

        < div className=' min-h-[calc(100vh-8rem)] max-lg:px-5  ' >

            <div className='fixed   h-[670px] w-44 z-10 left-0 bottom-0 pb-10  flex flex-col justify-between '>

                <div ref={boxRef} className={`flex flex-col  h-full mb-1 ml-2 `}>
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                </div>


                <div className='pl-5'>
                    <Settings onClick={handleClick} color='white' size={"40"} className='bg-slate-800 rounded-full p-2 cursor-pointer hover:bg-slate-700' />
                </div>

            </div>

            <div className='flex flex-col mx-48'>
                <Dialoag
                    text={`${isProtected ? 'Unprotect Text' : 'Protect Text'}`}
                    messageDialog={MessageDialog}
                    setMessageDialog={setMessageDialog}
                />
            </div>

            <div className=' pb-3'>

                <Textarea
                    className='inset-0  mx-auto resize-none max-w-[1100px]  min-h-[900px] bg-white drop-shadow-lg self-center justify-center items-center'
                    value={text}
                    onChange={handleTextChange}
                />

            </div>

        </div >
    );
}


function MenuItem() {


    return (

        <div className='flex justify-center items-center w-full  border bg-white rounded-md h-12 my-2 px-3'>

            {/* Publish As Web Page  */}
            <Earth />
            <p className='text-center text-sm'>Publish As Web Page</p>
        </div>
    )

}