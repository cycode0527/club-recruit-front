<script lang="ts">
    import { type GetCaptchaResponse, type ResetPasswordResponse, type SendEmailResponse, type SendResetPasswordEmailResponse, type VerifyEmailResponse, getCaptcha, resetPassword, sendEmail, sendResetPasswordEmail, verifyEmail } from "$lib/api/account";
    import { svgToData } from "$lib/api/utils";
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import { createForm } from "felte";
    import Input from "$lib/widgets/Input.svelte";
    import { z } from "zod";
    import { validator } from "@felte/validator-zod";

    let loading1 = false;
    let loading2 = false;
    
    const schema1 = z.object({
        email: z
        .string()
        .trim()
        .email("邮箱格式不正确"),
    });

    const schema2 = z.object({
        newPassword: z
        .string()
        .trim()
        .min(8, {message: "输入的密码过短"})
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[^]{8,40}$/, { message: '密码必须含有数字和字母' }),
        confirmPassword: z.string().trim(),
        emailKey: z.string().trim(),
    }).refine(values => values.newPassword === values.confirmPassword, {
        message: "两次密码不一致",
        path: ["confirmPassword"]
    });

    /** 验证码图片信息 */
    let imgSrc: string;
    let challengeId: string;

    /** 预加载数据 */
    interface PreloadData {
        challengeId: string;
        imgSrc: string;
    }

    let context: PreloadData;
    export { context as data};

    imgSrc = context.imgSrc;
    challengeId = context.challengeId;
    
    let message1: string | undefined;
    let message2: string | undefined;
    
    let email: string;
    
    /**
     * 等待第一个表单提交
     */
    let waiting = true;
    
    /**
     * 获取验证码表单
     */
    const { form : form1, setData, errors: errors1 } = createForm({
        extend: validator({schema: schema1}),

        onSubmit: (values) => {
            loading1 = true;
            email = values.email;
            return sendResetPasswordEmail(values);

        },
        onSuccess: (response) => {
            handleChangeChallenge();
            
            let resp = response as SendResetPasswordEmailResponse;

            if (resp.code === 0) {
                message1 = "验证码已发送，上一条验证码已自动失效";
                waiting = false;
            } else if (resp.message == "user.not.found") {
                message1 = `<span style="color: red;">未找到该邮箱</span>`;
            } else if (resp.message == "challenge.rejected") {
                message1 = `<span style="color: red;">验证码错误</span>`;
            } else {
                message1 = `<span style="color: red;">${resp.message}</span>`;
            } 

        }
    })
    

    /**
     * 重置密码表单
     */
    const { form : form2, errors: errors2 } = createForm({
        extend: validator({schema: schema2}),
        onSubmit: (values) => {
            loading2 = true;
            /** 添加一个 email 字段 */
            values.email = email;
            // console.log(values);
            return resetPassword(values);
        },
        onSuccess: (response) => {
            loading2 = false;

            let resp = response as ResetPasswordResponse;

            if (resp.code === 0) {
                message2 = "密码修改成功！";
                window.location.href = "/account/login";
            } else {
                message2 = `<span style="color: red;">${resp.message}</span>`;
            } 

        }
    })

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

<div class="flex-1 h-full px-5 overflow-y-auto">
    <div class="min-h-full flex justify-center items-center flex-col p-5 space-y-5">

        <!-- ===================================== Form1 ===================================== -->

        <Form form={form1} class="space-y-8 justify-center w-full sm:max-w-[700px] border border-primary-content-dark rounded-2xl p-5 ">

            <!-- 邮箱输入框 -->
            <FormItem
            name="email"
            label="Email"
            errors={$errors1.email}
            hasError={$errors1.email !== null}
            >
                <Input id="email" hasError={$errors1.email !== null} name="email" autocomplete="email" icon="icon-[ic--outline-email]" ></Input>
            </FormItem>

            <!-- 验证码 id, 已隐藏 -->
            <input name="challengeId" id="challengeId" type="hidden" value={challengeId}>

            <!-- 验证码输入 -->
            <FormItem
            name="challengeValue"
            label="验证码"
            >
                <Input on:changeChallenge={handleChangeChallenge} type="challenge" id="challengeValue" name="challengeValue" icon="icon-[mdi--tick]" {imgSrc}></Input>
            </FormItem>
            

            <div class="flex justify-evenly items-center ">
                <Button {loading1} type="submit" size="2xl" class="min-w-28">请求邮箱验证码</Button>
            </div>
            
            {#if message1}
                <span>{@html message1}</span>
            {/if}

        </Form>
        
        <!-- ===================================== Form2 ===================================== -->

        <Form form={form2} class="space-y-8 justify-center w-full sm:max-w-[700px] border border-primary-content-dark rounded-2xl p-5 ">
       
            
            <!-- 隐藏的 email 字段 -->
            <!-- <input name="email" id="currentEmail" type="hidden" bind:value={email}> -->

            <!-- 新密码输入框 -->
            <FormItem
            name="newPassword"
            label="新密码"
            errors={$errors2.newPassword}
            hasError={$errors2.newPassword !== null}
            >
                <Input hasError={$errors2.newPassword !== null} autocomplete="new-password" id="newPassword" name="newPassword" type="password" icon="icon-[material-symbols--key-outline]"></Input>

            </FormItem>

            <!-- 确认密码输入框 -->
            <FormItem
            name="confirmPassword"
            label="重复输入新密码"
            errors={$errors2.confirmPassword}
            hasError={$errors2.confirmPassword !== null}
            >
                <Input hasError={$errors2.confirmPassword !== null} autocomplete="new-password" id="confirmPassword" name="confirmPassword" type="password" icon="icon-[material-symbols--key-outline]"></Input>

            </FormItem>

            <!-- 验证码输入 -->
            <FormItem
            name="emailKey"
            label="请在此输入你在邮箱中获得的验证码："
            >
                <Input  type="text" id="emailKey" name="emailKey" icon="icon-[mdi--tick]" ></Input>
            </FormItem>
            

            <div class="flex justify-evenly items-center ">
                <Button {loading2} type="submit" size="2xl" class="min-w-28" disabled={waiting}>{waiting ? "等待邮件发送" : "修改"}</Button>
            </div>
            
            {#if message2}
                <span>{@html message2}</span>
            {/if}
        </Form>

    </div>
</div>