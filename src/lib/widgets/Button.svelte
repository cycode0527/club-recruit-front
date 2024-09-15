<script lang="ts">

export let type:'button' | 'submit' | 'reset' | null | undefined = "button";
//export let width: string | null = null;
//export let height: string | null = null;
export let justify: 'start' | 'center' | 'end' = 'center'
export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = '2xl';
export let loading = false;
export let disabled = false;
export let color: 'blue' | 'red' = 'blue';
//export let disabled: boolean = false;
let clazz = '';
export {clazz as class};

// let button = document.getElementById("main");

//button?.classList.remove("blue");
// button?.classList.add("red");

// 禁用显示会在 disabled 或 loading 时出现
$: exDisabled = disabled || loading;


$: classes = [
    clazz,
    // `bg-primary-${color}`,
    // `hover:bg-primary-${color}-light`,
    // `active:bg-primary-${color}-dark`,
    color === 'blue' && `bg-primary-blue`,
    color === 'blue' && `hover:bg-primary-blue-light`,
    color === 'blue' && `active:bg-primary-blue-dark`,
    color === 'blue' &&`disabled:!bg-primary-blue-disabled`,
    color === 'red' && `bg-primary-red`,
    color === 'red' && `hover:bg-primary-red-light`,
    color === 'red' && `active:bg-primary-red-dark`,
    color === 'red' &&`disabled:!bg-primary-red-disabled`,
    'btn',
    'rounded-xl',
    'font-mono',
    'font-normal',
    // 'active:focus:transform-none',
    // 'active:hover:transform-none',
    //'disabled:btn-disabled',
    //'disabled:btn-disabled',
    size == '2xl' ? 'px-5' : 'px-2',
    `text-${size}`,
    justify && `justify-${justify}`,
    // 'space-x-2',
    //'btn-square'
    //'size-auto',
    //'w-20 h-10',
    //'my-5',
    // 'border-none',
    // 'hover:size-full',



].filter(Boolean)
.join(' ');

</script>
<!-- <button class="" -->

<!-- <button bind:this={button} id="main" {type} on:click>{value}</button> -->
<button
class={classes}
disabled={exDisabled}
{type}
on:click
{...$$restProps}
>
{#if loading}
    <span class="loading loading-spinner loading-sm"/>
{/if}
<slot>按钮</slot>
</button>

