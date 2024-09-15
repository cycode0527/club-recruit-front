<script lang="ts">
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import { createForm } from "felte";
    import Input from "$lib/widgets/Input.svelte";
    import Select from "$lib/widgets/Select.svelte";
    import { majorList } from "$lib/models/userinfo";
    import { z } from "zod";
    import { validator } from "@felte/validator-zod";
    import { user } from "$lib/stores/user";
    import { updateUserProfile, type UpdateUserProfileResponse } from "$lib/api/account";


    /** 可修改状态， 默认为仅查看 */
    let editing = false;
    /** 是否在加载 */
    let loading = false;
    
    let isPostgraduate: number;

    interface PreloadData {
        id: number;
        nickname: string; 
        email: string; 
        realname: string;
        studentId: string;
        major: string;
        isPostgraduate: boolean;
        gender: number;
        qqId: string;
        phoneId: string;
        grade: number;

    };
    
    let schema = z.object({
        realname: z
        .string()
        .trim()
        .min(2, {message: "名字过短"})
        .max(12, {message: "名字过长"}),
    });
    
    /** 预加载数据对象 */
    let context: PreloadData;
    export {context as data}

    /** 输出信息 */
    let message: string | undefined = undefined;

    // let response: UpdateUserProfileResponse;

    const { form, data, errors } = createForm({
        extend: validator({ schema }),

        onSubmit: (values) => {
            loading = true;
            message = undefined;
            return updateUserProfile(values);
            // console.log(values);
            
        },
        
        onSuccess: (response) => {
            loading = false;
            editing = false;

            let resp = response as UpdateUserProfileResponse;

            if (resp.code === 0) {
                message = "保存成功";
            } else {
                message = "<span style=\"color: red;\">保存失败</span>";
            }
        }

    });

    /** 进入修改页面 */
    function handleEditing() {
        message = undefined;
        editing = true;
    }
    
    /** 取消修改 */
    function handleCancel() {
        editing = false;
        // invalidateAll();
    }



</script>


<div class="flex flex-1 w-full px-5 sm:px-0 h-full sm:pt-5">
    <Form {form} class="flex-1 flex flex-col sm:flex-row h-full sm:justify-center">

        <div class="flex flex-col justify-start">
            <div class="flex flex-row space-x-4 w-full justify-center items-center sm:w-40 py-5 sm:pl-5 sm:items-end sm:space-y-4 sm:justify-start sm:flex-col sm:flex-initial">
                <!-- 按钮 -->

                {#if $user.isResumed}
                    <Button class="left-5 top-5 whitespace-nowrap" color="blue" type="button" disabled on:click={handleEditing}>
                        <span>您已报名</span>
                    </Button>
                {:else if editing}
                    <Button class="left-5 top-5" color="red" type="button" {loading} on:click={handleCancel}>
                        <span>取消</span>
                    </Button>
                    <Button class="left-5 top-5" color="blue" type="submit" {loading}>
                        <span>保存</span>
                    </Button>
                {:else}
                    <Button class="left-5 top-5" color="red" type="button" on:click={handleEditing}>
                        <span>修改</span>
                    </Button>
                {/if}
            </div>
            {#if message}
                <span class="mx-auto">{@html message}</span>
            {/if}
        </div>

        

        <div class="flex flex-1 w-full pt-10 h-full overflow-y-auto flex-row justify-center box-border items-start">
            <div class="flex flex-1 flex-col min-h-full space-y-5 pb-10 justify-start items-center w-full sm:max-w-[500px]">

                {#if $user.isVerified && !$user.isResumed}
                    <div role="alert" class="alert alert-warning flex flex-row justify-between px-4">
                        <span class="text-base">您还没有报名，信息将不被接受！ 点此报名 →</span>
                        <a href="/joinus" class="btn btn-ghost">
                            <span class="w-7 h-7 icon-[icon-park-outline--right]"></span>
                        </a>
                    </div>
                {/if}

                <FormItem
                label="昵称"
                name="nickname"
                >

                    <!-- 昵称不允许更改 -->
                    <Input icon="icon-[material-symbols--person-outline]" type="text" id="nickname" name="nickname" disabled value={context.nickname}></Input>
                </FormItem>
                
                <FormItem
                label="邮箱"
                name="email"
                >
                    <!-- 邮箱不允许修改 -->
                    <Input icon="icon-[ic--outline-email]" type="text" id="email" name="email" disabled value={context.email}></Input>
                </FormItem>

                {#if !$user.isVerified}
                    <div role="alert" class="alert alert-warning flex flex-row justify-between px-4">
                        <span class="text-base">您还没有验证邮箱，无法报名！点此验证 →</span>
                        <a href="/account/verify-email" class="btn btn-ghost">
                            <span class="w-7 h-7 icon-[icon-park-outline--right]"></span>
                        </a>
                    </div>
                {/if}
                
                <FormItem
                label="真实姓名"
                name="realname"
                errors={$errors.realname}
                hasError={$errors.realname !== null}
                >
                    <Input hasError={$errors.realname !== null} icon="icon-[ic--outline-email]" type="text" id="realname" name="realname" disabled={!editing} value={context.realname}></Input>
                </FormItem>
                
                
                <FormItem
                label="性别"
                name="gender">
                    <Select class="select" icon="icon-[ph--gender-intersex]" name="gender" id="gender" disabled={!editing}>
                        <option value=0 selected={context.gender === 0} disabled>未选择</option>
                        <option value=1 selected={context.gender === 1}>男</option>
                        <option value=2 selected={context.gender === 2}>女</option>
                        <option value=3 selected={context.gender === 3}>暂时不愿意透露</option>
                    </Select>
                </FormItem>
                
                <FormItem
                label="学号"
                name="studentId"
                >
                    <Input icon="icon-[mingcute--idcard-line]" type="text" id="studentId" name="studentId" disabled={!editing} value={context.studentId}></Input>
                </FormItem>
                
                <FormItem
                label="是否为研究生"
                name="isPostgraduate">
                    <Select class="select" icon="icon-[hugeicons--mortarboard-02]" name="isPostgraduate" id="isPostgraduate" disabled={!editing} bind:value={isPostgraduate}>
                        <option value=0 selected={!context.isPostgraduate}>否</option>
                        <option value=1 selected={context.isPostgraduate}>是</option>
                    </Select>
                </FormItem>

                <FormItem
                label="QQ号"
                name="qqId"
                >
                    <Input icon="icon-[mingcute--qq-line]" type="text" id="qqId" name="qqId" disabled={!editing} value={context.qqId}></Input>
                </FormItem>

                <FormItem
                label="联系电话"
                name="phoneId"
                >
                    <Input icon="icon-[ic--round-phone]" type="text" id="phoneId" name="phoneId" disabled={!editing} value={context.phoneId}></Input>
                </FormItem>

                <FormItem
                label="专业（本科）"
                name="major">
                    <Select class="select" icon="icon-[hugeicons--mortarboard-02]" name="major" id="major" disabled={!editing || isPostgraduate == 1} >
                        {#each majorList as major}
                            <option selected={major === context.major}>{major}</option>
                        {/each}

                    </Select>
                </FormItem>
                
                <FormItem
                label="入学年份"
                name="grade">
                    <Select class="select" icon="icon-[mdi--clock-outline]" name="grade" id="grade" disabled={!editing}>
                        <option selected={context.grade == 2019}>2019</option>
                        <option selected={context.grade == 2020}>2020</option>
                        <option selected={context.grade == 2021}>2021</option>
                        <option selected={context.grade == 2022}>2022</option>
                        <option selected={context.grade == 2023}>2023</option>
                        <option selected={context.grade == 2024}>2024</option>
                    </Select>
                </FormItem>
                
            </div>

        </div>
    </Form>


</div>