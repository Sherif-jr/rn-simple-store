import { StoreDispatch, StoreState } from "@/store";
import { useSelector, useDispatch } from "react-redux";

export const useAppSelector = useSelector.withTypes<StoreState>();
export const useAppDispatch = useDispatch.withTypes<StoreDispatch>();
