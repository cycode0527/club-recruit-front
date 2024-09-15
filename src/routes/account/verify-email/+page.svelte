<script lang="ts">
    import { type GetCaptchaResponse, type SendEmailResponse, type VerifyEmailResponse, getCaptcha, sendEmail, verifyEmail } from "$lib/api/account";
    import { svgToData } from "$lib/api/utils";
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import { createForm } from "felte";
    import Input from "$lib/widgets/Input.svelte";

    let loading1 = false;
    let loading2 = false;

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
    
    /**
     * 获取验证码表单
     */
    const { form : form1, setData } = createForm({
        onSubmit: (values) => {
            loading1 = true;
            return sendEmail(values);

        },
        onSuccess: (response) => {
            loading1 = false;
            // 刷新验证码
            handleChangeChallenge();
            
            let resp = response as SendEmailResponse;

            if (resp.code === 0) {
                message1 = "验证码已发送，上一条验证码已自动失效";
            } else {
                message1 = `<span style="color: red;">${resp.message}</span>`;
            } 

        }
    })
    

    /**
     * 获取验证码表单
     */
    const { form : form2 } = createForm({
        onSubmit: (values) => {
            loading2 = true;
            return verifyEmail(values);
        },
        onSuccess: (response) => {
            loading2 = false;

            let resp = response as VerifyEmailResponse;

            if (resp.code === 0) {
                message2 = "您的邮箱验证成功！";
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
        <Form form={form1} class="space-y-8 justify-center w-full sm:max-w-[500px] border border-primary-content-dark rounded-2xl p-5 ">


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
                <Button loading={loading1} type="submit" size="2xl" class="min-w-28">请求邮箱验证码</Button>
            </div>
            
            {#if message1}
                <span>{@html message1}</span>
            {/if}

        </Form>
        
        <Form form={form2} class="space-y-8 justify-center w-full sm:max-w-[500px] border border-primary-content-dark rounded-2xl p-5 ">

            <!-- 验证码输入 -->
            <FormItem
            name="emailKey"
            label="请在此输入你在邮箱中获得的验证码："
            >
                <Input  type="text" id="emailKey" name="emailKey" icon="icon-[mdi--tick]" ></Input>
            </FormItem>
            

            <div class="flex justify-evenly items-center ">
                <Button loading={loading2} type="submit" size="2xl" class="min-w-28">提交</Button>
            </div>
            
            {#if message2}
                <span>{@html message2}</span>
            {/if}
        </Form>

    </div>
</div>