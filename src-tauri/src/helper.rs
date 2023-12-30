use std::{fs, io::Write};
use tauri::api::path::data_dir;

pub fn write(url: String) -> bool {
  println!("{url}");
  let response = reqwest::blocking::get(url).expect("error");
  let bytes = response.bytes();
  match bytes {
    Ok(data) => {
      let file_path = data_dir().expect("error").join("com.chinglish/dict.db");
      let mut file = fs::OpenOptions::new()
        .write(true)
        .create(true)
        .open(&file_path)
        .expect("error");
      match file.write_all(&data) {
        Ok(_) => return true,
        Err(err) => {
          println!("{:?}", err);
          return true;
        }
      }
    }
    Err(err) => {
      println!("{:?}", err);
      return false;
    }
  }
}
