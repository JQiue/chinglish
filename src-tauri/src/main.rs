// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod command;
mod helper;
mod tray;

use command::get_handlers;
use tray::system_tray;

fn main() {
  tauri::Builder::default()
    .invoke_handler(get_handlers())
    .plugin(tauri_plugin_sql::Builder::default().build())
    .system_tray(system_tray())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
