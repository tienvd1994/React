export function beginAjaxCall() {
    return { type: 'BEGIN_AJAX_CALL' };
}

export function ajaxCallError() {
    return { type: 'AJAX_CALL_ERROR' };
}