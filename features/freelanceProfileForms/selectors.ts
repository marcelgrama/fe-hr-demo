import { RootState } from '../../store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectFreelancerForm = (state: RootState) => state.freelanceForms;

export const freelancerExperienceFormData = createSelector(
  selectFreelancerForm,
  (state) => state.experience
);
export const freelancerIntroductionFormData = createSelector(
  selectFreelancerForm,
  (state) => state.introduction
);

export const freelancerEducationFormData = createSelector(
  selectFreelancerForm,
  (state) => state.education
);

export const profileEditorFormData = createSelector(
  selectFreelancerForm,
  (state) => state.profileEditor
);