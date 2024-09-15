<script lang="ts">
    import type { Link } from "$lib/models/link";
    import SideBar from "$lib/widgets/SideBar.svelte";

let links: Link[] = [
  {
    title: "个人信息",
    icon: "icon-[material-symbols--id-card-outline]",
    href: "/account/profile",
  },
  {
    title: "意向方向",
    icon: "icon-[material-symbols--double-arrow]",
    href: "/account/direction",
  },
  {
    title: "自我介绍",
    icon: "icon-[material-symbols--person-outline]",
    href: "/account/introduction",
  },
  {
    title: "修改密码",
    icon: "icon-[material-symbols--key-outline]",
    href: "/account/change-password",
  },
];

</script>

<div class="flex flex-row flex-1">

<SideBar {links}></SideBar>

<div class="flex-1 w-full relative z-20">
    <slot></slot>
</div>
</div>

