use crate::metadata::Method;

#[derive(serde::Serialize)]
pub enum Kind {
    SELECT,
    INPUT,
}

#[derive(serde::Serialize)]
pub struct MethodComponent {
    pub value: Method,
    pub name: String,
}

#[derive(serde::Serialize)]
pub struct Component {
    pub kind: Kind,
    pub name: String,
    pub value: Vec<MethodComponent>,
}

#[derive(serde::Serialize)]
pub struct NavbarComponent {
    pub top: Vec<Component>,
}
