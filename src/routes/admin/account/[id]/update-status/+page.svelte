<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import { addComment, updateStatus, type AddCommentRequest, type AddCommentResponse, type GetUserInfo, type ListComment, type UpdateStatusRequest, type UpdateStatusResponse } from "$lib/api/admin";
    import { changeTime } from "$lib/api/utils";
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import Input from "$lib/widgets/Input.svelte";
    import Select from "$lib/widgets/Select.svelte";
    import TextArea from "$lib/widgets/TextArea.svelte";
    import { createForm } from "felte";

    let loading = false;

    interface PreloadData {
        id: string;
        user: GetUserInfo;
    };
    
    // interface DoubleResponse {
    //     resp1: UpdateStatusResponse;
    //     resp2?: AddCommentResponse | null;
    // }
    
    /** 预加载数据对象 */
    let context: PreloadData;
    export { context as data };
    
    const { form } = createForm({
        onSubmit: (values) => {
            loading = true;
            return handleSubmit(values);
        },
        // onSuccess: (values: DoubleResponse) => {
        //     loading = false;

        // },
    });
    
    interface FormType {
        status: string;
        comment: string;

    }
    
    let message1: string | undefined = undefined;
    let message2: string | undefined = undefined;
    
    async function handleSubmit(values: FormType) {
        // let resp: DoubleResponse;

        let req1: UpdateStatusRequest = {
            user_id: context.user.id,
            new_status: values.status,
        }
        
        let req2: AddCommentRequest = {
            nick_name: context.user.nick_name,
            comment: values.comment,
        }
        
        
        let resp1 = await updateStatus(req1);
        let resp2: AddCommentResponse | null = null;
        
        console.log(values.comment);
        
        /** 未填写时，将不新增评论 */
        if (values.comment != '' && values.comment != null) {
            resp2 = await addComment(req2);
        }
        
        loading = false;
        
        if (resp1.code === 0) {
            message1 = "状态修改成功!";
        } else {
            message1 = `<span style="color: red;">${resp1.message}</span>`
        }
        
        if(resp2 !== null) {
            if (resp2?.code === 0) {
                message2 = "评论添加成功!";
            } else {
                message2 = `<span style="color: red;">${resp2?.message}</span>`
            }
            
        }
        
        invalidateAll();
        
        
    } 



</script>

<div class="w-full h-full flex flex-col justify-center items-center py-10 px-5 overflow-auto">
    <Form {form} class="w-full sm:max-w-[700px] flex  flex-col space-y-8 min-h-full mb-10">
        <FormItem
        label="面试状态"
        name="status">

            <Select name="status" id="status">
                 <!-- reject|pass1|question1|question2|accepted|null -->
                <option hidden selected={context.user.status == "null" || context.user.status == null}>null</option>

                <option selected={context.user.status == "reject"}>reject</option>
                <option selected={context.user.status == "pass1"}>pass1</option>
                <option selected={context.user.status == "question1"}>question1</option>
                <option selected={context.user.status == "question2"}>question2</option>
                <option selected={context.user.status == "accepted"}>accepted</option>

            </Select>
            
        </FormItem>
        
        <FormItem
        label="新增评论"
        name="comment">
            <TextArea name="comment" id="comment" placeholder="请输入评论">
            </TextArea>
        </FormItem>
        
        <Button type="submit" {loading}>提交</Button>
        
        {#if message1}
            <span class="text-base">{@html message1}</span>
        {/if}
        
        {#if message2}
            <span class="text-base">{@html message2}</span>
        {/if}
        

    </Form>

</div>