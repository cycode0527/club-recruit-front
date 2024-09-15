<script lang="ts">
    import { createEventDispatcher } from "svelte";


let clazz = '';
export {clazz as class};

export let id: string | undefined = undefined
export let name: string | undefined = undefined
export let value: string | number | unknown | undefined = undefined
export let placeholder: string | undefined = undefined
export let disabled = false;
export let readonly = false;

/** 事件转发器 */
const dispatcher = createEventDispatcher();



$:inputClass = [
    "textarea",
    "rounded-md",
    "textarea-bordered",
    "w-full",
    "min-h-64",
    "bg-primary-content",
    "disabled:opacity-70",
    "disabled:border-base-content/10",
    "disabled:bg-base-content/5",
    clazz,
].filter(Boolean)
.join(" ");

</script>


<textarea
{id}
{name}
bind:value
class={inputClass} 
{disabled}
{readonly}
{placeholder}
{...$$restProps}
/>

