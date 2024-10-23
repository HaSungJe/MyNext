import { IsBoolean, IsNotEmpty, IsOptional, Length, Matches } from "class-validator";

// 관리자 정보 수정
export class AdminPatchMyInfoDTO {
    user_email: string;

    @IsOptional()
    @Length(2,10, {message: '이름은 2-10자 이내여야합니다.'})
    user_name: string;

    @Length(2,10, {message: '닉네임은 2-10자 이내여야합니다.'})
    @IsNotEmpty({message: '닉네임을 입력해주세요.'})
    user_nickname: string;

    @IsOptional()
    @Matches(/^(\d{3,4}-\d{3,4}|\d{3,4}-\d{3,4}-\d{4})$/, { message: "연락처를 올바르게 입력해주세요." })
    user_mobile: string;

    @IsOptional()
    @Length(4, 16, {message: '비밀번호는 4-16자 이내여야합니다.'})
    user_pw: string;

    user_pw2: string;

    @IsBoolean({message: '비밀번호가 서로 일치하지않습니다.', context: {target: 'user_pw2'}})
    check_user_pw: boolean = true;

    constructor(data: any) {
        if (data) {
            this.user_email = data['user_email'] ? data['user_email'] : null;
            this.user_name = data['user_name'] ? data['user_name'] : null;
            this.user_nickname = data['user_nickname'] ? data['user_nickname'] : null;
            this.user_mobile = data['user_mobile'] ? data['user_mobile'] : null;

            this.user_pw = data['user_pw'] ? data['user_pw'] : null;
            this.user_pw2 = data['user_pw2'] ? data['user_pw2'] : null;
            if (this.user_pw && this.user_pw !== this.user_pw2) {
                this.check_user_pw = null;
            }
        }
    }
}