import { IconButton } from "@mui/material";
import style from "./Track.module.scss";
import { PlayArrow, Pause } from "@mui/icons-material";
import SecToMin from "../../services/SecToMin";
import { useContext } from "react";
import { AudioContext } from "../../context/AudioConrol";
import cn from "classnames";

const Track = (track) => {

    const { id, src, preview, title, artists, duration, order } = track;

    const {handleToggleAudio, currentTrack, isPlaying} = useContext(AudioContext);

    const isCurrentTrack = track.id === currentTrack.id;

    return (
        <div order={order} className={cn(style.track, isCurrentTrack && style.playing)}>
            <IconButton onClick={() => handleToggleAudio(track)}>
                {isPlaying && isCurrentTrack ? <Pause/> : <PlayArrow/> }
            </IconButton>
            <img className={style.preview} src={preview} alt="" />
            <div className={style.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{SecToMin(duration)}</p>
        </div>
    )

}

export default Track;