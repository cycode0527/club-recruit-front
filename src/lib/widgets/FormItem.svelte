<script lang="ts">
export let name: string;
export let label: string
export let hasError = false;
export let errors: string | string[] | undefined | unknown = undefined;

let clazz = '';
export { clazz as class};

$: classes = [
    // 'form-control',
    // 'flex-1',
    // 'min-w-0',
    'w-full',
    clazz,
].filter(Boolean).join(' ');

$: tooltipClasses = [
    hasError && 'tooltip',
    'tooltip-warning',
    'tooltip-bottom',
    'tooltip-open',
    
    'flex',
    'flex-row',
    'flex-1',
    'justify-center',
    // 'box-border',
].filter(Boolean).join(' ');

$: formattedErrors = Array.isArray(errors) ? errors.join('; ') : errors?.toString();

</script>


<fieldset class={classes}>
    <label for={name} >
        <slot name="label">
            <span class="label-text text-base text-black font-bold drop-shadow-sm">{label}</span>
        </slot>
    </label>
    <div class={tooltipClasses} data-tip={formattedErrors}>
        <slot />
    </div>
</fieldset>