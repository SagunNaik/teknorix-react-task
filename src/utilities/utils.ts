export const isArray = (obj: [] | string | undefined | Object) =>
  obj !== undefined && Array.isArray(obj) && obj?.length > 0;

export const setSessionItem = (key: string, filters: string) => {
  sessionStorage.setItem(key, filters);
};

export const getSessionItem = (key: string) => {
  if (sessionStorage.length > 0 && sessionStorage.getItem(key)) {
    const data = sessionStorage.getItem(key) || "";
    return JSON.parse(data);
  }
  return null;
};

export const clearSessionStorage = () => sessionStorage.clear();
