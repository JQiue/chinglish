use crate::helper;

pub fn get_handlers() -> impl Fn(tauri::Invoke) {
  tauri::generate_handler![download, greet, rss]
}

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

#[tauri::command]
pub fn rss(url: &str) -> String {
  let client = reqwest::blocking::Client::new();
  let data = match client.get(url).send() {
    Ok(resp) => match resp.text() {
      Ok(text) => text,
      Err(_) => "error".to_string(),
    },
    Err(_) => "error".to_string(),
  };
  data
}
