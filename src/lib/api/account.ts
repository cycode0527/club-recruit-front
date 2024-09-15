// import ky from 'ky';

// export const api_root = import.meta.env.VITE_API_ROOT;

// const api = ky.create({
//   prefixUrl: api_root,
// });

import api from ".";

// ================================================================================

/**
 * 用户登陆表单
 */
export interface LoginRequest {
  email: string;
  password: string;
  /** 验证码 id */
  challengeId: string;
  /** 验证码输入 */
  challengeValue: string;
}

/**
 * 用户登陆响应
 */
export interface LoginResponse {
  code: number;
  message: string;
}


/**
 * 用户登陆接口
 * @param request LoginRequest 
 * @returns 返回的 json 数据
 */
export async function login(request: LoginRequest): Promise<LoginResponse> {
    return await api.post('user/login', {
        json: {
            user_account: request.email,
            user_password: request.password,
            challenge: {
                key: request.challengeId, 
                ans: request.challengeValue,
            }
        },
    }).json();
}

// ================================================================================


/**
 * 用户注册表单
 */
export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    /** 重复密码 */
    passwordConfirm: string;
    challengeId: string;
    challengeValue: string
}

/**
 * 用户注册响应
 */
export interface RegisterResponse {
  code: number;
  message: string;
}


/**
 * 用户注册接口
 * @param request 
 * @returns 
 */
export async function register(request: RegisterRequest): Promise<RegisterResponse> {
    return await api.post('user/register', {
        json: {
            email_address: request.email,
            nickname: request.username,
            password: request.password,
            challenge: {
                key: request.challengeId, 
                ans: request.challengeValue,
            }
        },
    }).json();
}

// ================================================================================

/**
 * 检查用户名或邮箱是否重复
 */
export interface CheckDupRequest {
    /** 昵称或邮箱重复检查 */
    cate: 'email' | 'nick';
    value: string;
}

export interface CheckDupResponse {
    code: number;
    message: string;
    valid: boolean;
}

export async function checkDup(request: CheckDupRequest): Promise<CheckDupResponse> {
    return await api.post('user/check_dup', {
        json: request,
    }).json();
}


// ================================================================================

/** 通过 key 获取验证码图片 */
// export interface GetCaptchaRequest {
//     challengeId: string;
// }

/** 获得的验证码图片响应 */
export interface GetCaptchaResponse {
    code: number;
    message: string;
    key: string;
    data: string;
}

export async function getCaptcha(): Promise<GetCaptchaResponse> {
    return await api.get('get_captcha').json();
}

// ================================================================================

/**
 * 获取用户信息的响应
 */
export interface GetUserProfileResponse {
    code: number;
    message: string;
    data: {
        id: number;
        email_address: string;
        nick_name: string;
        student_major: string;
        real_name: string;
        self_introduce: string;
        user_group: string;
        gender: number;
        student_id: string;
        is_postgraduate: boolean;
        qq_uid: string;
        phone_id: string;
        status: string;
        want_direction: number;
        student_grade: number;
    };
}

/**
 * 获取用户的信息
 * @returns 
 */
export async function getUserProfile(): Promise<GetUserProfileResponse> {
    return await api.get('user/profile').json();
}

// ================================================================================

/**
 * 更新用户信息数据结构
 */
export interface UpdateUserProfileRequest {
    realname: string;
    gender: string;
    studentId: string;
    isPostgraduate: number;
    qqId: string;
    phoneId: string;
    major: string;
    grade: string;
}

/**
 * 更新用户信息响应
 */
export interface UpdateUserProfileResponse {
    code: number;
    message: string;
}

/** 更新用户基本信息 */
export async function updateUserProfile(request: UpdateUserProfileRequest): Promise<UpdateUserProfileResponse> {
    console.log(typeof(request.gender));
    console.log(request.gender);
    return await api.post('user/update_profile', {
        json: {
            real_name: request.realname,
            gender: parseInt(request.gender),
            student_id: request.studentId,
            is_postgraduate: request.isPostgraduate == 1,
            student_major: request.major,
            qq_uid: request.qqId,
            phone_id: request.phoneId,
            student_grade: parseInt(request.grade),
        },
    }).json();
}

// ================================================================================

export interface SendEmailRequest {
    challengeId: string
    challengeValue: string
}

export interface SendEmailResponse {
    code: number;
    message: string;
}

/** 发送验证邮件 */
export async function sendEmail(request: SendEmailRequest): Promise<SendEmailResponse> {
    return await api.post('user/send_email', {
        json: {
            challenge: {
                key: request.challengeId,
                ans: request.challengeValue
            },
            aim: "email",
        }
    }).json();
}


// ================================================================================

/** 验证邮箱请求 */
export interface VerifyEmailRequest {
    emailKey: string;
}

/** 验证邮箱响应 */
export interface VerifyEmailResponse {
    code: number;
    message: string;
}

/** 验证邮箱 */
export async function verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
    return await api.post('user/email_verify', {
        json: {
            key: request.emailKey,
        },
    }).json();
}

// ================================================================================

/** 更新意向请求 */
export interface UpdateDirectionsRequest {
    direction: string[];
}

/** 更新意向响应 */
export interface UpdateDirectionsResponse {
    code: number;
    message: string;
}

/** 更新用户意向方向 */
export async function updateDirections(request: UpdateDirectionsRequest): Promise<UpdateDirectionsResponse> {
    let directNum = 0;
    request.direction.forEach(element => {
        // console.log(element)
        directNum += (2 ** parseInt(element));
    });
    // console.log(directNum);
    return await api.post('user/update_direction', {
        json: {
            want_direction: directNum,
        },
    }).json();
}

// ================================================================================

/** 更改密码请求 */
export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    challengeId: string;
    challengeValue: string;
}

export interface ChangePasswordResponse {
    code: number;
    message: string;
}

export async function changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    return await api.post('user/change_password', {
        json: {
            challenge: {
                key: request.challengeId,
                ans: request.challengeValue
            },
            raw_password: request.currentPassword,
            new_password: request.newPassword,
        },
    }).json();
} 
    
// ================================================================================

export interface UpdateIntroRequest {
    introduction: string;
}

export interface UpdateIntroResponse {
    code: number;
    message: string;
}

/**
 * 更新用户自我介绍
 * @param request 
 * @returns 
 */
export async function updateIntro(request: UpdateIntroRequest): Promise<UpdateIntroResponse> {
    return await api.post('user/update_introduce', {
        json: {
            introduce: request.introduction,
        },
    }).json();
}

// ================================================================================

export interface SendResetPasswordEmailRequest {
    email: string;
    challengeId: string;
    challengeValue: string;
}

export interface SendResetPasswordEmailResponse {
    code: number;
    message: string;
}

/**
 * 发送重置密码的邮件
 * @param request 
 * @returns 
 */
export async function sendResetPasswordEmail(request: SendResetPasswordEmailRequest): Promise<SendResetPasswordEmailResponse> {
    return await api.post('user/send_email_for_reset_password', {
        json: {
            challenge: {
                key: request.challengeId,
                ans: request.challengeValue,
            },
            aim: "password_reset",
            email: request.email,
        },
    }).json();
}

// ================================================================================

export interface ResetPasswordRequest {
    emailKey: string
    email: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    code: number;
    message: string;
}

export async function resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return await api.post('user/reset_password', {
        json: {
            key: request.emailKey,
            email: request.email,
            new_password: request.newPassword,
        },
    }).json();
}

// ================================================================================

/** 提交报名表的响应 */
export interface ApplyResumeResponse {
    code: number;
    message: string;
}

/** 提交报名表 */
export async function applyResume(): Promise<ApplyResumeResponse> {
    return await api.put('user/apply_resume').json();
}

