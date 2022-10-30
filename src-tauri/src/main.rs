#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[derive(serde::Serialize)]
struct Plugin {
    name: String,
    value: String,
}

#[tauri::command]
fn get_plugins() -> Vec<Plugin> {
    let mut plugins = Vec::new();

    plugins.push(Plugin {
        value: "rest".to_string(),
        name: "REST".to_string(),
    });

    plugins
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_rest::init())
        .invoke_handler(tauri::generate_handler![get_plugins])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
