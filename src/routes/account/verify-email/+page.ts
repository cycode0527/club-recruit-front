// import { randomUUID } from "crypto";
// import a from 'uuid';
import { getCaptcha } from '$lib/api/account'
import { svgToData } from '$lib/api/utils';
import type { GetCaptchaResponse } from '$lib/api/account'

/** 预加载验证码 id 及其图片 */
export async function load() {
    let imgData = await getCaptcha() as GetCaptchaResponse;
    return {
        challengeId: imgData.key,
        imgSrc: svgToData(imgData.data),
    };

}