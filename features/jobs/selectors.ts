import { RootState } from '../../store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectJobs = (state: RootState) => state?.jobs;
export const selectJobDescription = (state: RootState) => state?.jobs?.selectedJob;


export const jobsSelector = createSelector(
  selectJobs,
  (state) => state
);

export const getJobDescription = createSelector(
  selectJobDescription,
  (state) => state?.jobDescription
);

export const getJobByJobId = (id: string) => createSelector(
  jobsSelector,
  getJobDescription,
  (state, jobDescriptionState) => {
    return {
      ...state?.data?.items[Number(id)],
      ...jobDescriptionState
    }
  }
);
