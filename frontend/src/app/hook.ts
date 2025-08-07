import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store";

export type AppDispatch = typeof store.dispatch; 
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
