export function useStorage() {
  function get<T>(key: string, defaultVal: T): T {
    try {
      const val = uni.getStorageSync(key)
      return val !== '' && val !== undefined ? (val as T) : defaultVal
    } catch {
      return defaultVal
    }
  }

  function set<T>(key: string, val: T) {
    uni.setStorageSync(key, val)
  }

  function remove(key: string) {
    uni.removeStorageSync(key)
  }

  function clearAll() {
    uni.clearStorageSync()
  }

  return { get, set, remove, clearAll }
}
