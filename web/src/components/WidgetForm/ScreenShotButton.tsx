import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps{
    onScreenshotTook: (screenShot: string | null) => void;
    screenShot: string | null;
}

export function ScreenShotButton({screenShot, onScreenshotTook}:ScreenShotButtonProps){

    const [isTakingScreenShot, setIsTakingScreenShot] = useState(false);

    async function handleTakeScreenShot(){
        setIsTakingScreenShot(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64Image = canvas.toDataURL('image/png');
        onScreenshotTook(base64Image);
        setIsTakingScreenShot(false);
    }

    if(screenShot){
        return (
        <button
            type="button"
            onClick={()=>onScreenshotTook(null)}
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            style={{
                backgroundImage: `url(${screenShot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180, 
            }}
        >
            <Trash weight="fill" />
        </button>
        )
    }

    return(
        <button
        type="button"
        onClick={handleTakeScreenShot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
       >
        {!isTakingScreenShot ? <Camera className="w-6 h-6"/> : <Loading />}
         
       </button>
    )
}