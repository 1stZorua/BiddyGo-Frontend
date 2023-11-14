<script lang=ts>
    import { LoginForm, RegisterForm } from "../../components/index.ts";
	import type { PageData } from "./$types";

    export let data: PageData

    let active: string = "login";
</script>

<LoginForm data={data.loginForm} onClick={() => active = "register"} shown={active === "login"}></LoginForm>
<RegisterForm data={data.registerForm} onClick={() => active = "login"} shown={active === "register"}></RegisterForm>
