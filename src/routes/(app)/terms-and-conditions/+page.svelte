<script>
    import { onMount } from "svelte";

    // build seperately for a very basic spam protection
    let supportEmail = "support";

    onMount(() => {
        setTimeout(() => {
            supportEmail += "@" + "presentator.io";
        }, 500);
    });
</script>

<h1 class="txt-center">Terms and Conditions</h1>

<h4>Introduction</h4>
<p>
    By using the Presentator website and all services related to it, you are agreeing to be bound by the
    following Terms and Conditions, including any subsequent changes or modifications to them. If you do not
    agree to these Terms, please do not use the Presentator website or services.
</p>

<h4>Conditions</h4>
<p>
    The public online service (<a href={import.meta.env.PR_APP_URL} target="_blank" rel="noopener noreferrer"
        >{import.meta.env.PR_APP_URL}</a
    >) is provided as it is and for free.
</p>
<p>We may modify or terminate our services at anytime, for any reason.</p>
<p>
    We may, but have no obligation to, remove accounts and content containing what we determine as unlawful,
    offensive, threatening, defamatory, obscene or any inappropriate material.
</p>

<h4>Personal information and data</h4>
<p>Presentator collects only contact information (eg. email) and user uploaded content.</p>
<p>
    Restoring individual account content from a backup is not possible. If you decide to remove your content
    (for example - deleting a project or prototype) it will be deleted permanently from our server.
</p>
<p>
    Your contact information (email) is used only for granting credentials to the Presentator services and
    receiving notifications related to your content.
</p>
<p>
    You are in full control and you can always delete your account and all user/personal data associated to it
    by going to your account settings and select "Delete account". If you have any issues with the delete
    process, or want we to do the deletion for you, please submit a
    <a href="mailto:{supportEmail}" target="_blank" rel="noopener">support request</a>.
</p>

<h4>Interactions with others</h4>
<p>
    The services may contain areas where you may be able to publicly post or express an opinion (for example -
    commenting to a blog post).
</p>
<p>
    Any information, including Personal Information, that you post there will be public, and therefore anyone
    who accesses such postings will have the ability to read, collect and further disseminate such
    information.
</p>
