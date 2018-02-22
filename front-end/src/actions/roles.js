import {
  FETCH_ROLES_REQUEST, FETCH_ROLES_SUCCESS, FETCH_ROLES_FAILURE
} from '../actionTypes'

import { thunkCreator } from './utils'

export const fetchRoles = () => thunkCreator({
  types: [
    FETCH_ROLES_REQUEST,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_FAILURE
  ],

  promise: fetch('/api/roles')
             .then(response => response.json())
});