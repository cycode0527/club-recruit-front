import { goto } from "$app/navigation";
import { getUserInfo, type GetUserInfo } from "$lib/api/admin";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    let id = params.id;
    let user: GetUserInfo = await getUserInfo(id);
    
    if (!user) {
        // goto("/error/404");
        error(404, "用户不存在");
    }
    
    return {
        id,
        user,
    }

}