
import { uploadOneImage, uploadMultipleImages } from '../services/cloudinary.service.js'

export const uploadSingle = async (req, res, next) => {
  if (!req.file) {
    return next()
  }

  try {
    const imageUrl = await uploadOneImage(req.file.buffer)
    req.body[req.file.fieldname] = imageUrl
    next()
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error })
  }
}

export const uploadMultiple = async (req, res, next) => {
  const files = req.files 

  if (!files || files.length === 0) {
    return next()
  }

  try {
    const imageUrls = await uploadMultipleImages(files.map((file) => file.buffer))
    req.body[files[0].fieldname] = imageUrls
    next()
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error })
  }
}