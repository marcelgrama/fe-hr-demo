import React, { useEffect, FC } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getAllFreelancers,
  freelancersSelector,
} from '../features/freelancers';
import FreelancersComponent from '../components/FreelancersComponent';
import { getSession, useSession } from 'next-auth/react';

const FreelancersPage: FC = () => {
  const dispatch = useAppDispatch();
  const freelancersData = useAppSelector(freelancersSelector) || {};

  useEffect(() => {
    dispatch(getAllFreelancers());
  }, [dispatch]);

  return (
    <>
      <FreelancersComponent freelancersData={freelancersData} />
    </>
  );
};

export default FreelancersPage;