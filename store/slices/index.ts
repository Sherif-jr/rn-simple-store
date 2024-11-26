import cacheReducer, { CacheState } from "./cacheSlice";
import userPrefReducer, { UserPrefState } from "./userPrefSlice";

const slices = {
  cache: cacheReducer,
  userPref: userPrefReducer,
};
export interface SlicesType {
  cache: CacheState;
  userPref: UserPrefState;
}

export default slices;
