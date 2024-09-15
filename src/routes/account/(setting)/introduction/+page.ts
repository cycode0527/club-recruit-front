import { getUserProfile, type GetUserProfileResponse } from "$lib/api/account";

export async function load() {

    let response = await getUserProfile() as GetUserProfileResponse;
    console.log(response.data.self_introduce)
    return {
        introduction: response.data.self_introduce,
    };

}