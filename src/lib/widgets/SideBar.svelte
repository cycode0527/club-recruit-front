<script lang="ts">
  import type { Link } from '$lib/models/link';
  import { page } from '$app/stores';


let clazz = '';
export { clazz as class};

/** 进入选手详细页面预留返回键 */
export let nickname: string | undefined = undefined;

let classes = [
    'w-full',

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

/** 当前页面 */
let currentLink: string | null;
$: currentLink = $page.url.pathname;

// currentLink = "/account/profile";

export let links: Link[];

</script>

<div class="drawer lg:drawer-open w-auto relative top">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <!-- 右下角的侧边栏开关 -->
      <label for="my-drawer-2" class="btn btn-ghost lg:hidden bg-base-content/10 fixed right-5 bottom-5 w-14 h-14 ">
        <span class="icon-[ph--list-bold] w-10 h-10"></span>
      </label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="flex flex-col space-y-1 pt-5 text-base-content min-h-full w-64 bg-primary-content border-2 border-primary-content-dark ">
      
        <!-- 进入选手详细页面, 上方的返回按钮 -->
        {#if nickname}
          <li class="rounded-lg flex flex-row items-center justify-center bg-base-content/15 border-2 border-primary-content-dark relative h-16">
            <div class="whitespace-nowrap flex flex-row items-center space-x-2">
              <span class="icon-[material-symbols--person-outline]"></span>
              <span>{nickname}</span>
            </div>
            <a href="/admin/userlist" class="btn btn-ghost absolute right-1">
              <span class="icon-[iconamoon--exit-fill] w-6 h-6 text-primary-blue-dark"></span>
            </a>
          </li>
        {/if}

        <!-- 侧边栏按钮 -->
        {#each links as link}
          <!-- <li class="{linkClasses} {link.href === currentLink && 'btn-active'}">
            <span class={link.icon}></span>
            <a href={link.href}>{link.title}</a>
          </li> -->
          <li>
            <a href={link.href} class="{linkClasses} {link.href === currentLink && 'btn-active'}">
              <span class={link.icon}></span>
              <span>{link.title}</span>
            </a>
          </li>
        {/each}
        <!-- <li class={linkClasses}><a>Sidebar Item 1</a></li>
        <li class={linkClasses}><a>Sidebar Item 2</a></li> -->
      </ul>
    </div>
</div>

<style lang="scss">
  .top {
    z-index: 30;

    // 让打开侧边栏时, 移植最顶层
    &:has(#my-drawer-2:checked) {
      z-index: 50;
    } 

  }



</style>