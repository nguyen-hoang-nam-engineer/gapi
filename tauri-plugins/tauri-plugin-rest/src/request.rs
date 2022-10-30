use std::collections::HashMap;

#[derive(serde::Deserialize)]
pub struct Request {
    pub body: String,
    pub headers: HashMap<String, String>,
}
