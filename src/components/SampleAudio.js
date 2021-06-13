import React, { useState, useRef, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import listAPIs from '../services/ArtisListsAPIs';
import { isEmpty } from 'lodash';
import * as AiIcons from 'react-icons/ai';

export default function SampleAudio(props) {
    const [open, setOpen] = useState(false)
    const [idArtist, setIdArtist] = useState(0)
    const [fullWidth] = useState(true)
    // const [play, setPlay] = useState(false)
    // const [volume, setVolume] = useState(1)
    const myRef = useRef();
    const [data, setData] = useState(null)

    useEffect(() => {
        if (open === true) {
            setIdArtist(props.id)
            listAPIs.getArtistById(props.id)
                .then((res) => {
                    setData(res.data)
                    handlePlayMusic()
                })
        }
    }, [props.id, props.open, open])

    const handleClose = () => {
        setOpen(false)
        props.close(true)
    }


    const handlePlayMusic = () => {
        myRef.current.play()
    }

    const handleEndMusic = () => {
        // setPlay(false)
        myRef.current.pause()
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <>
            <div>
                <button className="button-play" onClick={handleOpen}>
                    <AiIcons.AiFillPlaySquare className="icon-play" />
                </button>
                <Dialog fullWidth={fullWidth}
                    maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <div className="wrap-modals__audio">
                        <h4 style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px', margin: '15px' }} id="form-dialog-title" >Sample Audio</h4>
                        {!isEmpty(data) ?
                            <div className="wrap-sample-audio">
                                <div className="row">
                                    <div className="col-3"><label style={{ fontWeight: '600', fontSize: '14px' }}>Artist Name</label></div>
                                    <div className="col-9"><label style={{ fontWeight: '600' }}>: {data.artistName}</label></div>
                                </div>
                                <div className="row">
                                    <div className="col-3"><label style={{ fontWeight: '600', fontSize: '14px' }}>Album Name</label></div>
                                    <div className="col-9"><label style={{ color: 'brown' }}>: {data.albumName}</label></div>
                                </div>
                                <div className="wrap-image-artist">
                                    <img className="image-artist" src={data.imageURL} alt="img" />
                                </div>
                                <div className="wrapper-audio-button">
                                    <audio loop className="audio-button" controls id={"audio" + idArtist} onEnded={handleEndMusic} ref={myRef} src={data.sampleURL} />
                                </div>
                            </div>
                            : null}
                    </div>
                </Dialog>
            </div>
        </>
    )
}
