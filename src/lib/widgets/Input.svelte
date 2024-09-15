<script lang="ts">
import Button from './Button.svelte';
import { createEventDispatcher } from 'svelte';

let clazz = '';
export {clazz as class};

export let icon: string | undefined = undefined;
export let type: 'text' | 'password' | 'number' | 'challenge'  = 'text';
export let id: string | undefined = undefined
export let name: string | undefined = undefined
export let value: string | number | unknown | undefined = undefined
export let imgSrc: string | undefined = undefined;
export let hasError = false;
export let disabled = false;
export let readonly = false;

let passwordVisible = false;
let inputNode: HTMLInputElement;

/** 事件转发器 */
const dispatcher = createEventDispatcher();

function togglePasswordVisible() {
    passwordVisible = !passwordVisible;
    showPassword(inputNode);
}

function showPassword(node: HTMLInputElement) {
    if (node && type == "password") {
        if (passwordVisible) {
            node.type = 'text';
        } else {
            node.type = 'password';
        }
    }
}

function handleClick() {
    dispatcher('changeChallenge');
}




$:inputClass = [
    'input',
    hasError && '!input-error',
    "join-item",
    "bg-base-content/5",
    //"h-10",
    "border-2",
    "border-base-content/10",
    "w-full",
    "disabled:opacity-70",
    "disabled:border-base-content/10",
    "disabled:bg-base-content/5",
    //'min-w-32',
    clazz,
].filter(Boolean)
.join(" ");

</script>


{#if icon || type == 'password'}
    <div class="join w-full">
        {#if icon}
            <span class={`bg-base-content/5 join-item flex items-center pl-3 pr-4 border-2 border-r-0 border-base-content/10 justify-start`}>
                <div class={`w-5 h-5 ${icon} justify-self-start`} />
            </span>
        {/if}
        <input
        {id}
        {name}
        bind:value
        class={inputClass} 
        {disabled}
        {readonly}
        bind:this={inputNode}
        use:showPassword
        on:blur
        {...$$restProps}
        >
        <!-- 密码显示按钮 -->
        {#if type === 'password'}
            <Button type="button" class="join-item ml-0 btn-md !bg-base-content/15 !hover:bg-base-content/20 !active:bg-base-content/30 border-2 !border-base-content/10 border-l-0"
            on:click={togglePasswordVisible}>
                <!-- <span class="icon-[fluent--eye-off-20-regular]"></span> -->
                <div class={`w-5 h-5 icon-[fluent--${passwordVisible ? 'eye-off' : 'eye'}-20-regular]`} />
                <!-- <div class={`w-5 h-5 icon-[fluent--eye-20-regular]`} /> -->
            </Button>
        {:else if type === 'challenge'}
            <button on:click={handleClick} type="button" class="join-item ml-0 btn btn-md active:focus:transform-none active:hover:transform-none bg-base-content/10 hover:bg-base-content/15 active:bg-base-content/25 border-2 border-base-content/10 border-l-0 w-[140px] flex justify-center items-center">
                <!-- 是的验证码图片居中 -->
                <img src={imgSrc} alt="captcha" class="w-full h-full object-contain object-center">
            </button> 
        {/if}
        
    </div>
{:else}
    <input
    {id}
    {name}
    bind:value
    class={inputClass.replace('join-item', '')} 
    {disabled}
    {readonly}
    bind:this={inputNode}
    use:showPassword
    on:blur
    {...$$restProps}
    >
    
{/if}
