<script lang="ts">
    import type { Link } from "$lib/models/link";
    import SideBar from "$lib/widgets/SideBar.svelte";

let links: Link[] = [
  {
    title: "用户管理",
    icon: "icon-[material-symbols--id-card-outline]",
    href: "/admin/userlist",
  },
  {
    title: "已报名用户",
    icon: "icon-[material-symbols--person-outline]",
    href: "/admin/applied-list",
  },
];

</script>

<div class="flex flex-row flex-1">

<SideBar {links} ></SideBar>

<div class="flex-1 w-full relative z-20">
    <slot></slot>
</div>
</div>

