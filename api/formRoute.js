import { Router } from 'express';
import Form from './formModel.js';
const router = Router();
router.post('/submit', async (req, res,next) => {
    const newForm = new Form(req.body);
    try {
        const savedForm = await newForm.save()
        res.status(200).json(savedForm)

    }
    catch (err) {
        next(err)
    }
});
router.get('/', async (req, res,next) => { // http://localhost:5000/api/form
    console.log('hey im a get request')
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (err) {
next(err)
    
    }
});
// New route to delete a form
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.id);
        if (!deletedForm) {
            res.status(404).json('Form not found');
        } else {
            res.status(200).json('Form deleted successfully');
        }
    } catch (err) {
        next(err)
    }
});

export default router;
