import { getUserProfile, type GetCaptchaResponse, type GetUserProfileResponse } from "$lib/api/account";

export async function load() {
    let response = await getUserProfile() as GetUserProfileResponse;
    return {
        id: response.data.id,
        nickname: response.data.nick_name,
        email: response.data.email_address,
        realname: response.data.real_name,
        studentId: response.data.student_id,
        major: response.data.student_major,
        isPostgraduate: response.data.is_postgraduate,
        gender: response.data.gender,
        qqId: response.data.qq_uid,
        phoneId: response.data.phone_id,
        grade: response.data.student_grade,

    };

}