import { useState } from "react";
import tracklist from "../../assets/tracksList.js"
import Track from "../../components/Track/Track.jsx";
import style from "./MainPage.module.scss"
import { Input } from "@mui/material";

const runSearch = (query) => {
    if (!query) return tracklist;

    return tracklist.filter((track) => 
        track.title.toLowerCase().includes(query.toLowerCase()) 
        || track.artists.toLowerCase().includes(query.toLowerCase())
    );
}

const MainPage = () => {

    const [tracks, setTracks] = useState(tracklist);

    const handlerChange = (e) => {
        const filteredTracks = runSearch(e.target.value);
        setTracks(filteredTracks);
        
        console.log(tracks);

    }

    return (
        <>
            <div className={style.search}>
                <Input onChange={handlerChange} placeholder="Search" />
                <div className={style.list}>
                    {tracks.map((track, i) => {
                        return (
                            <Track key={track.id} order={i} {...track}></Track>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default MainPage;