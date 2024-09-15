<script lang="ts">
    import type { GetUserInfo } from "$lib/api/admin";
    import type { Link } from "$lib/models/link";
    import SideBar from "$lib/widgets/SideBar.svelte";
    
    interface PreloadData {
        id: string;
        user: GetUserInfo;
    }
    let context: PreloadData;
    export { context as data};

    let links: Link[] = [
      {
        title: "个人信息",
        icon: "icon-[material-symbols--id-card-outline]",
        href: `/admin/account/${context.id}/profile`,
      },
      {
        title: "面试进度",
        icon: "icon-[ri--progress-3-line]",
        href: `/admin/account/${context.id}/status`,
      },
      {
        title: "更新状态",
        icon: "icon-[ic--round-update]",
        href: `/admin/account/${context.id}/update-status`,
      },
    ];

</script>

<div class="flex flex-row flex-1">

<SideBar {links} nickname={context.user.nick_name}></SideBar>

<div class="flex-1 w-full relative z-20">
    <slot></slot>
</div>
</div>

