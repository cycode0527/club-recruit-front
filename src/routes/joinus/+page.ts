import { goto } from "$app/navigation";
import { getUserProfile, type GetUserProfileResponse } from "$lib/api/account";
import { user } from "$lib/stores/user";
import { error } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function load() {
    if (!get(user).isLoggedIn) {
        error(401, "请先登录!");

    }
    //
    // let response = await getUserProfile() as GetUserProfileResponse;
    // let loadData = response.data;
    // 
    // 
    // /** 用户是否已经填写完毕 */
    // let flag = true;
    // 
    // const checklist: string[] = [
    //     "email_address",
    //     "nick_name",
    //     "student_major", 
    //     "real_name", 
    //     "gender",
    //     "student_id",
    //     "is_postgraduate",
    //     "qq_uid",
    //     "phone_id",
    //     "want_direction",
    //     "student_grade",
    // ]
    //
    // /**
    //  * 遍历用户信息，检查是否有未填写的信息
    //  */
    // let key: keyof GetUserProfileResponse["data"];
    // for (key in loadData) {
    //     // console.log(loadData[key] == "");
    //     if (checklist.includes(key) && (loadData[key] === null || loadData[key] === undefined || loadData[key] === 0 || loadData[key] === "")) {
    //         console.error(key, loadData[key]);
    //         flag = false;
    //         break;
    //     };
    // }
    // 
    // return {
    //     isDone: flag,
    // }
    // 
}