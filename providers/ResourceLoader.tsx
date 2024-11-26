import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchCache } from "@/store/slices/cacheSlice";
import { fetchUserPref } from "@/store/slices/userPrefSlice";
import { useFonts } from "expo-font";
import { FC, PropsWithChildren, useEffect } from "react";
interface ResourceLoaderProps extends PropsWithChildren {
  onLoaded?: () => void | Promise<any>;
}
const ResourceLoader: FC<ResourceLoaderProps> = ({ onLoaded, children }) => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const cacheLoaded = useAppSelector((state) => !state.cache.loading);
  const userPrefLoaded = useAppSelector((state) => !state.userPref.loading);
  const dispatch = useAppDispatch();

  const isReady = loaded && cacheLoaded && userPrefLoaded;

  useEffect(() => {
    dispatch(fetchCache());
    dispatch(fetchUserPref());
  }, []);
  useEffect(() => {
    if (isReady && onLoaded) {
      onLoaded?.();
    }
  }, [isReady]);
  if (!isReady) {
    return null;
  }
  return <>{children}</>;
};

export default ResourceLoader;
