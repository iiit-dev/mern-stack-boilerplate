import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
  });
  const Form = mongoose.model('Form', formSchema);
export default Form