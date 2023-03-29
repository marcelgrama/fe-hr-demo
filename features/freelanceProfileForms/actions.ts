import { createAction } from '@reduxjs/toolkit';

export const profileEditor = createAction<any>('freelanceProfileForms/profileEditor');

export const updateExperience = createAction<any>('freelanceProfileForms/updateExperience');
export const addExperience = createAction<any>('freelanceProfileForms/addExperience');
export const deleteExperience = createAction<any>(
  'freelanceProfileForms/deleteExperience'
);
export const updateExperienceForm = createAction<any>(
  'freelanceProfileForms/updateExperienceForm'
);

export const updateEducation = createAction<any>('freelanceProfileForms/updateEducation');
export const addEducation = createAction<any>('freelanceProfileForms/addEducation');
export const deleteEducation = createAction<any>(
  'freelanceProfileForms/deleteEducation'
);
export const updateEducationForm = createAction<any>(
  'freelanceProfileForms/updateEducationForm'
);

export const updateIntroduction = createAction<any>('freelanceProfileForms/updateIntroduction');

export const clearForms = createAction('freelanceProfileForms/clearForms');


