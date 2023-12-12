import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioConrol";
import style from "./playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import SecToMin from "../../services/SecToMin";

const TimeControls = () => {

    const { audio, currentTrack, nextTrack } = useContext(AudioContext);
    const [currentTime, setCurrentTime] = useState(0);

    const {duration} = currentTrack;

    const formattedCurrentTime = SecToMin(currentTime);

    const handleToggleCurrentTime = (event, newValue) => {
        audio.currentTime = newValue;
        setCurrentTime(newValue);
        if (audio.currentTime >= audio.duration) {
            nextTrack(currentTrack);
        }
    }
    
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    useEffect(() => {
        if (audio.currentTime >= audio.duration) {
            nextTrack(currentTrack);
        }
    }, [currentTime]);

    return (
        <>
            <p>{formattedCurrentTime}</p>
            <Slider step={1} min={0} max={duration} value={currentTime} onChange={handleToggleCurrentTime}/>
            <p>{SecToMin(duration)}</p>
        </>
    )
}

const Playbar = () => { 


    const { currentTrack, handleToggleAudio, isPlaying } = useContext(AudioContext);

    const { title, artists, preview } = currentTrack;


    return (
        <div className={style.playbar}>
            <div className={style.container}>
                <img className={style.preview} src={preview} alt={title} />
                <IconButton onClick = {() => handleToggleAudio(currentTrack)}>
                    {isPlaying ? <Pause/> : <PlayArrow/> }
                </IconButton>
                <div className={style.credits}>
                    <h4>{title}</h4>
                    <p>{artists}</p>
                </div>
                <div className={style.slider}>
                    <TimeControls/>
                </div>

            </div>
        </div>
    );
}

export default Playbar;