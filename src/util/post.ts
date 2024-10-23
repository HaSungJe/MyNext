declare global {
    interface Window {
        daum: any;
    }
}
  
interface IAddr {
    address: string;
    zonecode: string;
}

export function searchAddressScriptLoad() {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
}

/**
 * 다음 지도검색
 * 
 * @param zip 
 * @param addr1 
 */
export function searchAddress(zip: Function | null, addr1: Function | null) {
    searchAddressScriptLoad();
    new window.daum.Postcode({
        oncomplete: function (data: IAddr) {
            if (zip) {
                zip(data.zonecode);
            }
            
            if (addr1) {
                addr1(data.address);
            }
        },
    }).open();
}