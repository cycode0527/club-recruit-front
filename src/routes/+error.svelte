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
</div>
