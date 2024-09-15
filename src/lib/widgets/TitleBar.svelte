<script lang="ts">

// 需要通过 $user 来更改样式
import { user, userReset } from "$lib/stores/user";

/** 默认高度为 h-16 (64px) */
export let height: "default" | "other" = "default";


let clazz = '';
export {clazz as class};

let isLogged = $user.isLoggedIn;
let nickname = $user.nickname;

let classes = [
    "navbar",
    "bg-base-content/10",
    "fixed",
    "left-0",
    "top-0",
    height === "default" && "h-16",
    "flex",
    "flex-row",
    "z-40",
    // 'z-20',
    
    clazz,
].filter(Boolean).join(' ');

let linkClasses = [
    "btn",
    "btn-ghost",
    "active:bg-base-content/30",
    "text-base",
    "font-medium",
    "flex flex-nowrap",
    // "items-center",
].filter(Boolean).join(' ');


/** 退出登录 */
function handleLogout() {
    userReset();
    // 回到首页
    window.location.href = "/";
}

</script>

<nav class={classes}>
    <div class="navbar-start">
    
        <div class="dropdown lg:hidden">
            <div tabindex="0" role="button" class="btn btn-ghost">
                <span class="icon-[ph--list-bold] w-8 h-8"></span>
            </div>
            <ul  class="flex flex-col gap-2 dropdown-content bg-primary-content rounded-md border-2 border-primary-content-dark">
                <li>
                    <a href="/" class={linkClasses}>
                        <span class="w-5 h-5 icon-[material-symbols--home-outline]"></span>
                        <span class="whitespace-nowrap">首页</span>
                    </a>
                </li>
                <li>
                    <a href="/announcement" class={linkClasses}>
                        <span class="w-5 h-5 icon-[material-symbols--info-outline]"></span>
                        <span class="whitespace-nowrap">公告</span>
                    </a>
                </li>


                {#if $user.isAdmin}

                <li>
                    <a href="/admin/userlist" class={linkClasses}>
                        <span class="w-5 h-5 icon-[material-symbols--person-outline] text-red-500"></span>
                        <span class="text-red-500 whitespace-nowrap">管理</span>
                    </a>
                </li>

                {:else}

                <li>
                    <a href="/joinus" class={linkClasses}>
                        <span class="w-5 h-5 icon-[ic--outline-plus]"></span>
                        <span class="whitespace-nowrap">加入XDSEC</span>
                    </a>
                </li>

                {/if}
            </ul>

        </div>
    


        <a href="/" class={linkClasses}>
            <img class="w-10 h-10" alt="logo" src="/logo.svg"/>
            XDSEC
        </a>
        
        <!-- logo 和 列表之间的一个小间隔 -->
        <span class="w-14"></span>
        
        <ul class="flex flex-row gap-2 invisible lg:visible">
            <li>
                <a href="/" class={linkClasses}>
                    <span class="w-5 h-5 icon-[material-symbols--home-outline]"></span>
                    <span class="whitespace-nowrap">首页</span>
                </a>
            </li>
            <li>
                <a href="/announcement" class={linkClasses}>
                    <span class="w-5 h-5 icon-[material-symbols--info-outline]"></span>
                    <span class="whitespace-nowrap">公告</span>
                </a>
            </li>

            {#if $user.isAdmin}

            <li>
                <a href="/admin/userlist" class={linkClasses}>
                    <span class="w-5 h-5 icon-[material-symbols--person-outline] text-red-500"></span>
                    <span class="text-red-500 whitespace-nowrap">管理</span>
                </a>
            </li>

            {:else}

            <li>
                <a href="/joinus" class={linkClasses}>
                    <span class="w-5 h-5 icon-[ic--outline-plus]"></span>
                    <span class="whitespace-nowrap">加入XDSEC</span>
                </a>
            </li>

            {/if}

        </ul>

        <!-- <ul>
            <li>
                <a href="/" class="btn btn-ghost active:bg-base-content/30 text-base font-medium text-primary-blue-dark">首页</a>
                <a href="/" class="icon-[fluent--eye-20-regular]">首页</a>
            </li>
        </ul> -->
    </div>
    

    <div class="navbar-end flex flex-row justify-end">
    
        <a href={isLogged ? "/account/profile" : "/account/login"} class={linkClasses}>
            <span class="w-5 h-5 icon-[material-symbols--person-outline]"></span>
            <span class="whitespace-nowrap">{nickname === '' ? "请登录" : nickname}</span>
        </a>

        <!-- 退出按钮 -->
        {#if isLogged}
            <button class={linkClasses}  on:click={handleLogout}>
                <span class="icon-[iconamoon--exit-fill] w-8 h-8"></span>
            </button>
        {/if}
        <!-- 预留右侧空间 -->
        <span class="w-5"></span>
    </div>
</nav>