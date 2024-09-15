import { goto } from "$app/navigation";
import { listComment } from "$lib/api/admin";
import { changeTime } from "$lib/api/utils.js";
import { error } from "@sveltejs/kit";

export async function load({ parent }) {

    /** 从父级 layout 获取用户的昵称 */
    const { user } = await parent();
    if (!user) {
        // goto("/error/404");
        error(404, "用户不存在");
    }

    let resp = await listComment(user.nick_name);
    
    let comments = resp.data;
    
    // console.log(changeTime(1726235529));

    
    return {
        comments,
    }
}