const Project = require('../models/project')
const asyncHandler = require('express-async-handler')

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
    const data = await Project.create(req.body)
    res.status(200).json({ success: true, data })
  })

  static update = asyncHandler(async (req, res) => {
    const { slug } = req.params
    const data = await Project.findOneAndUpdate({ slug }, req.body, { new: true })
    res.status(200).json({ success: true, data })
  })

  static destroy = asyncHandler(async (req, res) => {
    const { slug } = req.params
    await Project.findOneAndDelete({ slug })
    res.status(200).json({ success: true })
  })
}

module.exports = ProjectController
