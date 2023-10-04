import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./types"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector