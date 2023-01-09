import { configureStore } from '@reduxjs/toolkit';
import { apiProjects } from './api/apiProjects';
import {apiTasks} from "./api/apiTasks";

const store = configureStore({
  reducer: {
    [apiProjects.reducerPath]: apiProjects.reducer,
    [apiTasks.reducerPath]: apiTasks.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiProjects.middleware)
    .concat(apiTasks.middleware)
});

export default store;