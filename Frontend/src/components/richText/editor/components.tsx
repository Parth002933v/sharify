import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import React from 'react'

export function CEditable() {
    return (
        <ContentEditable className='min-h-[900px]  w-full bg-white rounded-bl-md rounded-br-md p-6 outline-none' />
    )
}


export function Placeholder() {


    return <div className='absolute pt-16 px-6 5 top-0 left-2.5 select-none inline-block pointer-events-none'>Enter some text...</div>
}




export function Divider() {

    return <div className=' h-[1px]'></div>
}