import { createContext, useState } from "react";
import tracksList from "../assets/tracksList";

const audio = new Audio();

export const AudioContext = createContext({});

audio.src = tracksList[0].src;

const AudioProvider = ({children}) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleToggleAudio = (track) => {

        if (currentTrack.id !== track.id) {
            setCurrentTrack(track);
            setIsPlaying(true);
            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();
            return;
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }
    }

    const nextTrack = () => {
        const nextTrackindex = tracksList.findIndex((track) => track.id === currentTrack.id) + 1;
        const nextTrackItem = tracksList[nextTrackindex];
        setIsPlaying(true);
        setCurrentTrack(nextTrackItem);
        audio.src = nextTrackItem.src;
        audio.currentTime = 0;
        audio.play();

        setCurrentTrackIndex(prev => prev + 1);

        console.log(currentTrackIndex);
    }

    const value = {
        audio,
        currentTrack,
        isPlaying,
        handleToggleAudio,
        nextTrack
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider;