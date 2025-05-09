'use client';
import { validateOrReject } from "class-validator";
import { useRouter } from "next/navigation";
type AppRouterInstance = ReturnType<typeof useRouter>;

// Error시의 ClassName
const className = 'tx-tip ico';

/**
 * Axios Error 핸들링
 * 
 * @param error 
 * @returns
 */
export async function axiosErrorHandle(error: any, router: AppRouterInstance): Promise<void> {
    if (error?.response?.data?.statusCode) {
        const statusCode = error.response.data.statusCode;
        if (statusCode === 400) {
            if (error?.response?.data?.validationError) {
                let count = 0;
                for (let i=0; i<error.response.data.validationError.length; i++) {
                    const doc: any = document.querySelector(`span[data-type=alert_span][data-val=${error.response.data.validationError[i].property}]`);
                    if (doc) {
                        count++;
                        doc.innerText = error.response.data.validationError[i].message;
                        doc.className = className;
                    }
                }
                
                if (count === 0 && error?.response?.data?.message) {
                    alert(error.response.data.message);
                }
            } else {
                if (error?.response?.data?.message) {
                    alert(error.response.data.message);
                }
            }
        } else if (statusCode === 403) {
            alert(error.response.data?.message);
            router.push('/')
        } else if (statusCode === 404) {
            alert('실패하였습니다.');
        } else if (statusCode === 413) {
            alert(error.response.data?.message);
        }
    } else {
        // alert('실패하였습니다.');
    }
}

/**
 * Validation Error 초기화
 */
export function resetValidationError(): void {
    const docs: any = document.querySelectorAll(`span[data-type=alert_span]`);
    for (let i=0; i<docs.length; i++) {
        docs[i].innerText = '';
        docs[i].className = '';
    }
}

/**
 * Validation 체크 및 오류처리
 * 
 * @param dto 
 */
export async function validateAction(dto: any): Promise<boolean> {
    resetValidationError();

    try {
        await validateOrReject(dto);
        return true;
    } catch (err: any) {
        const errors = [];

        for (let i=0; i<err.length; i++) {
            const error = err[i];
            const key = (Object.keys(err[i]['constraints']))[0];
            if (key === 'isBoolean') {
                if (error['contexts']) {
                    errors.push({
                        type: key,
                        property: error['contexts'][key]['target'],
                        message: error['constraints'][key]
                    });
    
                } else {
                    errors.push({
                        type: key,
                        message: error['constraints'][key]
                    });
                }
                
            } else {
                errors.push({
                    type: key,
                    property: error['property'],
                    message: error['constraints'][key]
                });
            }
        }

        let span_alert_count = 0;
        for (let i=0; i<errors.length; i++) {
            const doc: any = document.querySelector(`span[data-type=alert_span][data-val=${errors[i].property}]`);
            if (doc) {
                doc.innerText = errors[i].message;
                span_alert_count++;
            }
        }

        if (errors && errors.length > 0 && span_alert_count === 0) {
            alert(errors[0].message);
        }

        return false;
    }
}