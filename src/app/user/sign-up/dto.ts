import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, Length, Matches } from "class-validator";

// 회원가입
export class SignUpDTO {
    sns_yn: boolean;
    sns_code: string;
    sns_id: string;

    @Length(6, 20, {message: '아이디는 6-20자 이내여야합니다.'})
    @IsNotEmpty({message: '아이디를 입력해주세요.'})
    user_id: string;

    @Length(6, 30, {message: '이메일은 6-30자 이내여야합니다.'})
    @IsEmail(undefined, {message: '이메일 형식이 올바르지 않습니다.'})
    @IsNotEmpty({message: '이메일을 입력해주세요.'})
    user_email: string;

    @Length(6, 20, {message: '비밀번호는 6-20자 이내여야합니다.'})
    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    user_pw: string;

    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    user_pw2: string;

    @Length(2, 20, {message: '이름은 2-20자 이내여야합니다.'})
    @IsNotEmpty({message: '이름을 입력해주세요.'})
    user_name: string;

    @Length(2, 20, {message: '닉네임은 2-20자 이내여야합니다.'})
    @IsNotEmpty({message: '닉네임을 입력해주세요.'})
    user_nickname: string;

    @IsOptional()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {message: '생년월일을 올바르게 입력해주세요.'})
    user_birth: string;

    @IsOptional()
    @Matches(/^(\d{3,4}-\d{3,4}|\d{3,4}-\d{3,4}-\d{4})$/, { message: "연락처를 올바르게 입력해주세요." })
    user_mobile: string;

    // @IsNotEmpty({message: '본인인증이 필요합니다.'})
    // ci: string;

    @IsBoolean({message: '비밀번호가 서로 다릅니다.', context: {target: 'user_pw'}})
    check_match_password: boolean = true;

    @IsBoolean({message: '소셜 계정정보가 입력되지 않았습니다.', context: {target: 'sns_id'}})
    check_sns_id: boolean = true;

    constructor(data: any) {
        if (data) {
            this.sns_code = ['NAVER', 'KAKAO', 'GOOGLE', 'APPLE'].includes(data['sns_code']) ? data['sns_code'] : null;
            this.sns_id = data['sns_id'] && this.sns_code ? data['sns_id'] : null;
            this.user_id = data['user_id'] ? data['user_id'] : null;
            this.user_email = data['user_email'] ? data['user_email'] : null;
            this.user_pw = data['user_pw'] ? data['user_pw'] : null;
            this.user_pw2 = data['user_pw2'] ? data['user_pw2'] : null;
            this.user_name = data['user_name'] ? data['user_name'] : null;
            this.user_nickname = data['user_nickname'] ? data['user_nickname'] : this.user_name;
            this.user_birth = data['user_birth'] ? data['user_birth'] : null;
            this.user_mobile = data['user_mobile'] ? data['user_mobile'] : null;
            // this.ci = data['ci'] ? data['ci'] : null;

            if (this.sns_code) { // SNS 회원의경우, 아이디, 비밀번호 자동입력
                this.sns_yn = true;
                this.user_id = `SMS_USER_ID`;
                this.user_pw = `SMS_USER_PW`;
                this.user_pw2 = `SMS_USER_PW`;
                if (!this.sns_id) {
                    this.check_sns_id = null;
                }
            } else { // 이메일 회원의 경우, 비밀번호 체크
                this.sns_yn = false;
                if (this.user_pw !== this.user_pw2) {
                    this.check_match_password = null;
                }
            }
        }
    }
}

// 로그인
export class SignInDTO {
    sns_yn: boolean;
    sns_code: string;
    sns_id: string;

    @IsNotEmpty({message: '아이디를 입력해주세요.'})
    user_id: string;

    @IsNotEmpty({message: '비밀번호를 입력해주세요.'})
    user_pw: string;

    constructor(data: any) {
        if (data) {
            this.sns_code = ['NAVER', 'KAKAO', 'GOOGLE', 'APPLE'].includes(data['sns_code']) ? data['sns_code'] : null;
            this.sns_id = data['sns_id'] && this.sns_code ? data['sns_id'] : null;
            this.user_id = data['user_id'] ? data['user_id'] : null;
            this.user_pw = data['user_pw'] ? data['user_pw'] : null;

            if (this.sns_code) { // SNS 회원의경우, 아이디, 비밀번호 자동입력
                this.sns_yn = true;
                this.user_id = `SMS_USER_ID`;
                this.user_pw = `SMS_USER_PW`;
            } else { // 이메일 회원의 경우, 비밀번호 체크
                this.sns_yn = false;
            }
        }
    }  
}