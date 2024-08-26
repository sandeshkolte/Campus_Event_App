import multer, { memoryStorage } from 'multer'

const storage = memoryStorage()
const upload = multer({ storage: storage })

export default upload