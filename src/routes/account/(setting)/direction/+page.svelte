<script lang="ts">
    import { updateDirections, type UpdateDirectionsResponse } from "$lib/api/account";
    import { Direction } from "$lib/models/userinfo";
    import { user } from "$lib/stores/user";
import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import FormItem from "$lib/widgets/FormItem.svelte";
    import Input from "$lib/widgets/Input.svelte";
    import { validator } from "@felte/validator-zod";
    import { createForm } from "felte";
    import { z } from "zod";

/** 当前是否正在请求表单 */
let loading = false;



/** 预加载数据 */
interface PreloadData {
    directions: string[];
}

/** 预加载数据对象 */
let context: PreloadData;
export {context as data}


let message: string | undefined = undefined;


const { form, data } = createForm({
    // extend: validator({ schema }),

    onSubmit: (values) => {
    // TODO
        loading = true;
        // console.log($data);
        return updateDirections(values);
    },
    onSuccess: async (response) => {
        loading = false;

        let resp = response as UpdateDirectionsResponse;

        if (resp.code === 0) {
            message = "保存成功";
        } else {
            message = "<span style=\"color: red;\">保存失败</span>";
        }

    },
    // onSuccess: () => {}
});



</script>

<!-- 保证屏幕高度变小时， 内容可以被滚动 -->
<div class="px-5 flex-1 h-full overflow-y-auto">
    
    <!-- 注意是 min-h-full, 保证内容溢出可以拓展容器 -->
    <div class="min-h-full flex justify-center items-center pb-5">
    <Form {form} class="space-y-8 mt-3 justify-center flex-1 w-full sm:max-w-[500px] border border-primary-content-dark rounded-2xl py-5">
        <span class="pl-5 text-base font-bold">意向方向</span>

        <!-- * BIT(0) Web
        * BIT(1) Reverse
        * BIT(2) Misc
        * BIT(3) Crypto
        * BIT(4) Pwn
        * BIT(5) Dev
        * BIT(6) 美工
        * BIT(7) 活动组 -->
        {#each Direction as direction, i}
            <label class="label cursor-pointer flex justify-center space-x-4">
                <span class="label-text">{direction}</span>
                <input type="checkbox" class="checkbox" name="direction" checked={context.directions.includes(direction)} value={i} disabled={$user.isResumed}>
            </label>
        {/each}
        

        <div class="flex justify-evenly items-center ">
            <Button {loading} type="submit" size="2xl" class="min-w-28" disabled={$user.isResumed}>{$user.isResumed ? "您已报名" : "保存"}</Button>
        </div>
        
        {#if message}
            <span class="text-base">{@html message}</span>
        {/if}

    </Form>
    </div>
</div>


<!-- <div class="icon-[fluent--person-20-regular]"></div> -->