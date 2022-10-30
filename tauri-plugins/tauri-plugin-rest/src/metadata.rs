#[derive(serde::Deserialize, serde::Serialize)]
pub enum Method {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE,
    HEAD,
    CONNECTION,
    TRACE,
    CUSTOM,
}

#[derive(serde::Deserialize)]
pub struct Metadata {
    pub url: String,
    pub method: Method,
}
