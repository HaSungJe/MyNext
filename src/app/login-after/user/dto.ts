'use client'
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Length, Matches } from "class-validator";

// 회원
export class AdminUserDTO {
    @IsOptional()
    @Length(2,10, {message: '이름은 2-10자 이내여야합니다.'})
    user_name: string;

    @Length(2,10, {message: '닉네임은 2-10자 이내여야합니다.'})
    @IsNotEmpty({message: '닉네임을 입력해주세요.'})
    user_nickname: string;

    @IsOptional()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {message: '생년월일을 올바르게 입력해주세요.'})
    user_birth: string;

    @IsOptional()
    @Matches(/^(\d{3,4}-\d{3,4}|\d{3,4}-\d{3,4}-\d{4})$/, { message: "연락처를 올바르게 입력해주세요." })
    user_mobile: string;

    user_gender: string;

    constructor(data: any) {
        if (data) {
            this.user_name = data['user_name'] ? data['user_name'] : null;
            this.user_nickname = data['user_nickname'] ? data['user_nickname'] : null;
            this.user_birth = data['user_birth'] ? data['user_birth'] : null;
            this.user_mobile = data['user_mobile'] ? data['user_mobile'] : null;
            this.user_gender = ['M', 'F'].includes(data['user_gender']) ? data['user_gender'] : 'M';
        }
    }
}

// 회원 등록
export class AdminUserPutDTO extends AdminUserDTO {
    @IsEmail(undefined, {message: '이메일 형식이 올바르지 않습니다.'})
    @IsNotEmpty({message: '이메일을 입력해주세요.'})
    user_email: string;

    @Length(4, 16, {message: '비밀번호는 4-16자 이내여야합니다.'})
    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    user_pw: string;

    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    user_pw2: string;

    @IsBoolean({message: '비밀번호가 서로 일치하지않습니다.', context: {target: 'user_pw2'}})
    check_user_pw: boolean = true;

    constructor(data: any) {
        super(data);
        if (data) {
            this.user_email = data['user_email'] ? data['user_email'] : null;
            this.user_pw = data['user_pw'] ? data['user_pw'] : null;
            this.user_pw2 = data['user_pw2'] ? data['user_pw2'] : null;
            if (this.user_pw && this.user_pw !== this.user_pw2) {
                this.check_user_pw = null;
            }
        }
    }
}

// 회원 수정
export class AdminUserPatchDTO extends AdminUserDTO {
    @IsNotEmpty({message: '회원정보를 찾을 수 없습니다.'})
    user_seq: number;

    @IsOptional()
    @Length(4, 16, {message: '비밀번호는 4-16자 이내여야합니다.'})
    user_pw: string;

    user_pw2: string;

    @IsBoolean({message: '비밀번호가 서로 일치하지않습니다.', context: {target: 'user_pw2'}})
    check_user_pw: boolean = true;

    state_code: string;

    constructor(data: any) {
        super(data);
        if (data) {
            this.user_seq = data['user_seq'] ? data['user_seq'] : null;
            this.user_pw = data['user_pw'] ? data['user_pw'] : null;
            this.user_pw2 = data['user_pw2'] ? data['user_pw2'] : null;
            if (this.user_pw) {
                if (this.user_pw !== this.user_pw2) {
                    this.check_user_pw = null;
                }
            }
            
            this.state_code = ['00', '10', '20'].includes(data['state_code']) ? data['state_code'] : '00';
        }
    }
}