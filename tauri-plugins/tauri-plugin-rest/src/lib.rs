use reqwest::header::{HeaderMap, HeaderName, HeaderValue};
use std::str::FromStr;
use tauri::{
    plugin::{Builder, TauriPlugin},
    Runtime,
};

pub mod component;
pub mod error;
pub mod metadata;
pub mod request;

#[tauri::command]
fn navbar_component() -> component::NavbarComponent {
    let mut top = Vec::new();

    let mut methods = Vec::new();
    methods.push(component::MethodComponent {
        value: metadata::Method::GET,
        name: "GET".to_string(),
    });
    methods.push(component::MethodComponent {
        value: metadata::Method::POST,
        name: "POST".to_string(),
    });
    methods.push(component::MethodComponent {
        value: metadata::Method::PUT,
        name: "PUT".to_string(),
    });
    methods.push(component::MethodComponent {
        value: metadata::Method::PATCH,
        name: "PATCH".to_string(),
    });
    methods.push(component::MethodComponent {
        value: metadata::Method::DELETE,
        name: "DELETE".to_string(),
    });
    methods.push(component::MethodComponent {
        value: metadata::Method::HEAD,
        name: "HEAD".to_string(),
    });
    top.push(component::Component {
        kind: component::Kind::SELECT,
        name: "method".to_string(),
        value: methods,
    });

    top.push(component::Component {
        kind: component::Kind::INPUT,
        name: "url".to_string(),
        value: Vec::new(),
    });

    component::NavbarComponent { top }
}

fn headermap_from_hashmap<'a, I, S>(headers: I) -> HeaderMap
where
    I: Iterator<Item = (S, S)> + 'a,
    S: AsRef<str> + 'a,
{
    headers
        .map(|(name, val)| {
            (
                HeaderName::from_str(name.as_ref()),
                HeaderValue::from_str(val.as_ref()),
            )
        })
        // We ignore the errors here. If you want to get a list of failed conversions, you can use Iterator::partition
        // to help you out here
        .filter(|(k, v)| k.is_ok() && v.is_ok())
        .map(|(k, v)| (k.unwrap(), v.unwrap()))
        .collect()
}

#[tauri::command]
async fn send(
    metadata: metadata::Metadata,
    request: request::Request,
) -> Result<String, error::Error> {
    let client = reqwest::Client::new();

    let headers = headermap_from_hashmap(request.headers.iter());

    let result = match metadata.method {
        metadata::Method::POST => {
            client
                .post(metadata.url)
                .headers(headers)
                .body(request.body)
                .send()
                .await?
                .text()
                .await?
        }

        metadata::Method::GET => {
            client
                .get(metadata.url)
                .headers(headers)
                .body(request.body)
                .send()
                .await?
                .text()
                .await?
        }

        metadata::Method::PUT => {
            client
                .put(metadata.url)
                .headers(headers)
                .body(request.body)
                .send()
                .await?
                .text()
                .await?
        }

        metadata::Method::PATCH => {
            client
                .patch(metadata.url)
                .headers(headers)
                .body(request.body)
                .send()
                .await?
                .text()
                .await?
        }

        metadata::Method::DELETE => {
            client
                .delete(metadata.url)
                .headers(headers)
                .body(request.body)
                .send()
                .await?
                .text()
                .await?
        }

        metadata::Method::HEAD => {
            client
                .head(metadata.url)
                .headers(headers)
                .body(request.body)
                .send()
                .await?
                .text()
                .await?
        }
        _ => "Not found".to_owned(),
    };

    Ok(result)
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("rest")
        .invoke_handler(tauri::generate_handler![send, navbar_component])
        .build()
}
