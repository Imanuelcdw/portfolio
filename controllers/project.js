const Project = require('../models/project')
const asyncHandler = require('express-async-handler')
const { google } = require('googleapis')
const stream = require('stream')

class ProjectController {
  static all = asyncHandler(async (req, res) => {
    const data = await Project.find()
    res.status(200).json({ success: true, count: data.length, data })
  })

  static show = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const data = await Project.findOne({ slug })
    res.status(200).json({ success: true, data })
  })

  static store = asyncHandler(async (req, res) => {
    const { body, files } = req
    body.image = []
    for (const index in files) {
      const fileName = `${new Date().getTime()}${index}`
      const data = await this.uploadFile(files[index], fileName)
      body.image.push(`https://drive.google.com/uc?id=${data}`)
    }
    const data = await Project.create(body)
    res.status(200).json({ success: true, data })
  })

  static update = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const { body, files } = req
    delete body.image
    if (files && files != []) {
      body.image = []
      for (const index in files) {
        const fileName = `${new Date().getTime()}${index}`
        const data = await this.uploadFile(files[index], fileName)
        body.image.push(`https://drive.google.com/uc?id=${data}`)
      }
    }
    const data = await Project.findOneAndUpdate({ slug }, body, { new: true })
    res.status(200).json({ success: true, data })
  })

  static destroy = asyncHandler(async (req, res) => {
    const { slug } = req.params
    await Project.findOneAndDelete({ slug })
    res.status(200).json({ success: true })
  })

  static uploadFile = async (fileObject, fileName) => {
    const bufferStream = new stream.PassThrough()
    bufferStream.end(fileObject.buffer)
    const auth = new google.auth.GoogleAuth({
      keyFile: './api-key.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    })
    const { data } = await google.drive({ version: 'v3', auth }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileName,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
      fields: 'id,name',
    })
    return data.id
  }
}

module.exports = ProjectController
