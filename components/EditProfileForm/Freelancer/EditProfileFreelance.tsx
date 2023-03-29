import { useState, ReactNode } from 'react';
import ExperienceTab from './Experience/ExperienceTab';
import EducationTab from './Education/EducationTab';
import IntroductionTab from './Introduction/IntroductionTab';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  freelancerExperienceFormData,
  freelancerEducationFormData,
  profileEditorFormData,
  profileEditor
} from '../../../features/freelanceProfileForms';


import {
  Button,
  Grid,
  Box,
  Tab,
  Tabs,
  Container,
  Dialog,
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup.string('Name').required('Name is required'),
  lastName: yup.string('Last Name').required('Last Name is required'),
  headline: yup.string('Headline').required('Headline is required'),
  location: yup.string('Location').required('Location is required'),
  phone: yup.string('Phone').required('Phone is required'),
  about: yup.string('About').required('Decription is required'),
  github: yup.string('Github URL'),
  linkedin: yup.string('Linkedin URL'),
  email: yup.string('Email'),
});


const TabPanel = (props: { children: ReactNode; tab: number; index: number; }) => {
  const { children, tab, index } = props;
  return <Grid role='tabpanel'>{tab === index && <>{children}</>}</Grid>;
};

const EditProfileFreelance = () => {
  
  const experience = useAppSelector(freelancerExperienceFormData) || {};
  const education = useAppSelector(freelancerEducationFormData) || {};
  const profileEditorData = useAppSelector(profileEditorFormData);
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState(0);
  const handleTabChange = (event: any, newValue: any) => {
    setTab(newValue);
  };


  const closeDialog = () => {
    dispatch(profileEditor(false))
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      headline: '',
      location: '',
      phone: '',
      about: '',
      github: '',
      linkedin: '',
      email: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: (values: any) => {

      alert(JSON.stringify(values, null, 2));
    },
  });

  return (

    <Dialog fullWidth maxWidth={'xl'} open={profileEditorData}>
      <Box sx={{ p: 5, pt: 0 }}>
        <Container maxWidth={'xl'}>
          <Box
            component='form'
            sx={{ width: '100%' }}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                TabIndicatorProps={{ style: { background: '#000', height: 5 } }}
              >
                <Tab
                  className='secondary'
                  label='Edit intro'
                  sx={{ p: 5, px: 7 }}
                />
                <Tab
                  className='secondary'
                  label='Edit Experience'
                  sx={{ p: 5, px: 7 }}
                />
                <Tab
                  className='secondary'
                  label='Edit Education'
                  sx={{ p: 5, px: 7 }}
                />
              </Tabs>
            </Box>
            <Box sx={{ py: 5 }}>
              <TabPanel tab={tab} index={0}>
                <IntroductionTab
                  formik={formik}
                />
              </TabPanel>
              <TabPanel tab={tab} index={1}>
                <ExperienceTab
                  experienceData={experience}
                />
              </TabPanel>
              <TabPanel tab={tab} index={2}>
                <EducationTab
                  educationData={education} />
              </TabPanel>
            </Box>
            <Box>
              <Box sx={{ textAlign: 'right' }}>
                <Button className='ternary small' sx={{ mr: { xs: 0, md: 1 } }} onClick={closeDialog}>
                  Cancel
                </Button>
                <Button type='submit' color='secondary' className='small'>
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
};

export default EditProfileFreelance;
