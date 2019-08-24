var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var timetableSchema = new Schema({
    day : {type: String, required: true},
    venue: {type: String, required: true},
    class : {type: String, required: true},
    start : {type: Number, required: true, min: 7, max: 18},
    end : {type: Number, required: true, min: 8, max: 19}
})

timetableSchema
.virtual('classSpan')
.get(function() {
    return (this.start - this.end).toString();
})

module.exports = mongoose.model('Timetable', timetableSchema);