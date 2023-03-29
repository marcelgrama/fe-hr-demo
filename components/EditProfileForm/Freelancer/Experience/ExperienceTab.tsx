import { Button, Box, FormControl } from '@mui/material';
import { useState, useRef } from 'react';
import { useAppDispatch } from '../../../../store/hooks';

import {
  addExperience as addExperienceAction,
  deleteExperience as deleteExperienceAction,
} from '../../../../features/freelanceProfileForms';
import ExperienceForm from './ExperienceForm';

const ExperienceTab = ({ experienceData }) => {
  const dispatch = useAppDispatch();
  const [experience, setExperience] = useState(experienceData);
  let expData = useRef(experienceData);

  const addExperience = () => {
    dispatch(addExperienceAction(expData));
  };
  const deleteExperience = (index, e) => {
    dispatch(deleteExperienceAction({ experience, index }));
  };

  return (
    <>
      <FormControl fullWidth={true}>
        {experienceData &&
          experienceData.map((tab, index) => {
            return (
              <ExperienceForm
                tab={tab}
                key={`${index}_experience`}
                index={index}
                deleteExperience={deleteExperience}
              />
            );
          })}
      </FormControl>
      <Box>
        <Button color='secondary' onClick={addExperience}>
          Add Experience
        </Button>
      </Box>
    </>
  );
};

export default ExperienceTab;
