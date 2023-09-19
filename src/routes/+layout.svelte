<script>
    import Header from '../components/Layout/Header.svelte';
    import Wrapper from '../components/Layout/Wrapper.svelte';
</script>

<Wrapper>
    <Header></Header>
    <slot></slot>
</Wrapper>