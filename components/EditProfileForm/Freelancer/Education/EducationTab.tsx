import { Button, Box, FormControl } from '@mui/material';
import { useRef, useState } from 'react';
import EducationForm from './EducationForm';
import { useAppDispatch } from '../../../../store/hooks';
import {
  addEducation as addEducationAction,
  deleteEducation as deleteEducationAction,
} from '../../../../features/freelanceProfileForms';

const EducationTab = ({ educationData }) => {
  const dispatch = useAppDispatch();
  const [education, setEducation] = useState(educationData);

  let eduData = useRef(educationData);

  const addEducation = () => {
    dispatch(addEducationAction(eduData));
  };

  const deleteEducation = (index) => {
    dispatch(deleteEducationAction({ education, index }));
  };

  return (
    <>
      <FormControl fullWidth={true}>
        {educationData &&
          educationData.map((tab, index) => {
            return (
              <EducationForm
                tab={tab}
                key={`${index}_education`}
                index={index}
                deleteEducation={deleteEducation}
              />
            );
          })}
      </FormControl>
      <Box>
        <Button color='secondary' onClick={addEducation}>
          Add Education
        </Button>
      </Box>
    </>
  );
};

export default EducationTab;
