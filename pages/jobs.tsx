import React, { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllJobs, jobsSelector } from '../features/jobs';
import JobsComponent from '../components/JobsComponent';

const JobsPage: FC = () => {
  const dispatch = useAppDispatch();
  const jobsData = useAppSelector(jobsSelector) || {};
  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  return (
    <>
      <JobsComponent jobsData={jobsData} />
    </>
  );
};

export default JobsPage;
