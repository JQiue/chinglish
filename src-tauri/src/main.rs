// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;
mod helper;
mod tray;

use command::{download, greet};
use tray::system_tray;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet, download])
    .plugin(tauri_plugin_sql::Builder::default().build())
    .system_tray(system_tray())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
