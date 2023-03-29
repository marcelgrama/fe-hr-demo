import { createReducer } from "@reduxjs/toolkit";
import { getAllFreelancers, getSelectFreelancer } from "./actions";

export type FreelancersState = {
  data: { items?: any };
  selectedFreelancer: {
    freelancerId: string,
    name: string,
    freelancerData: {
      title: string,
      location: string | boolean | null,
      yearsOfExperience: string | null,
      profileDescription: string
      phone: string,
      email: string,
      linkedIn: string,
      github: string
    },
    freelancerExperience: [{
      title: string,
      startDate: string,
      endDate: string,
      description: string
    }],
    freelancerEducation: string,
  };
  pending: boolean;
  error: boolean;
};

export type Payload = {
  data: { boards: { items: any[] }[] };
};

const freelancersInitialState: FreelancersState = {
  data: { items: [] },
  selectedFreelancer: {
    freelancerId: '',
    name: '',
    freelancerData: {
      title: '',
      location: '',
      yearsOfExperience: null,
      profileDescription: '',
      phone: '',
      email: '',
      linkedIn: '',
      github: ''
    },
    freelancerExperience: [{
      title: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    freelancerEducation: '',
  },
  pending: false,
  error: false,
};


const extractColumnValues = (payload: Payload) => {
  return payload.data.boards[0].items.map((item) => {
    const newItem = {
      [item.id]: {
        skills: item?.column_values[0]?.text ?? '',
        profilePhoto: item?.column_values[1]?.text ?? '',
        name: item?.name ?? '',
        id: item?.id ?? ''
      }
    }
    return newItem
  }
  )
}

export const freelancersReducer = createReducer(
  freelancersInitialState,
  (builder) => {
    builder
      .addCase(getAllFreelancers.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllFreelancers.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = {
          ...payload.data.boards[0],

          items: extractColumnValues(payload).reduce((acc, item) => {
            return { ...acc, ...item };
          }, {}),
        };
      })
      .addCase(getAllFreelancers.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
      .addCase(getSelectFreelancer.pending, (state) => {
        state.pending = true;
      })
      .addCase(getSelectFreelancer.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.selectedFreelancer = {
          freelancerId: payload?.freelancerId || '',
          name: payload?.data?.items[0]?.name || '',
          freelancerData: {
            title: payload.data.items[0].column_values[0].text || null,
            location: payload.data.items[0].column_values[5]?.text || null,
            yearsOfExperience: payload.data.items[0].column_values[6]?.text ?? null,
            profileDescription: payload.data.items[0].column_values[4]?.text ?? '',
            phone: payload.data.items[0].column_values[3]?.text ?? '',
            email: payload.data.items[0].column_values[2]?.text ?? '',
            linkedIn: payload.data.items[0].column_values[1]?.text ?? ''
          },
          freelancerExperience: [...payload?.data?.items[0]?.subitems ?? []],
        };
      })
      .addCase(getSelectFreelancer.rejected, (state) => {
        state.pending = false;
        state.error = true;
      })
  }
);

export default freelancersReducer;
