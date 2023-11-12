<script lang=ts>
    import { LoginForm, RegisterForm } from "../../components/index.ts";
	import type { PageData } from "./$types";

    export let data: PageData
</script>

<LoginForm data={data.loginForm}></LoginForm>
<RegisterForm data={data.registerForm}></RegisterForm>
