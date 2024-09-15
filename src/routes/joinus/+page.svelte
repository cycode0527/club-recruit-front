<script lang="ts">
    import { applyResume, getUserProfile, type ApplyResumeResponse, type GetUserProfileResponse } from "$lib/api/account";
    import { user } from "$lib/stores/user";
    import Button from "$lib/widgets/Button.svelte";
    import { onMount } from "svelte";

    interface PreloadData {
        isDone: boolean;
    }
    
    let clicked = false;

    let context: PreloadData;
    export { context as data };
    
    /** 延后加载 */
    onMount(async () => {
        let response = await getUserProfile() as GetUserProfileResponse;
        let loadData = response.data;
        /** 用户是否已经填写完毕 */
        let flag = true;
        
        const checklist: string[] = [
            "email_address",
            "nick_name",
            "student_major", 
            "real_name", 
            "gender",
            "student_id",
            "is_postgraduate",
            "qq_uid",
            "phone_id",
            "want_direction",
            "student_grade",
        ]

        /**
         * 遍历用户信息，检查是否有未填写的信息
         */
        let key: keyof GetUserProfileResponse["data"];
        for (key in loadData) {
            // console.log(loadData[key] == "");
            if (checklist.includes(key) && (loadData[key] === null || loadData[key] === undefined || loadData[key] === 0 || loadData[key] === "")) {
                console.error(key, loadData[key]);
                flag = false;
                break;
            };
        }
        
        context.isDone = flag;
        
    });
    
    let message: string | undefined = undefined;
    
    function handleClick() {
        clicked = true;
    }
    
    /** 确认按钮，提交报名表 */
    async function handleSubmit() {
        let resp: ApplyResumeResponse = await applyResume();
        
        if (resp.code === 0) {
            $user.isResumed = true;
            clicked = false;
            message = undefined;
        } else if (resp.code === 1 || resp.message == "apply.failed.already") {
            message = `<span style="color: red;">您已经报名过了，请勿重复报名！</span>`;
        } else if (resp.code === 3 || resp.message == "apply.failed.not_verified") {
            message = `<span style="color: red;">还未验证邮箱，请验证后报名！</span>`;
        } else {
            message = `<span style="color: red;">${resp.message}</span>`;
        }

    }

</script>

<div class="flex-1 h-full px-5 overflow-y-auto">
    <div class="min-h-full flex justify-center items-center flex-col p-5 space-y-5">
    
        <!-- border -->
        <div class="flex flex-col space-y-8 justify-center w-full sm:max-w-[700px] border border-primary-content-dark rounded-2xl p-5 ">
            <span class="font-bold text-2xl">报名表</span>
            <div class="font-medium text-base">按下这个按钮，你就可以提交你的所有信息，然后报名！</div>

            
            {#if $user.isResumed}
                <Button type="button" disabled>您已报名</Button>
            {:else}
                <Button type="button" on:click={handleClick} disabled={!context.isDone || !$user.isVerified}>报名</Button>
            {/if}

            {#if clicked}
                <div role="alert" class="alert alert-warning px-4">
                    <span class="w-7 h-7 icon-[material-symbols--warning-outline]"></span>
                    <span class="text-base">请注意！报名之后将无法修改您的基本信息和意向方向，请再次检查你的基本信息是否无误！</span>
                    <a href="/account/profile" class="btn btn-ghost">
                        <span class="w-7 h-7 icon-[icon-park-outline--right]"></span>
                    </a>
                </div>
                <Button type="button" on:click={handleSubmit}>确认报名</Button>
            {/if}


            {#if !context.isDone}
                <div role="alert" class="alert alert-error flex flex-row justify-between px-4">
                    <span class="w-7 h-7 icon-[material-symbols--error-outline]"></span>
                    <span class="text-base">您还没有填写完所有基本信息，请先去填写完再来 →</span>
                    <a href="/account/profile" class="btn btn-ghost">
                        <span class="w-7 h-7 icon-[icon-park-outline--right]"></span>
                    </a>
                </div>
            {/if}

            {#if !$user.isVerified}
                <div role="alert" class="alert alert-error flex flex-row justify-between px-4">
                    <span class="w-7 h-7 icon-[material-symbols--error-outline]"></span>
                    <span class="text-base">您还没有验证邮箱，不可以报名！ →</span>
                    <a href="/account/verify-email" class="btn btn-ghost">
                        <span class="w-7 h-7 icon-[icon-park-outline--right]"></span>
                    </a>
                </div>
            {/if}
            
            {#if message}
                <span class="text-base">{@html message}</span>
            {/if}

        </div>



    </div>
</div>