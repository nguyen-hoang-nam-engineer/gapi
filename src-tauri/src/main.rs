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

#[tauri::command]
async fn rest(method: &str, url: &str) -> Result<String, Error> {
    let client = reqwest::Client::new();

    let result = match method {
        "post" => client.post(url).send().await?.text().await?,
        "get" => client.get(url).send().await?.text().await?,
        "put" => client.put(url).send().await?.text().await?,
        "patch" => client.patch(url).send().await?.text().await?,
        "delete" => client.delete(url).send().await?.text().await?,
        "head" => client.head(url).send().await?.text().await?,
        _ => "Not found".to_owned(),
    };

    Ok(result)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![rest])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
