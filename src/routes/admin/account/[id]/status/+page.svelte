<script lang="ts">
    import type { GetUserInfo, ListComment } from "$lib/api/admin";
    import { changeTime } from "$lib/api/utils";


    interface PreloadData {
        id: string;
        user: GetUserInfo;
        comments: ListComment[]
    };
    
    /** 预加载数据对象 */
    let context: PreloadData;
    export { context as data };



</script>

<div class="w-full h-full flex flex-col justify-start items-center py-10 px-5 overflow-auto">
    <div class="w-full sm:max-w-[1200px] px-5 flex flex-col min-h-full">
        <!-- 面试状态 -->
        <div class="flex flex-col items-center">
            <div class="text-4xl">
                当前面试状态为：
            </div>
            <div class="text-4xl">
                {context.user.status}
            </div>
        </div>
        
        <div class="flex h-auto w-full">
            <table class="table">
                <thead>
                    <tr class="text-base">
                        <th>评论人</th>
                        <th>评论</th>
                        <th>时间</th>
                    </tr>
                </thead>
                <tbody>
                    {#each context.comments as comment}
                        <tr class="text-base">
                            <td>{comment.operator}</td>
                            <td>{comment.message}</td>
                            <td>{changeTime(comment.inserted_at)}</td>
                        </tr>
                            
                    {/each}
                </tbody>

            </table>

        </div>



    </div>

</div>