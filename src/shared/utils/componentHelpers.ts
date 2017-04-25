export function inputValue(value: string | number) {
    return value ? `${value}` : "";
}

export function dateValue(value: string) {
    return value ? `${value.substr(0,10)}` : "";
}
