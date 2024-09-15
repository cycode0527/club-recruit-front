import { goto } from "$app/navigation";
import { user } from "$lib/stores/user";
import { error } from "@sveltejs/kit";
import { get } from "svelte/store";

export function load() {

    if (!get(user).isLoggedIn) {
        error(401, "请先登录!");
    } else if (!get(user).isAdmin) {
        error(403, "您不是管理员！")
    }

}