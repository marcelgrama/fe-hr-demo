import { RootState } from '../../store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectFreelancers = (state: RootState) => state.freelancers;

export const freelancersSelector = createSelector(
  selectFreelancers,
  (state) => state
);

export const getFreelancerSelector = createSelector(
  selectFreelancers,
  (state) => state.selectedFreelancer
);

export const getSkillByFreelancerId = (id: string) => createSelector(
  selectFreelancers,
  (state) =>
    [state?.data?.items[id]?.skills]

);