import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../services/api'

export function useCurrentUser(){
  const user = useSelector(selectCurrentUser);
  return user
}