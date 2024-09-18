<script lang="ts">
    import Button from '$lib/widgets/Button.svelte';
    import Input from '$lib/widgets/Input.svelte'
    import FormItem from '$lib/widgets/FormItem.svelte';
    import Form from '$lib/widgets/Form.svelte';
    import { login, getCaptcha } from '$lib/api/account';
    import type { LoginResponse, GetCaptchaResponse } from '$lib/api/account'


    import { createForm } from 'felte';
    import { z } from 'zod';
    import { validator } from '@felte/validator-zod';
    import { svgToData, sleep } from '$lib/api/utils';
    import { ckEmail, ckPassword } from '$lib/models/zCheck';
    import { user } from '$lib/stores/user';

let schema = z.object({
    email: ckEmail,
    password: z.string().trim(),
});

/** 当前是否正在请求表单 */
let loading = false;



/** 预加载数据 */
interface PreloadData {
    challengeId: string;
    imgSrc: string;
}

/** 预加载数据对象 */
let context: PreloadData;
export {context as data}
// context = {
//     challengeId: "123",
// }


/** 验证码图片信息 */
let imgSrc: string;
let challengeId: string;


imgSrc = context.imgSrc;
challengeId = context.challengeId;

let message: string | undefined = undefined;


const { form, errors, setData } = createForm({
    extend: validator({ schema }),

    onSubmit: (values) => {
    // TODO
        loading = true;
        return login(values);
    },
    onSuccess: async (response) => {
        loading = false;
        // 刷新验证码
        handleChangeChallenge();
        let resp = (response as LoginResponse);
        // 登录成功，跳转
        if (resp.code === 0) {
            message = "登陆成功！";
            await sleep(1000);
            if ($user.isAdmin) {
                window.location.href = '/admin/userlist';
            } else {
                window.location.href = '/account/profile';
            }
        } else if (resp.message == "challenge.rejected") {
            message = `<span style="color: red;">验证码错误</span>`;
        } else if (resp.message == "login.failed") {
            message = `<span style="color: red;">邮箱或密码错误</span>`;
        } else {
            message = `<span style="color: red;">${resp.message}</span>`;
        }
    },
    // onSuccess: () => {}
});

/** 
 * 处理更换验证码的点击事件
 */
async function handleChangeChallenge() {
    const response: GetCaptchaResponse = await getCaptcha();
    challengeId = response.key;
    // 使用 setData, 更新表单内的 challengeId, 并且防止把其他数据去掉
    setData('challengeId', challengeId);
    imgSrc = svgToData(response.data);

}


</script>

<!-- 保证屏幕高度变小时， 内容可以被滚动 -->
<div class="px-5 flex-1 overflow-y-auto">
    
    <!-- 注意是 min-h-full, 保证内容溢出可以拓展容器 -->
    <div class="min-h-full flex justify-center items-center">
    <Form {form} class="space-y-8 mt-3 justify-center flex-1 w-full sm:max-w-[500px]">

    <!-- 邮箱输入框 -->
    <FormItem
    name="email"
    label="Email"
    errors={$errors.email}
    hasError={$errors.email !== null}
    >
        <Input id="email" hasError={$errors.email !== null} name="email" autocomplete="username" icon="icon-[ic--outline-email]"></Input>
    </FormItem>

    <!-- 密码输入框 -->
    <FormItem
    name="password"
    label="Password"
    errors={$errors.password}
    hasError={$errors.password !== null}
    >
        <span slot="label" class="flex flex-1 justify-between">
            <label for="password" class="label-text text-base text-black font-bold drop-shadow-sm">Password</label>
            <a href="/account/reset-password" class="link link-hover text-[#717173]">Forgot password?</a>
        </span>

        <Input hasError={$errors.password !== null} autocomplete="current-password" id="password" name="password" type="password" icon="icon-[material-symbols--key-outline]"></Input>

    </FormItem>

    <!-- 验证码 id, 已隐藏 -->
    <input name="challengeId" id="challengeId" type="hidden" value={challengeId}>

    <!-- 验证码输入 -->
    <FormItem
    name="challengeValue"
    label="Captcha"
    errors={$errors.challengeValue}
    hasError={$errors.challengeValue !== null}
    >
        <Input on:changeChallenge={handleChangeChallenge} type="challenge" id="challengeValue" name="challengeValue" icon="icon-[mdi--tick]" {imgSrc}></Input>
    </FormItem>
    
    <div class="flex justify-evenly items-center ">
        <Button {loading} type="submit" size="2xl" class="min-w-28">Login</Button>
        <a href="/account/register" class="link link-hover text-[#717173]">No account?</a>
        
    </div>

    {#if message}
    <p class="font-bold">{@html message}</p>
    {/if}

    </Form>
    </div>
</div>


<!-- <div class="icon-[fluent--person-20-regular]"></div> -->