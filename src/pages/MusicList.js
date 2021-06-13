import React, { useState, useEffect } from 'react'
import listAPIs from '../services/ArtisListsAPIs'
import './MusicList.css'
import SampleAudio from '../components/SampleAudio'
import FormDialog from '../components/FormAddArtist'
import { isEmpty } from 'lodash'
import * as moment from 'moment'
import SweetAlert from 'react-bootstrap-sweetalert'
import FormEditArtist from '../components/FormEditArtist'


export default function MusicList() {
    const [openModals, setOpenModals] = useState(false)
    const [typeModals, setTypeModals] = useState(false)
    const [data, setData] = useState(null)
    const [idArtist, setIdArtist] = useState(0)
    const [openAlertDelete, setOpenAlertDelete] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [deleteMessage, setDeleteMessage] = useState('')
    const [deleteAlertType, setDeleteAlertType] = useState(0)
    const [isFetch, setIsFetch] = useState(false)

    useEffect(() => {
        listAPIs.getListArtists()
            .then((res) => {
                setData(res.data);
            })
    }, [isFetch])


    const handleDelete = (id) => {
        setIdArtist(id)
        setOpenAlertDelete(true)
        setErrMessage('The Data will be Deleted?')
    }
    const hideAlert = () => {
        setOpenAlertDelete(false)
    }

    const condifmDelete = () => {
        listAPIs.DeleteArtist(idArtist)
            .then((res) => {
                setDeleteAlertType(1)
                setDeleteMessage('Success Delete Data')
            })
            .catch((err) => {
                setDeleteAlertType(2)
                setDeleteMessage(err.response.data.message)
            })
        setOpenAlertDelete(false)
        setOpenSuccess(true)
    }

    const hideSuccess = () => {
        setErrMessage('')
        setDeleteMessage('')
        setOpenSuccess(false)
        setIsFetch(!isFetch)
    }

    const handleEditArtist = (id) => {
        setIdArtist(id)
        setTypeModals('edit')
        setOpenModals(true)
    }

    const handleCloseModals = () => {
        setIdArtist(0)
        if (typeModals === 'edit') {
            setIsFetch(!isFetch)
        }
        setTypeModals('')
        setOpenModals(false)
    }

    const listModals = (idOpen) => {
        if (idArtist === idOpen && openModals === true) {
            switch (typeModals) {
                case 'play':
                    return (
                        <SampleAudio id={idArtist} close={handleCloseModals} open={openModals} />
                    )
                case 'edit':
                    return (
                        <FormEditArtist id={idArtist} close={handleCloseModals} open={openModals} />
                    )
                default:
            }
        }
    }


    return (
        <>
            <SweetAlert
                show={openAlertDelete}
                warning
                title="Are You Sure?"
                confirmBtnText={'Delete'}
                cancelBtnText={'Cancel'}
                showCancel
                focusCancelBtn
                confirmBtnBsStyle='warning'
                onConfirm={condifmDelete}
                onCancel={hideAlert}
            >
                {errMessage}
            </SweetAlert>
            <SweetAlert
                show={openSuccess}
                success={deleteAlertType === 1}
                warning={deleteAlertType === 2}
                title={deleteAlertType === 1 ? "Success!" : "Failed!"}
                onConfirm={hideSuccess}>
                {deleteMessage}
            </SweetAlert>

            <div className="container wrapper-home">
                <div className="row home-music" style={{ margin: '30px' }}>
                    <div className="head-home">
                        <label> LIST MUSIC </label>
                    </div>
                    <div className="content-music">
                        <div className="add-music">
                            <FormDialog />
                        </div>
                        <div className="table-list-music">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>Num.</th>
                                        <th style={{ width: '30%' }}>Album Name</th>
                                        <th style={{ width: '15%' }}>Artist Name</th>
                                        <th style={{ width: '15%' }}>Date Release</th>
                                        <th style={{ width: '10%' }}>Sample Audio</th>
                                        <th style={{ width: '10%' }}>Price</th>
                                        <th style={{ width: '15%' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isEmpty(data) && data.map((v, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}.</td>
                                            <td>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="wrapper-image-artist">
                                                            <img alt="img" className="image-artist" src={v.imageURL} />
                                                        </div>
                                                    </div>
                                                    <div className="col-7">
                                                        {v.albumName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{v.artistName}</td>
                                            <td>{moment(v.releaseDate).format('LL')}</td>
                                            <td>
                                                <SampleAudio id={v.artistID} close={handleCloseModals} open={openModals} />
                                            </td>
                                            <td>{v.price}  円</td>
                                            <td>
                                                <div>
                                                    <button className="button-edit-music" onClick={() => handleEditArtist(v.artistID)}>Edit</button>
                                                    {listModals(v.artistID)}
                                                </div>
                                                <div>
                                                    <button className="button-delete" onClick={() => handleDelete(v.artistID)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
