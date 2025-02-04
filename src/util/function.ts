// 전체선택
export function selectboxAllCheck(event: any) {
    const checkboxs = document.querySelectorAll('input[data-type=checkbox]');
    if (event.target.checked) {
        for (let i=0; i<checkboxs.length; i++) {
            const checkbox: any = checkboxs[i];
            checkbox.checked = true;
        }
    } else {
        for (let i=0; i<checkboxs.length; i++) {
            const checkbox: any = checkboxs[i];
            checkbox.checked = false;
        }
    }
}

// 입력칸 정보 변경
export function changeFunction(event: any, func: Function) {
    if (func) {
        func(event.target.value);
    }
}