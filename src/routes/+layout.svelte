<script>
    import Header from '../components/Header.svelte';
    import Wrapper from '../components/Wrapper.svelte';
</script>

<Wrapper>
    <Header></Header>
    <slot></slot>
</Wrapper>