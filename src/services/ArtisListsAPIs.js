import instance from './Axios'

const getListArtists = () => {
    return instance.get('artist')
}

const getArtistById = (id) => {
    return instance.get(`artist/${id}`)
}

const addNewArtist = (data) => {
    return instance.post('artist/addArtist', data)
}

const UpdateArtist = (id, data) => {
    return instance.put(`artist/${id}`, data)
}

const DeleteArtist = (id) => {
    return instance.delete(`artist/${id}`)
}

const listAPIs = {
    getListArtists,
    getArtistById,
    addNewArtist,
    UpdateArtist,
    DeleteArtist
}

export default listAPIs