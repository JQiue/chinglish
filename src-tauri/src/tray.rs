use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, VERSION};

pub fn system_tray() -> SystemTray {
  let quit = CustomMenuItem::new("quit".to_string(), "退出");
  let tray_menu = SystemTrayMenu::new().add_item(quit);
  let tray = SystemTray::new()
    .with_tooltip(format!("{} {}", "Chinglish", VERSION).as_str())
    .with_menu(tray_menu)
    .on_event(|event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "quit" => {
          std::process::exit(0);
        }
        _ => {}
      },
      SystemTrayEvent::LeftClick { .. } => {
        println!("left")
      }
      SystemTrayEvent::RightClick { .. } => {
        println!("right")
      }
      SystemTrayEvent::DoubleClick { .. } => {}
      _ => todo!(),
    });
  return tray;
}
