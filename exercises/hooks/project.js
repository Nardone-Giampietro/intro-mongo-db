const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'org',
    required: true
  },
  dueOn: Date,
  budget: {
    type: Number,
    default: 0
  },
  spent: {
    type: Number,
    default: 0
  },
  onTrack: {
    type: Boolean,
    default: false
  }
});

projectSchema.index({
  org: 1,
  name: 1
},{
  unique: true
});

const projectVirtual_budget = projectSchema.virtual('budgetLeft');
projectVirtual_budget.get(function () {
  return (this.budget - this.spent);
});

module.exports = mongoose.model('project', projectSchema)
