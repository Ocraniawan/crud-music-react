import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useFormik } from 'formik'
import masterDataValidator from '../helper/formValidator';
import SweetAlert from 'react-bootstrap-sweetalert';
import listAPIs from '../services/ArtisListsAPIs';

const values = {
    artistName: "",
    albumName: "",
    imageURL: "",
    releaseDate: "",
    price: null,
    sampleURL: ""
}

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = useState(values)

    const handleClickOpen = () => {
        setOpen(true);
        setInitialValues(values)
    };

    const handleClose = () => {
        setOpen(false);
    };


    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: masterDataValidator.updateMusic,
        onSubmit: values => {
            listAPIs.addNewArtist(values)
                .then((res) => {
                    setShowAlert(true)
                    setAlertType(1)
                    setAlertMessage("Success Add New Music!")
                })
                .catch((err) => {
                    console.log(err.response.data.message);
                    setShowAlert(true)
                    setAlertType(2)
                    setAlertMessage(err.response.data.message)
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

            <button className="button-add-music" onClick={handleClickOpen}>Add New</button>
            <Dialog maxWidth='xs' fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div className="wrap-modals">
                    <div style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px', margin: '15px 15px 5px', fontSize: '20px' }} id="form-dialog-title" >Add New Music</div>
                    <form style={{ padding: '10px 15px 10px', margin: '0px 15px' }} onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <input placeholder="Artist Name" type="text" className="input-form form-control"
                                style={formik.touched.artistName && formik.errors.artistName ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="artistName" value={formik.values.artistName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.artistName && formik.errors.artistName}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder="Album Name" type="text" className="input-form form-control"
                                style={formik.touched.albumName && formik.errors.albumName ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="albumName" value={formik.values.albumName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.albumName && formik.errors.albumName}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder="Image Url" type="text" className="input-form form-control"
                                style={formik.touched.imageURL && formik.errors.imageURL ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="imageURL" value={formik.values.imageURL} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.imageURL && formik.errors.imageURL}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: 'gray' }}>Release Date</label>
                            <input placeholder="Release Date" type="date" className="input-form form-control"
                                style={formik.touched.releaseDate && formik.errors.releaseDate ? { border: '1px solid red' } : { border: '1px solid #ced4da' }}
                                name="releaseDate" value={formik.values.releaseDate} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            <div className="feedback-error">{formik.touched.releaseDate && formik.errors.releaseDate}</div>
                        </div>
                        <div className="mb-3">
                            <div className="input-group" style={formik.touched.price && formik.errors.price ? { border: '1px solid red', borderRadius: '5px' } : { border: '1px solid #ced4da', borderRadius: '5px' }}>
                                <input placeholder="Price" type="number" className="form-control" aria-label="Amount (to the nearest dollar)" name="price" value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                <span style={{ margin: '0px' }} className="input-group-text">円</span>
                            </div>
                            <div className="feedback-error">{formik.touched.price && formik.errors.price}</div>
                        </div>
                        <div className="mb-3">
                            <input placeholder="Sample Url" type="text" className="input-form form-control"
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
