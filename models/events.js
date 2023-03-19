import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: String,
    content: String,
    statu: Number
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);