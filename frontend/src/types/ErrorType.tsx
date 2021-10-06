export interface ErrorType {
    [key: string]: string
}

export interface AlertType {
    icon: any,
    message: string
}

export interface RedirectType {
    pathname: string,
    state?: object,
}

export interface ResultType {
    alertMessage?: AlertType,
}
