<script lang="ts">
import Button from './Button.svelte';
import { createEventDispatcher } from 'svelte';

let clazz = '';
export {clazz as class};

export let icon: string | undefined = undefined;
export let id: string | undefined = undefined
export let name: string | undefined = undefined
export let value: string | number | unknown | undefined = undefined
export let disabled = false;

/** 事件转发器 */
const dispatcher = createEventDispatcher();






$:inputClass = [
    'select',
    // hasError && '!input-error',
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


{#if icon}
    <div class="join w-full">
        <span class={`bg-base-content/5 join-item flex items-center pl-3 pr-4 border-2 border-r-0 border-base-content/10 justify-start`}>
            <div class={`w-5 h-5 ${icon} justify-self-start`} />
        </span>
        <select
        {id}
        {name}
        bind:value
        class={inputClass} 
        {disabled}
        {...$$restProps}
        >
            <slot></slot>
    </div>
{:else}
    <select
    {id}
    {name}
    bind:value
    class={inputClass.replace('join-item', '')} 
    {disabled}
    {...$$restProps}
    >
        <slot></slot>
    </select>
    
{/if}
