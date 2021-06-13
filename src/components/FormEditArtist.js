import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { useFormik } from 'formik'
import masterDataValidator from '../helper/formValidator'
import SweetAlert from 'react-bootstrap-sweetalert'
import listAPIs from '../services/ArtisListsAPIs'
import * as moment from 'moment'

const initialValues = {
    artistName: "",
    albumName: "",
    imageURL: "",
    releaseDate: "",
    price: null,
    sampleURL: ""
}

export default function FormEditArtist(props) {
    const [open, setOpen] = React.useState(false)
    const [data, setData] = useState(null)
    const [id, setId] = useState(0)


    useEffect(() => {
        setId(props.id)
        setOpen(props.open)
        listAPIs.getArtistById(props.id)
            .then((res) => {
                let data = res.data
                const values = {
                    artistID: data.artistID,
                    artistName: data.artistName,
                    albumName: data.albumName,
                    imageURL: data.imageURL,
                    releaseDate: moment(data.releaseDate).format('YYYY-MM-DD'),
                    price: data.price,
                    sampleURL: data.sampleURL
                }
                setData(values);
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }, [props.id, props.open])

    const handleClose = () => {
        setOpen(false);
        props.close(true)
    };


    const formik = useFormik({
        initialValues: data || initialValues,
        enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: masterDataValidator.updateMusic,
        onSubmit: values => {
            listAPIs.UpdateArtist(id, values)
                .then((res) => {
                    setShowAlert(true)
                    setAlertType(1)
                    setAlertMessage("Success Update Music!")
                })
                .catch((err) => {
                    setShowAlert(true)
                    setAlertType(2)
                    setAlertMessage('')
                })
        }
    })

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState(1)
    const [alertMessage, setAlertMessage] = useState('')

    const hideAlert = () => {
        setShowAlert(false)
        if (alertType !== 2) {
            handleClose()
            props.close(true)
        }
    }

    return (
        <div>
            <SweetAlert
                show={showAlert}
                confirmBtnBsStyle="warning"
                title={alertType === 1 ? "Sukses!" : "Invalid!"}
                onConfirm={hideAlert}
                warning={alertType === 2}
                info={alertType === 1}
            >
                {alertMessage}
            </SweetAlert>
            <Dialog maxWidth='xs' fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div className="wrap-modals">
                    <div style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px', margin: '15px 15px 5px', fontSize: '20px' }} id="form-dialog-title" >Edit Music</div>
                    <form style={{ padding: '10px 15px 10px', margin: '0px 15px', fontSize: '14px' }} onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ marginBottom: '0px', color: 'gray' }}>Artist Name</label>
                            <input placeholder="Artist Name" type="text" className="input-form input-form__artist form-control"
                                style={formik.touched.artistName && formik.errors.artistName ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="artistName" value={formik.values.artistName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.artistName && formik.errors.artistName}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ marginBottom: '0px', color: 'gray' }}>Album Name</label>
                            <input placeholder="Album Name" type="text" className="input-form input-form__artist form-control"
                                style={formik.touched.albumName && formik.errors.albumName ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="albumName" value={formik.values.albumName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.albumName && formik.errors.albumName}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ marginBottom: '0px', color: 'gray' }}>Image Url</label>
                            <input placeholder="Image Url" type="text" className="input-form input-form__artist form-control"
                                style={formik.touched.imageURL && formik.errors.imageURL ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="imageURL" value={formik.values.imageURL} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.imageURL && formik.errors.imageURL}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ marginBottom: '0px', color: 'gray' }}>Release Date</label>
                            <input placeholder="Release Date" type="date" className="input-form input-form__artist form-control"
                                style={formik.touched.releaseDate && formik.errors.releaseDate ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="releaseDate" value={formik.values.releaseDate} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.releaseDate && formik.errors.releaseDate}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ marginBottom: '0px', color: 'gray' }}>Price</label>
                            <div className="input-group" style={formik.touched.price && formik.errors.price ? { border: '1px solid red', borderRadius: '5px' } : { border: '1px solid #ced4da', borderRadius: '5px' }}>
                                <input placeholder="Price" type="number" className="form-control" aria-label="Amount (to the nearest dollar)" name="price" value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <span style={{ margin: '0px' }} className="input-group-text">円</span>
                            </div>
                            <div className="feedback-error">{formik.touched.price && formik.errors.price}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ marginBottom: '0px', color: 'gray' }}>Sample Url</label>
                            <input placeholder="Sample Url" type="text" className="input-form input-form__artist form-control"
                                style={formik.touched.sampleURL && formik.errors.sampleURL ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="sampleURL" value={formik.values.sampleURL} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.sampleURL && formik.errors.sampleURL}</div>
                        </div>
                        <div className="mb-3" style={{ textAlign: 'center' }}>
                            <button onClick={handleClose} className="button-others" type="button">Cancel</button>
                            <button className="button-add-music" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}
