<script>
    import Header from '../components/Layout/Header.svelte';
    import Wrapper from '../components/Layout/Wrapper.svelte';
    import Footer from '../components/Layout/Footer.svelte';
	import Heading from '../components/Shared/Heading.svelte';
</script>


<Wrapper>
    <Header></Header>
    <slot></slot>
</Wrapper>
<Footer></Footer>