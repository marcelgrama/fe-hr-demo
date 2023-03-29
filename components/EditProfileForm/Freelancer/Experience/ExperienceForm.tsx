import { Button, Box, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { updateExperienceForm } from '../../../../features/freelanceProfileForms';
import { useAppDispatch } from '../../../../store/hooks';

const ExperienceTab = ({ tab, key, index, deleteExperience }) => {

  const dispatch = useAppDispatch();
  const [experience, setExperience] = useState(tab);

  const handleFormChange = (data, index) => {
    const { name, value } = data;
    setExperience({ ...experience, [name]: value });
  };

  const updateExperience = () => {
    dispatch(updateExperienceForm({ experience, index }));
  };

  return (
    <>
      {experience && (
        <Box
          sx={{ mb: 5 }}
          key={key}
          onBlur={() => updateExperience()}
        >
          <Grid container spacing={5}>
            {index !== 0 && <Grid item xs={12}>
              <Box sx={{ borderBottom: '10px solid #f9f9f9' }}></Box>
            </Grid>}
            <Grid item xs={11} container spacing={5}>
              <Grid item xs={6}>
                <TextField
                  name='title'
                  label='Title'
                  fullWidth
                  value={experience.title}
                  onChange={(e) => handleFormChange(e.target, index)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label='Start Date'
                  type='date'
                  name='startDate'
                  value={experience.startDate}
                  onChange={(e) => handleFormChange(e.target, index)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label='End Date'
                  type='date'
                  name='endDate'
                  value={experience.endDate}
                  onChange={(e) => handleFormChange(e.target, index)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='description'
                  label='Description'
                  fullWidth
                  value={experience.description}
                  onChange={(e) => handleFormChange(e.target, index)}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Button
                color='secondary'
                className='default'
                value={index}
                onClick={() => deleteExperience(index)}
              >
                <DeleteIcon sx={{ pointerEvents: 'none' }} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ExperienceTab;
