<script lang=ts>
    import { superForm } from "sveltekit-superforms/client";
	import { FileInput, Input, SmallText, Subheading, PrimaryButton, RadioCard, Slider, TextArea } from "../../components/index.ts";
	import type { Category, SellData, SubCategory } from "$lib/types/types.ts";

    export let data: SellData;

    const MIN_LENGTH: number = 3;
    const MAX_LENGTH: number = 13;
    const SHIPPING_OPTIONS: string[] = [
        "Small Package",
        "Medium Package",
        "Large Package"
    ];

    let images: File[] = [];
    let selectedCategory: Category = data.categories.data[0];
    let selectedSubCategory: SubCategory = data.subCategories.data[0];
    let selectedShippingOption: string = SHIPPING_OPTIONS[0];
    
    const { form, errors, enhance, constraints } = superForm(data.form);
    $form.categoryId = selectedCategory.id;
    $form.subCategoryId = selectedCategory.id;

    $: $form.shipping = selectedShippingOption;

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

    function onCategoryClick(item: Category) {
        selectedCategory = item;
        $form.categoryId = item.id;
    }

    function onSubCategoryClick(item: SubCategory) {
        selectedSubCategory = item;
        $form.subCategoryId = item.id;
    }

    const toBase64 = (file:File):Promise<string> => {
        return new Promise<string> ((resolve,reject)=> {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString() || '');
            reader.onerror = error => reject(error);
        })
    }
</script>

<form action="?/create" method="post" enctype="multipart/form-data" use:enhance>
    <div class="group slider">
        <Subheading --font-weight="500">Category</Subheading>
        <Slider --margin-top="80px">
            {#each data.categories.data as category}
                <RadioCard 
                    onClick={() => () => onCategoryClick(category)} 
                    selected={selectedCategory == category}
                >
                    <SmallText>{category.name}</SmallText>
                </RadioCard>
            {/each}
        </Slider>
        <Input
            type="text"
            name="categoryId"
            hidden
            readonly
            bind:value={$form.categoryId}
        ></Input>
    </div>
    <div class="group slider">
        <Subheading --font-weight="500">Subcategory</Subheading>
        <Slider --margin-top="80px">
            {#each data.subCategories.data as subCategory}
                <RadioCard 
                    onClick={() => onSubCategoryClick(subCategory)} 
                    selected={selectedSubCategory == subCategory}
                >
                    <SmallText>{subCategory.name}</SmallText>
                </RadioCard>
            {/each}
        </Slider>
        <Input
            type="text"
            name="subCategoryId"
            hidden
            readonly
            bind:value={$form.subCategoryId}
        ></Input>
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
                    {#each images as image, index}
                        {#await toBase64(image) then base64String}
                            {#if index > 0}
                                <div class="image__wrapper">
                                    <input name="base64Image" type="text" value={base64String} hidden>
                                    <img src={URL.createObjectURL(image)} alt="">
                                    <div class="hover"></div>
                                </div>
                            {:else}
                                <input name="base64Image" type="text" value={base64String} hidden>
                            {/if}
                        {/await}
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
        <TextArea 
            label={"Description"}
            type="text" 
            name="description"
            error={$errors.description}
            {...$constraints.description}
            bind:value={$form.description}
        ></TextArea> 
    </div>
    <div class="group slider">
        <Subheading --font-weight="500">Shipping Information</Subheading>
        <Slider --margin-top="80px">
            {#each SHIPPING_OPTIONS as option, index}
                <RadioCard 
                    onClick={() => selectedShippingOption = SHIPPING_OPTIONS[index]} 
                    selected={selectedShippingOption == option}
                >
                    <SmallText>{option}</SmallText>
                </RadioCard>
            {/each}
        </Slider>
        <Input
            type="text"
            name="shipping"
            hidden
            readonly
            bind:value={$form.shipping}
        ></Input>
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
    }

    .group.slider {
        height: 250px;
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