<script>
    import Header from '../components/Layout/Header/Header.svelte';
    import Wrapper from '../components/Layout/Wrapper/Wrapper.svelte';
    import Footer from '../components/Layout/Footer/Footer.svelte';
</script>

<Wrapper>
    <Header></Header>
    <slot></slot>
</Wrapper>
<Footer></Footer>