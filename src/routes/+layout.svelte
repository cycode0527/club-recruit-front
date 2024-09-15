<script>
    import "@fontsource/jetbrains-mono"
    
    import "$lib/styles/base.scss"
    import TitleBar from "$lib/widgets/TitleBar.svelte";
</script>

<div id="app" class="min-h-screen">

    <!-- <nav class="navbar bg-base-content/10 fixed left-0 top-0 h-16">
        <div class="navbar-start">
            <ul>
                <li>
                    <a href="/" class="btn btn-ghost active:bg-base-content/30 text-base font-medium text-primary-blue-dark">首页</a>
                </li>
            </ul>
        </div>

    </nav> -->
    <TitleBar></TitleBar>

    <div class="pt-16 flex h-screen box-border overflow-y-hidden relative">

    <slot></slot>
    </div>
</div>
