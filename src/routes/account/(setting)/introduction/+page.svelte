<script lang="ts">
    import { updateIntro, type UpdateIntroResponse } from "$lib/api/account";
    import { user } from "$lib/stores/user";
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import TextArea from "$lib/widgets/TextArea.svelte";
    import { createForm } from "felte";



/** 当前是否正在请求表单 */
let loading = false;



/** 预加载数据 */
interface PreloadData {
    introduction: string;
}

/** 预加载数据对象 */
let context: PreloadData;
export {context as data}


$: console.log(context)

let message: string | undefined = undefined;


const { form, data } = createForm({
    // extend: validator({ schema }),

    onSubmit: (values) => {
        loading = true;
        // console.log($data);
        return updateIntro(values);
    },
    onSuccess: async (response) => {
        loading = false;

        let resp = response as UpdateIntroResponse;

        if (resp.code === 0) {
            message = "保存成功";
        } else {
            message = `<span style=\"color: red;\">${resp.message}</span>`;
        }

    },
    // onSuccess: () => {}
});



</script>

<!-- 保证屏幕高度变小时， 内容可以被滚动 -->
<div class="px-5 flex-1 h-full overflow-y-auto">
    
    <!-- 注意是 min-h-full, 保证内容溢出可以拓展容器 -->
    <div class="min-h-full flex justify-center items-center pb-5">
    <Form {form} class="space-y-8 mt-3 justify-center flex-1 w-full sm:max-w-[700px] border border-primary-content-dark rounded-2xl py-5 px-5">
        
        <!-- <textarea name="introduction" class="textarea  rounded-md textarea-bordered w-full min-h-64 bg-primary-content" placeholder="请输入自我介绍" /> -->
        <FormItem
        label="自我介绍"
        name="introduction"
        class="space-y-5"
        >
            <TextArea name="introduction" placeholder="请输入自我介绍" value={context.introduction}></TextArea>
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


<!-- <div class="icon-[fluent--person-20-regular]"></div> -->