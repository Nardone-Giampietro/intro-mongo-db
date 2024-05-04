const mongoose = require('mongoose')
const Project = require('./project')
const cdnUrl = 'https://cdn.adminapp.com'

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: ['active'],
      enum: ['active', 'trialing', 'overdue', 'canceled']
    },
    last4: {
      type: Number,
      min: 4,
      max: 4
    }
  }
})

orgSchema.post("deleteOne", async function(doc) {
  const orgId = doc._id;
  await Project.deleteMany({org: orgId});
});

const orgVirtual_avatar = orgSchema.virtual('avatar');
orgVirtual_avatar.get(function () {
  const fillURL = cdnUrl.concat(this.id);
  return fillURL;
});

module.exports = mongoose.model('org', orgSchema)
