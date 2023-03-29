import React, { FC, useEffect, useState } from 'react';
import ProfileComponent from '../../components/Profile';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSelectFreelancer,
  getFreelancerSelector,
  getSkillByFreelancerId,
} from '../../features/freelancers';

const PorfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const [id, setProfileId] = useState('');

  const router = useRouter();
  const { profileId } = router.query;

  const freelancerData = useAppSelector(getFreelancerSelector);

  const getFreelancerSkillsById =
    useAppSelector(getSkillByFreelancerId(id)) || {};

  const getProfileId = (profileId: string | string[]) => {
    if (typeof profileId === 'string') {
      dispatch(getSelectFreelancer(profileId));
      setProfileId(profileId);
    }
  };

  useEffect(() => {
    profileId && getProfileId(profileId);
  }, [profileId]);

  return (
    <>
      <ProfileComponent
        data={freelancerData}
        skills={getFreelancerSkillsById}
      />
    </>
  );
};

export default PorfilePage;
