import { createSlice } from '@reduxjs/toolkit';
import {
  updateExperience,
  addExperience,
  deleteExperience,
  updateExperienceForm,
  updateEducation,
  addEducation,
  deleteEducation,
  updateEducationForm,
  profileEditor,
  updateIntroduction,
  clearForms
} from './actions';

type CounterState = {
  introduction: {
    firstName: string,
    lastName: string,
    headline: string,
    location: string,
    phone: string,
    email: string,
    github: string,
    linkedin: string,
    about: string,
  },
  experience: [{
    title: string,
    startDate: string,
    endDate: string,
    description: string,
  }],
  education: [{
    title: string,
    startDate: string,
    endDate: string,
  }],
  profileEditor: boolean
};
const initialState: CounterState = {
  introduction: {
    firstName: '',
    lastName: '',
    headline: '',
    location: '',
    phone: '',
    email: '',
    github: '',
    linkedin: '',
    about: '',
  },
  experience: [{
    title: '',
    startDate: '',
    endDate: '',
    description: ''
  }],
  education: [{
    title: '',
    startDate: '',
    endDate: '',
  }],
  profileEditor: false
};

let experienceField = {
  title: '',
  startDate: '',
  endDate: '',
  description: ''
}
let educationField = {
  title: '',
  startDate: '',
  endDate: '',
}


export const freelanceProfileFormReducer = createSlice({
  name: 'freelanceProfileFormReducer',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder



      /* Experience */
      .addCase(addExperience, (state, action) => {
        state.experience = [...state.experience, experienceField];
      })
      .addCase(updateExperience, (state, action) => {
        state.experience = action.payload && action.payload;
      })
      .addCase(deleteExperience, (state, action) => {
        let data = [...state.experience];
        data.splice(action.payload.index, 1);
        state.experience = data;
      })
      .addCase(updateExperienceForm, (state, action) => {
        const { index, experience } = action.payload;
        state.experience[index] = experience;
      })



      /* Education */
      .addCase(addEducation, (state, action) => {
        state.education = [...state.education, educationField];
      })
      .addCase(updateEducation, (state, action) => {
        state.education = action.payload && action.payload;
      })
      .addCase(deleteEducation, (state, action) => {
        let data = [...state.education];
        data.splice(action.payload.index, 1);
        state.education = data;
      })
      .addCase(updateEducationForm, (state, action) => {
        const { index, education } = action.payload;
        state.education[index] = education;
      })
      /* Dialog Editor */
      .addCase(profileEditor, (state, action) => {
        state.profileEditor = action.payload;
      })
      .addCase(updateIntroduction, (state, action) => {
        state.introduction = action.payload;
      })
      .addCase(clearForms, (state, action) => {
        state.introduction = initialState.introduction;
        state.education = initialState.education
        state.experience = initialState.experience
      });
  }
})
