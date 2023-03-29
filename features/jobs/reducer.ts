import { createReducer } from '@reduxjs/toolkit';
import { getAllJobs, getJobDescriptionById } from './actions';

export interface JobsState {
  data?: {
    items: {
      [index: number]: {
        budget?: string,
        desiredSkills?: string,
        startDate?: string,
        endDate?: string,
        availabilityNeeded?: string,
        name?: string,
        id?: string
      }
    }
  };
  selectedJob: {
    jobId: string,
    name: string,
    jobDescription: {
      aboutClient: string,
      aboutPosition: string,
      requirements: string
    }
  };
  pending: boolean;
  error: boolean;
};

export type Payload = {
  data: { items_by_column_values: any[]; };
};
export type ItemType = {
  column_values: { text: string, value: string }[],
  id: string,
  name: string
};


const initialState: JobsState = {
  data: {
    items: {},
  },
  selectedJob: {
    jobId: '',
    name: '',
    jobDescription: {
      aboutClient: '',
      aboutPosition: '',
      requirements: ''
    }
  },
  pending: false,
  error: false,
};

const extractColumnValues = (payload: Payload) => {
  if (payload?.data?.items_by_column_values) {
    return payload.data.items_by_column_values.map((item) => {
      const newItem = {
        [item?.id]: {
          budget: item?.column_values[1]?.text || '',
          desiredSkills: item?.column_values[2]?.text || '',
          startDate: item?.column_values[3]?.text || '',
          endDate: item?.column_values[4]?.text || '',
          availabilityNeeded: item?.column_values[5]?.text || '',
          name: item?.name || '',
          id: item?.id || ''
        }
      }
      return newItem
    }
    )
  }
  return []
}

export const jobsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllJobs.pending, (state) => {
      state.pending = true;
    })
    .addCase(getAllJobs.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = {
        items: extractColumnValues(payload).reduce((acc: any, item: any) => {
          return { ...acc, ...item };
        }, {}) || {},
      };
    })
    .addCase(getAllJobs.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(getJobDescriptionById.pending, (state) => {
      state.pending = true;
    })
    .addCase(getJobDescriptionById.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.selectedJob = {
        jobId: payload?.jobId || '',
        name: payload?.data?.items[0]?.name || '',
        jobDescription: {
          aboutClient: payload?.data?.items[0]?.subitems[0]?.column_values[0]?.text || '',
          aboutPosition: payload?.data?.items[0]?.subitems[0]?.column_values[1]?.text || '',
          requirements: payload?.data?.items[0]?.subitems[0]?.column_values[2]?.text || '',
        },
      };
    })
    .addCase(getJobDescriptionById.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
});

export default jobsReducer;
