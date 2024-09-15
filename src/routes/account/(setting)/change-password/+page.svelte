<script lang="ts">
    import { goto } from "$app/navigation";
    import { type ChangePasswordResponse, type GetCaptchaResponse, changePassword, getCaptcha } from "$lib/api/account";
    import { sleep, svgToData } from "$lib/api/utils";
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import Input from "$lib/widgets/Input.svelte";
    import { validator } from "@felte/validator-zod";
    import { createForm } from "felte";
    import { z } from "zod";

let schema = z.object({
    currentPassword: z
    .string()
    .trim()
    .min(8, {message: "输入的密码过短"}),
    newPassword: z
    .string()
    .trim()
    .min(8, {message: "输入的密码过短"})
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)[^]{8,40}$/, { message: '密码必须含有数字和字母' }),
    confirmPassword: z.string().trim(),
}).refine(values => values.newPassword === values.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"]
});

/** 预加载数据 */
interface PreloadData {
    challengeId: string;
    imgSrc: string;
}

/** 预加载数据对象 */
let context: PreloadData;
export {context as data}

/** 当前是否正在请求表单 */
let loading = false;


/** 验证码图片信息 */
let imgSrc: string;
let challengeId: string;


imgSrc = context.imgSrc;
challengeId = context.challengeId;

let message: string | undefined = undefined;

const { form, errors, setData } = createForm({
    extend: validator({ schema }),

    onSubmit: (values) => {
        loading = true;
        return changePassword(values);
    },
    onSuccess: async (response) => {
        loading = false;

        // 刷新验证码

        let resp = response as ChangePasswordResponse;
        handleChangeChallenge();

        if (resp.code === 0) {
            message = "修改成功";
            await sleep(1000);
            window.location.href = '/account/profile';
        } else if (resp.message == "challenge.rejected") {
            message = `<span style=\"color: red;\">验证码错误</span>`;
        } else {
            message = `<span style=\"color: red;\">${resp.message}</span>`;
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
<div class="px-5 flex-1 h-full overflow-y-auto">
    
    <!-- 注意是 min-h-full, 保证内容溢出可以拓展容器 -->
    <div class="min-h-full flex justify-center items-center">
    <Form {form} class="space-y-8 mt-3 justify-center flex-1 w-full sm:max-w-[500px]">

        <!-- 原密码输入框 -->
        <FormItem
        name="currentPassword"
        label="原密码"
        errors={$errors.currentPassword}
        hasError={$errors.currentPassword !== null}
        >
            <Input id="currentPassword" hasError={$errors.currentPassword !== null} name="currentPassword" autocomplete="current-password" icon="icon-[material-symbols--key-outline]" type="password"></Input>
        </FormItem>

        <!-- 新密码输入框 -->
        <FormItem
        name="newPassword"
        label="新密码"
        errors={$errors.newPassword}
        hasError={$errors.newPassword !== null}
        >
            <Input hasError={$errors.newPassword !== null} autocomplete="new-password" id="newPassword" name="newPassword" type="password" icon="icon-[material-symbols--key-outline]"></Input>

        </FormItem>

        <!-- 确认密码输入框 -->
        <FormItem
        name="confirmPassword"
        label="重复输入新密码"
        errors={$errors.confirmPassword}
        hasError={$errors.confirmPassword !== null}
        >
            <Input hasError={$errors.confirmPassword !== null} autocomplete="new-password" id="confirmPassword" name="confirmPassword" type="password" icon="icon-[material-symbols--key-outline]"></Input>

        </FormItem>

        <!-- 验证码 id, 已隐藏 -->
        <input name="challengeId" id="challengeId" type="hidden" value={challengeId}>

        <!-- 验证码输入 -->
        <FormItem
        name="challengeValue"
        label="验证码"
        errors={$errors.challengeValue}
        hasError={$errors.challengeValue !== null}
        >
            <Input on:changeChallenge={handleChangeChallenge} type="challenge" id="challengeValue" name="challengeValue" icon="icon-[mdi--tick]" {imgSrc}></Input>
        </FormItem>
        
        <div class="flex justify-evenly items-center ">
            <Button {loading} type="submit" size="2xl" class="min-w-28">保存</Button>
        </div>
        
        {#if message}
            <span class="text-base">{@html message}</span>
        {/if}

    </Form>
    </div>
</div>

