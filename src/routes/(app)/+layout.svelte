<script>
    import "$lib/scss/main.scss";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import PageFooter from "$lib/components/PageFooter.svelte";
</script>

<div class="page">
    <PageHeader />

    <div class="page-content">
        <slot />
    </div>

    <PageFooter />
</div>
