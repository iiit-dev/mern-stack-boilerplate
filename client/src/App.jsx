import React, { useState, useEffect } from 'react';
import axios from 'axios';
// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, TextField } from '@mui/material';
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1px solid white'

          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: '1px solid white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid white'

          },
        },
      },
    },
  },
});

const App = () => {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchForms();
  }, []);
  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/form');
      setForms(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/form/delete/${id}`);
      setForms(forms.filter((form) => form._id !== id));
    } catch (error) {
      setError('Error deleting form');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/form/submit', form);
      setForms([...forms, response.data]);
      setForm({ name: '', email: '' });
    } catch (error) {
      setError('Error submitting form');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box pb={'10px'}>
        <Box textAlign={'center'} m={'10px'} >
        <h2>Submit New Form</h2>
        </Box>
        <Box sx={{display:'flex',gap:'10px',justifyContent:'center'}} component={'form'} onSubmit={handleSubmit}>
          <TextField
            sx={{
              input: {
                color: 'white',
                '&::placeholder': {
                  color: 'white',
                  opacity: 1, // Ensure the placeholder is fully opaque
                },
              }
            }}
            type="text"
            variant="outlined"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <TextField
             sx={{
              input: {
                color: 'white',
                '&::placeholder': {
                  color: 'white',
                  opacity: 1, // Ensure the placeholder is fully opaque
                },
              }
            }}
            variant="outlined"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <Button type="submit" variant="contained"> Submit</Button>
        </Box>
        {/*  */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Box sx={{ mt: '10px', display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%', justifyContent: 'center', mx: 'auto' }} >
            {/* boxShadow: '10px 10px 44px 24px rgba(25,118,210,0.75)' */}

            {forms.map((form) => (
              <Card sx={{ boxShadow: '10px 10px 44px 24px rgba(25,118,210,0.05)', bgcolor: '#1E1E1E', color: 'white', width: '25%' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {form.name}
                  </Typography>
                  <Typography variant="body2" color="white">
                    {form.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button bgcolor='red' onClick={() => handleDelete(form._id)} color='error' size="small">Delete</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
export default App;
