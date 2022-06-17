import React from 'react'
import apiClient from './apiClient'
import { CONFIG } from './config'

const localenv = CONFIG.DEV;

export const makeReservation = (string: string) => {
  /* FIXME: not complete */
  return apiClient.post(
    localenv.api.paths.checkName,
    {
        headers: {"Content-Type": "application/json"}
    }
).then(function(response) {
    console.log(response.data)
    if (response.data.value === true) {
        return Promise.resolve(true)
    } else {
        return Promise.resolve(false)
    }
}).catch(function(error) {
    console.log(error);
    return Promise.reject("Error checking name availability")
});

}