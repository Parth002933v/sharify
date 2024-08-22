import React from 'react'
import { pluginsList } from './toolbarIconsList'
import useOnClickListner from './useOnClickListner'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function ToolBar() {

    const { onClick } = useOnClickListner()

    return (
        <div className='flex bg-white gap-3 rounded-tl-md rounded-tr-md  '>
            {
                pluginsList.map((plugin) => (


                    <TooltipProvider key={plugin.id}>
                        <Tooltip delayDuration={500}>
                            <TooltipTrigger asChild >

                                <div key={plugin.id} className='hover:bg-accent p-2 cursor-pointer' onClick={() => onClick(plugin.event)}>
                                    <plugin.Icon />
                                </div>

                            </TooltipTrigger >

                            <TooltipContent >
                                {plugin.event}
                            </TooltipContent>
                        </Tooltip >
                    </TooltipProvider>


                ))
            }


        </div>
    )
}
