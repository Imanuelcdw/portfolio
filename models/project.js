const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
      slugPaddingSize: 3,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    image: {
      type: Array,
      required: [true, 'Please provide image'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)
