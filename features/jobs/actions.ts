import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllJobs = createAsyncThunk('jobs', async () => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${mondayAccessToken}`,
    },
  };

  const response = await axios.post(
    mondayApi,
    {
      query: `query 
      { 
        items_by_column_values (board_id: 2261402279, column_id: "status", column_value: "Project open") 
        { 
          id 
          name 
          column_values(ids: ["status", "text1", "text7", "date_1", "date_17", "text6"]) {value text }}
         }
      `,
    },
    options
  );

  return response.data;
});

export const getJobDescriptionById = createAsyncThunk('jobs/jobsDescription', async (jobId: string) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${mondayAccessToken}`,
    },
  };

  const response = await axios.post(
    mondayApi,
    {
      query: `query {
        items (ids: [${jobId}]) {
            name
            subitems {
              id
              name
              column_values {
                id
                value
                text
              }
            }
          }
        }`,
    },
    options
  );

  return { ...response?.data, jobId };
});