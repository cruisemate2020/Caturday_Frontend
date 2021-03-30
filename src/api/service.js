// api/service.js

import axios from 'axios';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:5000/api`
  });

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export function handleUpload(theFile) {
    // console.log('file in service: ', theFile)
    return service
      .post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  }

export function saveNewThing(newThing) {
    // console.log('new thing is: ', newThing)
    return service
      .post('/rescue-story', newThing)
      .then(res => res.data)
      .catch(errorHandler);
  }
