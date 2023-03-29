import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllFreelancers = createAsyncThunk("freelancers", async () => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${mondayAccessToken}`,
    },
  };
  const response = await axios.post(
    mondayApi,
    {
      query: `query { boards (ids: 2261405041) { 
          name
          state
          board_folder_id
          items {
            id
            name
            column_values(ids: ["text17", "files1"]) {value text}
          }
        }}`,
    },
    options
  );

  return response.data;
});

export const getSelectFreelancer = createAsyncThunk("freelancers/getSelectFreelancer", async (freelancerId: string) => {

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${mondayAccessToken}`,
    },
  };
  const response = await axios.post(
    mondayApi,
    {
      query: `query {
        items (ids: [${freelancerId}]) {
            name
            column_values(ids: ["text","text3", "location", "numbers","text1", "email", "text5"]) {value text}
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

  return { ...response?.data, freelancerId };
});
