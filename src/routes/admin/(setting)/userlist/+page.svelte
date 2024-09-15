<script lang="ts">
    import { listUsers, type ListRequest, type ListResponse, type ListUserInfo } from "$lib/api/admin";
    import Button from "$lib/widgets/Button.svelte";
    import Form from "$lib/widgets/Form.svelte";
    import Select from "$lib/widgets/Select.svelte";
    import { createForm } from "felte";
    import Input from "$lib/widgets/Input.svelte";
    import { onMount } from "svelte";
    import { getMaxPageCount } from "$lib/api/utils";



    interface PreloadData {
        message: string | undefined;
        users: ListUserInfo[]; 
    };
    
    
    /** 预加载数据对象 */
    let context: PreloadData;
    export {context as data}

    /** 输出信息 */
    let message: string | undefined = undefined;

    // let response: UpdateUserProfileResponse;

    // /** 分页 */
    // let offset = 0;

    /** 查询表单 */
    interface FormRequest {
        realname: string;
        direction: string;
        status: string;
    }
    
    /** 第几页 */
    let pageCount = 1;
    let limit = 5;
    
    /** 记录总数*/
    let total = 0;
    let totalPage = 0;
    
    /** 表单条件 */
    let request: ListRequest = {
        only_applied_users: false,
        no_super_users: false,
        status: null,
        want_direction: null,
        vague_real_name: null,
        limit,
        offset: 0,
    }
    
    /** 真·预加载数据 */
    onMount(async () => {
        let response: ListResponse = await listUsers(request) as ListResponse;
        context.users = response.data;
        total = response.total;
        totalPage = getMaxPageCount(total, 5);
    });

    const { form } = createForm({
        onSubmit: (values) => {
            let req = values as FormRequest;
            
            // 实际传出的方向数字为原数字的 2 幂
            let derectionNum = 2 ** parseInt(req.direction);
            
            // 更新请求方式为全新请求
            request = {
                only_applied_users: false,
                no_super_users: false,
                status: req.status == '0' ? null : req.status,
                want_direction: req.direction == '-1' ? null : derectionNum,
                vague_real_name: req.realname == '' ? null : `%${req.realname}%`,
                limit,
                offset: 0,
            }
            
            return listUsers(request);
        },
        onSuccess: (response) => {
            let resp = response as ListResponse;
            context.users = resp.data;
            total = resp.total;
            totalPage = getMaxPageCount(total, limit);
        },
        
    });
    
    /** 上一页 */
    async function handleLeft() {
        if (pageCount <= 1) return;
        pageCount--;
        request.offset = (pageCount - 1) * limit; 
        let response: ListResponse = await listUsers(request) as ListResponse;
        context.users = response.data;
    }

    /** 下一页 */
    async function handleRight() {
        if (pageCount >= totalPage) return;
        pageCount++;
        request.offset = (pageCount - 1) * limit; 
        let response: ListResponse = await listUsers(request) as ListResponse;
        context.users = response.data;
    }

</script>


<div class="h-full w-full overflow-y-auto">
    <div class="flex flex-1 space-y-8 py-8 w-full min-h-full flex-col items-center justify-start px-5 ">
        <Form {form} class="flex w-full flex-col space-y-5 lg:space-y-0 lg:max-w-[1200px] lg:flex-row lg:justify-center lg:items-center lg:space-x-6">
            <div>
                <label for="realname" class="text-2xl font-medium">姓名:</label>
                <Input id="realname" name="realname" class="lg:w-[200px]"/>
            </div>
            <div>
                <label for="direction" class="text-2xl font-medium">方向:</label>
                <Select id="direction" name="direction" class="lg:w-[200px]">
                    <option value="-1">无限制</option>
                    <option value="0">Web</option>
                    <option value="1">Reverse</option>
                    <option value="2">Misc</option>
                    <option value="3">Crypto</option>
                    <option value="4">Pwn</option>
                    <option value="5">Dev</option>
                    <option value="6">美工</option>
                    <option value="7">活动组</option>
                </Select>
            </div>
            <div>
                <label for="status" class="text-2xl font-medium">状态:</label>
                <Select id="status" name="status" class="lg:w-[200px]">
                    <option value="0">无限制</option>
                    <option>reject</option>
                    <option>pass1</option>
                    <option>question1</option>
                    <option>question2</option>
                    <option>accepted</option>
                    <option>null</option>
                </Select>
            </div>
            <Button type="submit" />
            <!-- <Input> -->
            
        </Form>

        <div class="flex h-auto w-full sm:w-[700px] border-2">
            <table class="table">
                <thead>
                    <tr class="text-base">
                        <th>id</th>
                        <th>昵称</th>
                        <th>姓名</th>
                        <th>状态</th>
                        <th>详情</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- fix: {#each} only works with iterable values. -->
                    {#if context.users}
                    {#each context.users as user}
                        <tr class="text-base">
                            <td>{user.id}</td>
                            <td>{user.nick_name}</td>
                            <td>{user.real_name}</td>
                            <td>{user.status}</td>
                            <td>
                                <a href="/admin/account/{user.id}/profile" class="btn btn-ghost">
                                    <span class="w-7 h-7 icon-[icon-park-outline--right]"></span>
                                </a>
                            </td>
                        </tr>
                            
                    {/each}
                    {/if}
                </tbody>

            </table>

        </div>
        
        <div class="join flex flex-row justify-center items-center w-64">
            <span>共{total}条数据</span>
            <button class="join-item btn btn-ghost" on:click={handleLeft}>«</button>
            <button class="join-item btn btn-ghost">第{pageCount}页</button>
            <button class="join-item btn btn-ghost" on:click={handleRight}>»</button>

        </div>



    </div>


</div>