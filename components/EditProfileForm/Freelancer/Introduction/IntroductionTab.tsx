import { useState, useEffect, useRef } from 'react';
import { Autocomplete, Grid, Chip, Box, TextField } from '@mui/material';

const Introduction = ({ introductionData, saveTabChanges, indexTab }) => {
  const [skills, setSkills] = useState<string[]>([]);

  const [introduction, setIntroduction] = useState(introductionData);
  const introRef = useRef(introduction);

  const handleFormChange = (data) => {
    const { name, value } = data;
    setIntroduction({ ...introduction, [name]: value });
  };

  useEffect(() => {
    introRef.current = introduction;
    return () => saveTabChanges(introRef.current);
  }, [introduction, indexTab]);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <TextField
              label='First Name'
              name='firstName'
              required
              fullWidth
              value={introduction.firstName}
              onChange={(e) => handleFormChange(e.target)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='Last Name'
              name='lastName'
              fullWidth
              required
              value={introduction.lastName}
              onChange={(e) => handleFormChange(e.target)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='Headline'
              name='headline'
              fullWidth
              value={introduction.headline}
              onChange={(e) => handleFormChange(e.target)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name='location'
              value={introduction.location}
              onChange={(e) => handleFormChange(e.target)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <TextField
              label='Phone'
              fullWidth
              required
              name='phone'
              value={introduction.phone}
              onChange={(e) => handleFormChange(e.target)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name='email'
              label='Email'
              fullWidth
              value={introduction.email}
              variant='filled'
              disabled={true}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='Github URL'
              name='github'
              fullWidth
              value={introduction.github}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name='linkedin'
              label='Linkedin URL'
              fullWidth
              value={introduction.linkedin}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              label='About'
              fullWidth
              required
              multiline
              rows={4}
              name='about'
              value={introduction.about}
              onChange={(e) => handleFormChange(e.target)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={[]}
              value={[]}
              freeSolo
              onChange={(e, value) => setSkills((state) => value)}
              renderTags={(
                value: any[],
                getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes
              ) =>
                value.map((option: any, index: any) => {
                  return (
                    <Chip
                      key={index}
                      variant='outlined'
                      label={option}
                      {...getTagProps({ index })}
                    />
                  );
                })
              }
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label='Skills'
                  placeholder='Add skills'
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default Introduction;
