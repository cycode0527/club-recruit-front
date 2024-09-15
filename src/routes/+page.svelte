<script lang="ts">
    // import { api_root } from "$lib/api/index";
    import { login } from "$lib/api/account";
    import Button from "$lib/widgets/Button.svelte";
    import Input from "$lib/widgets/Input.svelte";

    
    interface loginResponse {
        code: number,
        message: string,
    }

    let login_response: loginResponse;

    async function submit() {
        // login_response = await login("root@xdsec.org", "qwe123!@#") as loginResponse;
        // console.log(login_response);
    }
    
    function test() {
        alert("test");
    }
    
    
    
    $: if (login_response && login_response.code == 0) {
        setTimeout(() => {
            window.location.href="/admin";
            
        }, 2000);

    }
    
    
    
</script>


<div class="w-full h-full flex justify-center items-center">
    <h1 class="text-5xl">欢迎来到 XDSEC！</h1>
</div>