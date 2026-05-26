import axios from 'axios'

export async function subirImagen(file) {

  const formData = new FormData()

  formData.append('file', file)

  formData.append(
    'upload_preset',
    'vivero_upload'
  )

  const cloudName = 'dl4deswbo'

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const response = await axios.post(
    url,
    formData
  )

  return response.data.secure_url
}