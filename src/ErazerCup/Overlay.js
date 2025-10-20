import { useEffect, useRef } from "react";
import PopUp from "./assets/MapPopUp.webm";

const Overlay = () => {
    const videoRef = useRef(null);

    const PlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0; 
            videoRef.current.play();         
        }
    }

    useEffect(() => {
        PlayVideo()
        const interval = setInterval(PlayVideo, 3*60000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <video
            ref={videoRef}
            src={PopUp}
            className="fixed inset-0 w-full h-full object-cover"
            playsInline
            muted
        />
    );
};

export default Overlay;
