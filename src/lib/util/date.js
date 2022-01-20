export function formatDate(date) {
    const indexOfT = date.indexOf('T');
    return date.slice(0, indexOfT);
}
