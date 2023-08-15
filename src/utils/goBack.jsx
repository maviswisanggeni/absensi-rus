export function goBack() {
    const isPageInNewTab = window.opener !== null || window.history.length <= 2;
    if (isPageInNewTab) {
        window.close();
    } else {
        window.history.back();
    }
}