import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const taskSchema = mongoose.Schema({
  titulo: String,
  descricao: String,
  done: { type: Boolean, default: false }
})

taskSchema.plugin(timestamp);

export default mongoose.model('Task', taskSchema);