import * as FileSystem from "expo-file-system";
class CacheManager {
  static async cache(key: string, data: any) {
    const stringifiedData = JSON.stringify(data);
    const fileUri = `${FileSystem.cacheDirectory}${key}.json`;
    await FileSystem.writeAsStringAsync(fileUri, stringifiedData);
  }
  static async get(key: string) {
    const fileUri = `${FileSystem.cacheDirectory}${key}.json`;
    const info = await FileSystem.getInfoAsync(fileUri);
    if (!info.exists) {
      console.warn("Tried to get cache that does not exist", key);
      return null;
    }
    const data = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(data);
  }
}

export default CacheManager;
