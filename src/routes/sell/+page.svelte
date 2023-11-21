<script lang=ts>
    import { superForm } from "sveltekit-superforms/client";
	import { FileInput, Input, SmallText, Subheading, PrimaryButton, RadioCard, Slider } from "../../components/index.ts";
	import type { PageData } from "./$types";

    export let data: PageData

    let images: File[] = [];
    let selectedCategory = 1;
    
    const MIN_LENGTH: number = 3;
    const MAX_LENGTH: number = 13;

    const { form, errors, enhance, constraints } = superForm(data.form);

    function onFileUpload(event: InputEvent) {
        
        if (images.length >= MAX_LENGTH) return;
        
        const inputElement = event.target as HTMLInputElement | null;
        const files = Array.from(inputElement?.files!);

        const remainingSlots = MAX_LENGTH - images.length;
        
        
        if (files.length > remainingSlots) {
            images = [...images, ...files.slice(0, remainingSlots)];
        } else {
            images = [...images, ...files];
        }

        if ($errors.imageCount && images.length >= MIN_LENGTH) {
            $errors.imageCount = [];
        }

        $form.imageCount = images.length;
    }
</script>

<form action="?/create" method="post" enctype="multipart/form-data" use:enhance>
    <div class="group">
        <Subheading --font-weight="500">Category and Subcategory</Subheading>
        <Slider --margin-top="100px">
            <RadioCard onClick={() => selectedCategory = 1} selected={selectedCategory == 1}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 2} selected={selectedCategory == 2}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 3} selected={selectedCategory == 3}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 4} selected={selectedCategory == 4}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 5} selected={selectedCategory == 5}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 6} selected={selectedCategory == 6}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 7} selected={selectedCategory == 7}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 8} selected={selectedCategory == 8}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 9} selected={selectedCategory == 9}></RadioCard>
            <RadioCard onClick={() => selectedCategory = 10} selected={selectedCategory == 10}></RadioCard>
        </Slider>
    </div>
    <div class="group">
        <div>
            <Subheading --font-weight="500">Pictures</Subheading>
            <SmallText>{images.length} of {MAX_LENGTH} pictures</SmallText>
        </div>
        <div class="images">
            <div class="left" class:small={images.length > 1}>
                {#if images.length > 0}
                    <div class="thumbnail">
                        <input name="image" type="file" bind:value={images[0]} readonly hidden>
                        <img src={URL.createObjectURL(images[0])} alt="thumbnail">
                    </div>
                {/if}
                <div 
                    class="input__wrapper"
                >
                    <Input
                        type="text"
                        name="imageCount"
                        hidden
                        readonly
                        bind:value={$form.imageCount}
                    ></Input>
                    <FileInput
                        name="images"
                        multiple
                        required
                        accept=".jpg, .jpeg, .png, .webp"
                        error={$errors.imageCount}
                        onInput={onFileUpload}
                        {...$constraints.imageCount}
                    ></FileInput>
                </div>
            </div>
            {#if images.length > 1}
                <div class="other__images">
                    {#each images.slice(1, images.length) as image}
                        <div class="image__wrapper">
                            <input name="image" type="file" bind:value={image} readonly hidden>
                            <img src={URL.createObjectURL(image)} alt="">
                            <div class="hover"></div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
    <div class="group">
        <Subheading --font-weight="500">Details</Subheading>
        <Input 
            label={"Title"}
            type="text" 
            name="title"
            error={$errors.title}
            {...$constraints.title}
            bind:value={$form.title}
        ></Input> 
        <Input 
            label={"Description"}
            type="text" 
            name="description"
            error={$errors.description}
            {...$constraints.description}
            bind:value={$form.description}
        ></Input> 
    </div>
    <div class="group">
        <Subheading --font-weight="500">Shipping Information</Subheading>
    </div>
    <PrimaryButton --small-width="100%">Create Listing</PrimaryButton>
</form>

<style lang=scss>
    form {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .group {
        display: flex;
        flex-direction: column;
        gap: 30px;

        &:first-child {
            height: 250px;
        }
    }

    .images {
        display: flex;
        gap: 30px;
    }

    .images img {
        object-fit: scale-down;
        border: $btn-border-size solid $gray-light;
        border-radius: $btn-border-radius-normal;
    }

    .thumbnail img {
        height: 350px;
        width: 350px;
    }

    .left {
        display: flex;
        gap: 10px;
        width: 100%;
    }

    .left.small {
        flex-direction: column;
        width: max-content;
    }

    .left.small .input__wrapper {
        width: 350px;
        height: 160px;
    }

    .input__wrapper {
        width: 100%;
        height: 350px;
    }

    .other__images {
        display: flex;
        flex-wrap: wrap;
        gap: 17.25px;

        img {
            width: 160px;
            height: 160px;
        }
    }
    
    .image__wrapper {
        height: 160px;
    }

    @media (max-width: $screen-extraLarge) {
        .left {
            width: 100%!important;
            flex-direction: column;

            .thumbnail img {
                width: 100%;
            }

            .input__wrapper {
                width: 100%!important;
            }
        }

        .images {
            flex-direction: column;
        }

        .image__wrapper {
            display: flex;
            flex: 1;
        }

        .other__images img {
            flex: 1;
        }
    }
</style>