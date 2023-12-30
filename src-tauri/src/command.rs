use crate::helper;

#[tauri::command]
pub fn download(url: String) -> String {
  if helper::write(url.clone()) {
    format!("download Success!")
  } else {
    format!("download Error!")
  }
}

#[tauri::command]
pub fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}
