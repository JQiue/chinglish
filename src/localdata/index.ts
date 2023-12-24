function saveLocalData(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadLocalData(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return null;
  }
}

export function getReaderStyleConfig() {
  return loadLocalData("ReaderStyleConfig");
}

export function setReaderStyleConfig(value: any) {
  saveLocalData("ReaderStyleConfig", value);
}
