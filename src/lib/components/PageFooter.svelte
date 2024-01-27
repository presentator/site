<script>
    import { onMount } from "svelte";
    import tooltip from "$lib/actions/tooltip";

    // build seperately for very basic spam protection
    let supportEmail = "support";

    onMount(() => {
        setTimeout(() => {
            supportEmail += "@" + "presentator.io";
        }, 1000);
    });
</script>

<footer class="page-footer">
    <span class="footer-item credits">© 2016-{new Date().getFullYear()} Presentator</span>

    <div class="footer-item links">
        <a href="/terms-and-conditions">Terms and conditions</a>
        <a href="/support-us">Support us</a>
        <a
            href={import.meta.env.PR_STATUS_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex flex-gap-5"
        >
            <span class="marker marker-success"></span>
            <span class="txt">Status</span>
        </a>
    </div>

    <div class="footer-item social">
        <!-- <a href="/" target="_blank" rel="noopener noreferrer">
                <i class="iconoir-twitter"></i>
            </a>
            <a href="/" target="_blank" rel="noopener noreferrer">
                <i class="iconoir-facebook"></i>
            </a> -->
        <a
            href="mailto:{supportEmail}"
            target="_blank"
            rel="noopener noreferrer"
            use:tooltip={{ position: "top", text: "Contact " + supportEmail }}
        >
            <i class="iconoir-mail-open"></i>
        </a>
        <a
            href={import.meta.env.PR_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            use:tooltip={{ position: "top", text: "View GitHub repo" }}
        >
            <i class="iconoir-github"></i>
        </a>
    </div>
</footer>
