import React, { FC, memo, useState, SyntheticEvent } from 'react';
import useCallback from 'react';
import useEffect from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Tabs,
  Tab,
  Chip,
  FormControl,
  Checkbox,
  Autocomplete,
  TextField,
  ListItem
} from '@mui/material';

type ItemType = {
  budget?: string;
  desiredSkills?: string;
  startDate?: string;
  endDate?: string;
  availabilityNeeded?: string;
  name?: string;
  id?: string;
};

type ItemsType = {
  items: {
    [index: number]: ItemType;
  };
};

type JobsDataType = {
  data?: ItemsType;
  selectedJob: {
    jobId: string;
    name: string;
    jobDescription: {
      aboutClient: string;
      aboutPosition: string;
      requirements: string;
    };
  };
  pending: boolean;
  error: boolean;
};

interface IJobs {
  jobsData: JobsDataType;
}

type skillList =  string[];



const JobsComponent: FC<IJobs> = memo(({ jobsData }) => {
  // Job State
  const [{ data, pending, error }, setJobsData] = useState(jobsData);
  const [skills, setSkills] = useState([] as skillList);


  useEffect(() => {
    // Set Skills State
    const skills = skillList();
    setSkills(skills);
  }, [jobsData])

  // Get all skills from jobs
  const skillList = useCallback(() => {
    let skillsArr = [] as skillList;
    const {data} = jobsData
    const {items}  = data as ItemsType

    items && Object.values(items).map((elem:ItemType) => {
      let skills = elem?.desiredSkills?.split(',');
      let trimedSkills = skills && skills.map(element => {
        return element.trim();
      });
      trimedSkills && skillsArr.push(...trimedSkills);
    })

    
    return [...new Set(skillsArr)];
  },[jobsData])



  // Filter out jobs by skills
  const handleChangeSkills = useCallback((event: SyntheticEvent, value: string[]) => {
    let filteredJobs = [] as any;
    if (value.length === 0) {
      let data = jobsData?.data?.items
      filteredJobs = data as ItemType[];
    }

    jobsData?.data && Object.values(jobsData?.data?.items).map(e => {
      let skills = e.desiredSkills;
      Object.values(value).map(valueEl => {
        if (skills?.includes(valueEl)) {
          filteredJobs.push(e)
        }
      });

    })
    
    setJobsData({
      ...jobsData,
      data: {
        items: filteredJobs
      },
    })
  },[])


  // Tabs State
  const [value, setValue] = useState(0);
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  type TabIndexes = { [index: string]: string };
  const tabIndexes: TabIndexes = {
    '0': 'Open Jobs',
    '1': 'My Candidates',
    '2': 'My Applications',
  };

  return (
    <>
      <Box>
        <Grid sx={{ pt: 10, bgcolor: 'primary.black' }}>
          <Container maxWidth="lg">
            <Grid>
              <Typography sx={{ color: 'primary.black800', fontWeight: 'bold', userSelect: 'none', fontSize: { lg: '128px', xs: '14vw' } }}>
                {tabIndexes[value.toString()]}
              </Typography>
            </Grid>
            <Box sx={{ bgcolor: 'primary.black', pb: '1px' }}>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                variant='scrollable'
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label='scrollable force tabs example'
                sx={{ mb: '-1px' }}
                TabIndicatorProps={{ style: { background: '#fff', height: 5 } }}
              >
                <Tab className='primary' label='Open Jobs' />
                <Tab className='primary' label='My Candidates' />
                <Tab className='primary' label='My Applications' />
              </Tabs>
            </Box>
          </Container>
        </Grid>
        <Grid sx={{ bgcolor: 'primary.grey' }}>
          <Container>
            <Grid container sx={{ py: 8, pt: 4, bgcolor: 'primary.white' }}>
              <Grid item md={10} xs={12} sx={{ mx: 'auto', px: { xs: 2 } }} >
                {tabIndexes[value.toString()] === 'Open Jobs' && (
                  <>
                    {!jobsData?.data?.items && (
                      <Typography component='div' variant='h5'>
                        Loading ...
                      </Typography>
                    )}
                    {jobsData?.data?.items && (
                      <Grid item container columnSpacing={4} sx={{ position: 'sticky', top: 80, zIndex: 10, pt: 2 }}>
                        <Grid item xs={12}>
                          <FormControl fullWidth sx={{backgroundColor: 'primary.white'}}>
                            <Autocomplete
                              multiple
                              id="job_categories"
                              options={skills}
                              disableCloseOnSelect
                              onChange={handleChangeSkills}
                              getOptionLabel={(option) => option}
                              renderOption={(props, option, { selected }) => (
                                <ListItem {...props} sx={{fontSize: '14px'}}>
                                  <Checkbox
                                    sx={{ py: '2px' }}
                                    size="small"
                                    checked={selected}
                                  />
                                  {option}
                                </ListItem>
                              )}
                              renderInput={(params) => (
                                <TextField {...params} label="Categories" placeholder="search" />
                              )}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    )}
                    {data && data.items && Object.values(data.items).map((item: ItemType, index: number) => (
                      <Grid item key={index} container columnSpacing={4} sx={{ pt: 5 }}>
                        <Grid item xs={12} sx={{ mb: 4 }}>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            {item?.name}
                          </Typography>
                          {!item?.budget || item?.budget !== 'unknown' && (
                            <Typography sx={{ fontWeight: '600', fontSize: '14px', mt: 0.5 }}>
                              Budget: {item?.budget}
                            </Typography>
                          )}

                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box>
                            <Box sx={{ fontSize: '14px', mb: 2 }}>
                              {item?.availabilityNeeded && (
                                <>
                                  <Typography sx={{ fontWeight: '600', fontSize: 'inherit' }}>Availability</Typography>
                                  <Typography sx={{ fontSize: 'inherit' }}>{item?.availabilityNeeded}</Typography>
                                </>
                              )}

                            </Box>
                            <Button sx={{ mt: 2 }} href={`/job/${item?.id}`} color="secondary">
                              Propose Candidate
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{mt: {xs: 3, sm: 3, md: 0}}}>
                          <Box sx={{ fontSize: '14px' }}>
                            {item?.startDate && (
                              <>
                                <Typography sx={{ fontWeight: '600', fontSize: 'inherit' }}>
                                  Start  / Duration
                                </Typography>

                                <Typography sx={{ fontSize: 'inherit' }}>
                                  {item?.startDate}
                                </Typography>
                              </>
                            )}
                          </Box>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{mt: {xs: 3, sm: 3, md: 0}}}>
                          <Typography sx={{ fontWeight: '600', fontSize: '14px' }}>Required Skills</Typography>
                          <Box sx={{ ml: '-5px' }}>
                            {item?.desiredSkills?.split(',').map((e, i) => {
                              return <Chip
                                key={i + e}
                                label={e ? e : ''}
                                size='medium'
                                color='primary'
                                sx={{ m: '5px !important' }}
                              />
                            })}
                          </Box>

                        </Grid>
                        <Grid item xs={12} sx={{pt: 5}}>
                          <Box sx={{borderBottom: 1, borderColor: 'primary.gray800'}}></Box>
                        </Grid>
                      </Grid>
                    ))}
                    {error && (
                      <Typography component='div' variant='h5'>
                        Error ...
                      </Typography>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Box>
    </>

  );
});

export default JobsComponent;
