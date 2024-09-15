<script lang="ts">
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import { createForm } from "felte";
    import Input from "$lib/widgets/Input.svelte";
    import Select from "$lib/widgets/Select.svelte";
    import { Direction, getWantDirectList, majorList } from "$lib/models/userinfo";
    import { z } from "zod";
    import { validator } from "@felte/validator-zod";
    import { user } from "$lib/stores/user";
    import type { GetUserInfo } from "$lib/api/admin";
    import TextArea from "$lib/widgets/TextArea.svelte";

    interface PreloadData {
        id: string;
        user: GetUserInfo;
    };
    
    /** 预加载数据对象 */
    let context: PreloadData;

    export {context as data}
    /** 输出信息 */
    let message: string | undefined = undefined;

    // let response: UpdateUserProfileResponse;




</script>


<div class="flex flex-1 w-full px-5 sm:px-0 h-full sm:pt-5">
    <div class="flex-1 flex flex-col sm:flex-row h-full sm:justify-center">

        <div class="flex flex-col justify-start">
        </div>

        

        <div class="flex flex-1 w-full pt-10 h-full overflow-y-auto flex-row justify-center box-border items-start">
            <div class="flex flex-1 flex-col min-h-full space-y-5 pb-10 justify-start items-center w-full sm:max-w-[500px]">

                <FormItem
                label="昵称"
                name="nickname"
                >
                    <Input readonly icon="icon-[material-symbols--person-outline]" type="text" id="nickname" name="nickname" value={context.user.nick_name}></Input>
                </FormItem>
                
                <FormItem
                label="邮箱"
                name="email"
                >
                    <Input readonly icon="icon-[ic--outline-email]" type="text" id="email" name="email" value={context.user.email_address}></Input>
                </FormItem>
                
                <FormItem
                label="真实姓名"
                name="realname"
                >
                    <Input readonly icon="icon-[ic--outline-email]" type="text" id="realname" name="realname" value={context.user.real_name}></Input>
                </FormItem>
                
                
                <FormItem
                label="性别"
                name="gender">
                    <Select class="select" icon="icon-[ph--gender-intersex]" name="gender" id="gender" >
                        <option value=0 selected={context.user.gender === 0} disabled>未选择</option>
                        <option value=1 selected={context.user.gender === 1}>男</option>
                        <option value=2 selected={context.user.gender === 2}>女</option>
                        <option value=3 selected={context.user.gender === 3}>暂时不愿意透露</option>
                    </Select>
                </FormItem>
                
                <FormItem
                label="学号"
                name="studentId"
                >
                    <Input readonly icon="icon-[mingcute--idcard-line]" type="text" id="studentId" name="studentId" value={context.user.student_id}></Input>
                </FormItem>
                
                <FormItem
                label="是否为研究生"
                name="isPostgraduate">
                    <Select class="select" icon="icon-[hugeicons--mortarboard-02]" name="isPostgraduate" id="isPostgraduate"  >
                        <option value=0 selected={!context.user.is_postgraduate}>否</option>
                        <option value=1 selected={context.user.is_postgraduate}>是</option>
                    </Select>
                </FormItem>

                <FormItem
                label="QQ号"
                name="qqId"
                >
                    <Input readonly icon="icon-[mingcute--qq-line]" type="text" id="qqId" name="qqId" value={context.user.qq_uid}></Input>
                </FormItem>

                <FormItem
                label="联系电话"
                name="phoneId"
                >
                    <Input readonly icon="icon-[ic--round-phone]" type="text" id="phoneId" name="phoneId" value={context.user.phone_id}></Input>
                </FormItem>

                <FormItem
                label="专业（本科）"
                name="major">
                    <Input readonly class="select" icon="icon-[hugeicons--mortarboard-02]" name="major" id="major" value={context.user.student_major} />
                </FormItem>
                
                <FormItem
                label="入学年份"
                name="grade">
                    <Input readonly class="select" icon="icon-[mdi--clock-outline]" name="grade" id="grade" value={context.user.student_grade} />
                </FormItem>
                
                <span class="pl-5 text-base font-bold">意向方向</span>
                <div class="min-h-16 border-2 border-primary-content-dark rounded-lg p-2 w-full">
                    {#each getWantDirectList(context.user.want_direction) as direction}
                        <span>{direction}  </span>
                    {/each}
                </div>

                <FormItem
                label="自我介绍"
                name="introduction"
                class="space-y-5"
                >
                    <TextArea readonly name="introduction" placeholder="自我介绍" value={context.user.self_introduce}></TextArea>
                </FormItem>
            </div>

        </div>
    </div>


</div>