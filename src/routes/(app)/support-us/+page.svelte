<h1 class="txt-center">Support us</h1>

<center>
    <p>Presentator is a non-commercial and volunteer-driven open source project.</p>
    <p>
        The online service (<a href={import.meta.env.PR_APP_URL} target="_blank" rel="noopener noreferrer"
            >{import.meta.env.PR_APP_URL}</a
        >) is provided for free and as such it has some small costs, mostly related to its hosting.
    </p>
    <p>
        You could help us to keep the project alive and continue its support by
        <a href="{import.meta.env.PR_REPO_URL}/issues" target="_blank" rel="noopener">reporting bugs</a>
        and/or donating a small amount:
    </p>
    <div class="donation-btns">
        <a
            href={import.meta.env.PR_PATREON_URL}
            class="btn btn-lg btn-outline btn-block btn-patreon"
            target="_blank"
            rel="noopener noreferrer"
        >
            <span class="txt">Donate with Patreon</span>
        </a>
    </div>
</center>

<style lang="scss">
    .donation-btns {
        display: flex;
        flex-direction: column;
        gap: var(--baseSpacing);
        margin: var(--baseSpacing) auto;
        width: 350px;
        max-width: 100%;
        .btn-patreon:before {
            background: #e85b46;
        }
    }
</style>
