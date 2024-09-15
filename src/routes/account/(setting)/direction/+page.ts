import { getUserProfile, type GetUserProfileResponse } from "$lib/api/account";
import { getWantDirectList } from "$lib/models/userinfo";

export async function load() {

    let response = await getUserProfile() as GetUserProfileResponse;
    return {
        directions: getWantDirectList(response.data.want_direction),
    };

}