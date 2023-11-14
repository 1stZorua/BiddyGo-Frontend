<script lang=ts>
    import { superForm } from "sveltekit-superforms/client";
    import type { SuperValidated } from "sveltekit-superforms";
	import type { LoginSchema } from "$lib/schemas/login.ts";
    import { Heading, Input, PrimaryButton, SmallText } from "../../index.ts";

    export let data: SuperValidated<LoginSchema>;
    export let onClick: () => void;
    export let shown: boolean;

    const { form, errors, enhance, constraints } = superForm(data);
</script>

{#if shown}
    <form action="?/login" method="post" use:enhance>
        <div>
            <Heading>Login</Heading>
            <button type="button" on:click={onClick}>
                <SmallText --color="#159895">Create account</SmallText>
            </button>
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
{/if}

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

    form > div:first-child {
        display: flex;
        justify-content: space-between;

        button {
            background: none;
            border: none;
            text-decoration: underline;
            text-decoration-color: $btn-secondary;
            transition:
                text-decoration-color $transition-fast;
            
            &:hover {
                cursor: pointer;
                text-decoration-color: $btn-tertiary;
            }
        }
    }

    @media (max-width: $screen-medium) {
        form {
            box-shadow: none;
            max-width: none;
            padding-inline: 0;
        }
    }
</style>