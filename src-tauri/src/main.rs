#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[derive(Debug, thiserror::Error)]
enum Error {
    #[error(transparent)]
    Io(#[from] reqwest::Error),
}

// we must manually implement serde::Serialize
impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[tauri::command(async)]
async fn http(method: &str, url: &str) -> Result<String, Error> {
    let client = reqwest::Client::new();

    let result = match method {
        "post" => client.post(url).send().await?.text().await?,
        _ => "Not found".to_owned(),
    };

    Ok(result)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![http])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
