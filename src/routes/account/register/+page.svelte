<script lang="ts">
    import Button from '$lib/widgets/Button.svelte';
    import Input from '$lib/widgets/Input.svelte'
    import FormItem from '$lib/widgets/FormItem.svelte';
    import Form from '$lib/widgets/Form.svelte';
    import type { RegisterResponse, GetCaptchaResponse, CheckDupRequest, CheckDupResponse, RegisterRequest } from '$lib/api/account';
    import { register, getCaptcha, checkDup } from '$lib/api/account'

    import { createForm } from 'felte';
    import { z } from 'zod';
    import { validator } from '@felte/validator-zod';
    // import { v1 } from 'uuid';
    import { v1 } from 'uuid';
    import { svgToData, sleep } from '$lib/api/utils';

let schema = z.object({
    username: z
    .string()
    .trim()
    .min(2, {message: "昵称长度至少为2"})
    .max(32, {message: "昵称过长"}),
    email: z
    .string()
    .trim()
    .email({message: "输入的邮箱格式不正确"}),
    password: z
    .string()
    .trim()
    .min(8, {message: "输入的密码过短"})
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[^]{8,40}$/, { message: '密码必须含有数字和字母' }),
    passwordConfirm: z.string().trim(),
    challengeId: z.string().trim(),
    challengeValue: z.string().trim(),

}).refine(data => data.password === data.passwordConfirm, {
    message: "两次输入的密码不一致",
    // 将错误定位到密码确认输入框
    path: ["passwordConfirm"]
});

/** 预加载数据 */
interface PreloadData {
    challengeId: string;
    imgSrc: string;
}

/** 预加载数据对象 */
let context: PreloadData;
export {context as data}

let loading = false;

/** 验证码图片信息 */
let imgSrc: string;
let challengeId: string;


imgSrc = context.imgSrc;
challengeId = context.challengeId;



let message: string | undefined = undefined;

const { form, data, errors, setData } = createForm({
    extend: validator({ schema }),
    debounced: {
    timeout: 1500,
    validate: async (values) => {
        // return {email: "asdfasdf"};
        let result: any = {};

        // const error:RegisterRequest = {};
        // console.log("debounced");
        let response = await checkDup({
            cate: "email",
            value: values.email,
        }) as CheckDupResponse;
        if (!response.valid) {
            result.email = "该邮箱已被注册";
        }
        
        response = await checkDup({
            cate: "nick",
            value: values.username,
        }) as CheckDupResponse;
        if (!response.valid) {
            result.username = "该昵称已被使用";
        }
        return result;
            
        // return error;
    }

    },

    onSubmit: (values) => {
    // TODO
        loading = true;
        return register(values);
    },
    onSuccess: (response) => {
        loading = false;
        // 刷新验证码
        handleChangeChallenge();
        
        let resp = response as RegisterResponse;

        if (resp.code === 0) {
            message = "注册成功";
            sleep(1000);
            window.location.href = "/account/login";
        } else if (resp.message == "challenge.rejected") {
            message = `<span style=\"color: red;\">验证码错误</span>`;
        } else {
            message = `<span style=\"color: red;\">${resp.message}</span>`;
        }
    },
    // onSuccess: () => {}
});

function test(e: Event) {
    // e.preventDefault();
    // console.log(e.V)

    // console.log($data);
}

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

<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->
<!-- ===================================================================================================== -->

<!-- <button on:click={test}>sdfasdf</button> -->

<!-- 保证屏幕高度变小时， 内容可以被滚动 -->
<div class="px-5 flex-1 overflow-y-auto">

    <!-- 注意是 min-h-full, 保证内容溢出可以拓展容器 -->
    <div class="min-h-full flex justify-center items-center">
    <Form {form} class="space-y-8 mt-3 justify-center flex-1 w-full sm:max-w-[500px]">

        <!-- 用户名输入框 -->
        <FormItem
        name="username"
        label="Username"
        errors={$errors.username}
        hasError={$errors.username !== null}
        >
            <Input hasError={$errors.username !== null} id="username" name="username" autocompplete="username" icon="icon-[material-symbols--person-outline]" />
        </FormItem>

        <!-- 邮箱输入框 -->
        <FormItem
        name="email"
        label="Email"
        errors={$errors.email}
        hasError={$errors.email !== null}
        >
            <Input id="email" hasError={$errors.email !== null} name="email" autocomplete="email" icon="icon-[ic--outline-email]"></Input>
        </FormItem>

        <!-- 密码输入框 -->
        <FormItem
        name="password"
        label="Password"
        errors={$errors.password}
        hasError={$errors.password !== null}
        >
            <!-- <span slot="label" class="flex flex-1 justify-between"> -->
            <!--     <label for="password" class="label-text text-base text-black font-bold drop-shadow-sm">Password</label> -->
            <!--     <a href="/account/register" class="link link-hover text-[#717173]">Forgot password?</a> -->
            <!-- </span> -->

            <Input hasError={$errors.password !== null} autocomplete="new-password" id="password" name="password" type="password" icon="icon-[material-symbols--key-outline]"></Input>

        </FormItem>
        
        <!-- 重复密码 -->
        <FormItem
        name="passwordConfirm"
        label="Confirm Password"
        errors={$errors.passwordConfirm}
        hasError={$errors.passwordConfirm !== null}
        >

            <Input hasError={$errors.passwordConfirm !== null} autocomplete="new-password" id="passwordConfirm" name="passwordConfirm" type="password" icon="icon-[material-symbols--key-outline]"></Input>

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
            <Button {loading} type="submit" size="2xl" class="min-w-28">Register</Button>
        </div>

    {#if message}
    <p class="font-bold">{@html message}</p>
    {/if}



    </Form>
    </div>
</div>