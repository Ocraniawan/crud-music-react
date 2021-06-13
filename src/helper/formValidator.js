import * as Yup from 'yup'

const updateMusic = Yup.object({
    artistName: Yup.string()
        .required("Artist Name must be filled!")
        .min(3, "minimum 3 characters"),
    albumName: Yup.string()
        .required("Album Name must be filled!")
        .min(3, "minimum 3 characters"),
    imageURL: Yup.string()
        .required("Image Url Name must be filled!")
        .min(3, "minimum 3 characters"),
    releaseDate: Yup.string()
        .required("Release Date must be filled!")
        .min(3, "minimum 3 characters"),
    price: Yup.number()
        .required("Price must be filled!"),
    sampleURL: Yup.string()
        .required("Sample Url must be filled!")
        .min(3, "minimum 3 characters"),
})


const masterDataValidator = {
    updateMusic,
}

export default masterDataValidator