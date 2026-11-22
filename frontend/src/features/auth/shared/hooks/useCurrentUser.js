import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../services/api'

export default function useCurrentUser(){
  const userState = useSelector(selectCurrentUser);
  return userState
}