import type { User } from "$lib/models/user";
import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { UserInfo } from "$lib/models/userinfo";
import { fromBase64 } from "js-base64";

class UserStore {
    token = '';
    id = -1;
    nickname = '';
    isLoggedIn = false;
    isAdmin = false;
    isVerified = false;
    isResumed = false;
    status: User | null = null;
    info: UserInfo | null = null;
    
    constructor() {
        if (browser) {
            const stored = localStorage.getItem('user')
            if (stored) {
                const parsed = JSON.parse(stored) as UserStore
                this.token = parsed.token;
                this.id = parsed.id;
                this.nickname = parsed.nickname;
                this.isLoggedIn = parsed.isLoggedIn;
                this.isAdmin = parsed.isAdmin;
                this.isVerified = parsed.isVerified;
                this.isResumed = parsed.isResumed;
                this.info = parsed.info;
                this.status = parsed.status;
                return;
            }
        }
    }
}

export interface Token {
    user_email: string;
    nick_name: string;
    /** 用户组 0~3 */
    perm: number;
    /** 过期时间 */
    exp: number;
}

/** user store, 用于存储基本用户状态 */
export const user = writable(new UserStore());

user.subscribe(value => {
    if (browser) {
        // 将用户基本状态存在 localStorage 中
        localStorage.setItem('user', JSON.stringify(value));
    }
});

/**
 * 将用户状态重置为默认值
 */
export function userReset() {
    user.update(value => {
        value.token = '';
        value.id = -1;
        value.nickname = '';
        value.isLoggedIn = false;
        value.isAdmin = false;
        value.isVerified = false;
        value.isResumed = false;
        value.info = null;
        return value;
    })
}


/**
 * 获取用户是否为超级管理员
 * @param userGroup 用户组数字
 * @returns 是否为超级管理员
 */
export function getIsSuperuser(userGroup: number): boolean {
    return (userGroup & 1) === 1;
}

/**
 * 获取用户邮箱是否已验证
 * @param userGroup 用户组数字
 * @returns 邮箱是否验证
 */
export function getAccountVerified(userGroup: number): boolean {
    // 第二位是否为 1
    return ((userGroup >> 1) & 1) === 1;
}

/**
 * 获取用户是否已经报名
 * @param userGroup 用户组数字
 * @returns 是否已经报名
 */
export function getResumeApplied(userGroup: number): boolean {
    // 第三位是否为 1
    return ((userGroup >> 2) & 1) === 1;
}


/** 解析 jwt, 并将数据存储在 store 里 */
export function parseToken(token: string) {
  user.update((value) => {
    value.token = token
    // 将 jwt 第二段提取出来获得 json 
    const tokenRaw = fromBase64(token.split('.')[1])
    const tokenJson = JSON.parse(tokenRaw) as Token
    value.isLoggedIn = true

    value.nickname = tokenJson.nick_name
    // 是否为管理员
    value.isAdmin = getIsSuperuser(tokenJson.perm);
    // 是否邮箱验证
    value.isVerified = getAccountVerified(tokenJson.perm);
    // 是否已经报名
    value.isResumed = getResumeApplied(tokenJson.perm);

    return value
  })

}