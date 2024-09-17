<script lang="ts">
    import { page } from "$app/stores";
    import { sleep } from "$lib/api/utils";
    
    // 401 未验证，跳转登陆页面
    if ($page.status === 401) {
        sleep(2000).then(() => {
            window.location.href = '/account/login';
        })
    }
</script>


<div class="flex flex-col w-full h-full items-center">
    <h1 class="text-5xl">{$page.status}</h1>
    <span class="text-2xl">{$page.error?.message}</span>
    {#if $page.status === 500}
    <span class="text-2xl">如果出现 500 错误，可能是服务器波动，请先尝试刷新网站或联系网站维护人员 @Sxrhhh(前端) @0xcafebabe(cfbb, 后端)</span>
    {/if}
</div>
