<script lang="ts">
import type { FormAction } from '@felte/core';

let clazz = '';
export { clazz as class };
export let form: FormAction;

$: classes = [
    // 'form-control',
    // 'space-y-6',
    // 'space-x-0',
    // 'content-center',
    // 'items-start',
    
    clazz,
].filter(Boolean).join(' ');

</script>

<form use:form class={classes} {...$$restProps}>
    <slot />
</form>


