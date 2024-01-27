<script>
    import logo_svg from "$lib/images/logo.svg";
</script>

<header class="page-header">
    <a href="/" class="logo logo-sm">
        <img src={logo_svg} width="32" height="40" alt="Presentator logo" />
        <div class="txt">
            <span class="version">{import.meta.env.PR_VERSION}</span>
            Presentator
        </div>
    </a>

    <a href="/" class="btn m-l-auto btn-transparent hidden-responsive">
        <span class="txt">Back to homepage</span>
    </a>
</header>
