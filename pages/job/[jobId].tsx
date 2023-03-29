import React, { FC, useEffect, useState } from 'react';
import JobDescriptionComponent from '../../components/JobDescriptionComponent';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getJobDescriptionById, getJobByJobId } from '../../features/jobs';

const JobPage: FC = () => {
  const dispatch = useAppDispatch();
  const [id, setJobId] = useState('');

  const router = useRouter();
  const { jobId } = router.query;

  const jobData = useAppSelector(getJobByJobId(id)) || {};

  const getJobById = (jobId: string | string[]) => {
    if (typeof jobId === 'string') {
      dispatch(getJobDescriptionById(jobId));
      setJobId(jobId);
    }
  };

  useEffect(() => {
    jobId && getJobById(jobId);
  }, [jobId]);

  return (
    <>
      <JobDescriptionComponent data={jobData} />
    </>
  );
};

export default JobPage;
