<script lang=ts>
    import { superForm } from "sveltekit-superforms/client";
    import type { SuperValidated } from "sveltekit-superforms";
	import type { LoginSchema } from "$lib/schemas/login.ts";
    import { Heading, Input, PrimaryButton } from "../../index.ts";

    export let data: SuperValidated<LoginSchema>

    const { form, errors, enhance, constraints } = superForm(data);
</script>

<form action="?/login" method="post" use:enhance>
    <div>
        <Heading>Login</Heading>
    </div>
    <div>
        <Input 
            label={"Email"}
            type="email" 
            name="email"
            error={$errors.email}
            required
            {...$constraints.email}
            bind:value={$form.email}
        ></Input>
    </div>
    <div>
        <Input 
            label={"Password"}
            type="password" 
            name="password"
            error={$errors.password}
            required
            {...$constraints.password}
            bind:value={$form.password}
        ></Input>
    </div>
    <PrimaryButton --width="100%" --small-width="100%">Sign in</PrimaryButton>
</form>

<style lang=scss>
    form {
        margin-bottom: -50px;
        padding: 30px;
        background: $secondary;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: $btn-border-radius-small;
        align-self: center;
        max-width: 500px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    @media (max-width: $screen-medium) {
        form {
            box-shadow: none;
            max-width: none;
            padding-inline: 0;
        }
    }
</style>