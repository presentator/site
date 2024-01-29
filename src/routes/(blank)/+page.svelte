<script>
    import "$lib/scss/landing.scss";
    import PageFooter from "$lib/components/PageFooter.svelte";
    import { onDestroy } from "svelte";

    // images
    import logo_svg from "$lib/images/logo.svg";
    import figma_plugin_auth_png from "$lib/images/figma_plugin_auth.png";
    import figma_plugin_list_png from "$lib/images/figma_plugin_list.png";
    import hotspot_popover_png from "$lib/images/hotspot_popover.png";
    import comment_popover_png from "$lib/images/comment_popover.png";
    import slide1_png from "$lib/images/slide1.png";
    import slide2_png from "$lib/images/slide2.png";
    import slide3_png from "$lib/images/slide3.png";
    import slide4_png from "$lib/images/slide4.png";

    let slides = [
        { primaryColor: "var(--dangerColor)", altColor: "var(--dangerAltColor)", img: slide4_png },
        { primaryColor: "var(--successColor)", altColor: "var(--successAltColor)", img: slide3_png },
        { primaryColor: "var(--warningColor)", altColor: "var(--warningAltColor)", img: slide2_png },
        { primaryColor: "var(--primaryColor)", altColor: "var(--primaryAltColor)", img: slide1_png },
    ];
    let nextActiveSlide = null;
    let sliderInterval;

    $: activeSlide = slides[nextActiveSlide] || slides[slides.length - 1];

    async function changeSlide(index) {
        clearInterval(sliderInterval);

        nextActiveSlide = index;

        const removed = slides.splice(nextActiveSlide + 1);
        slides.unshift(...removed);
        slides = slides;

        nextActiveSlide = null;

        loadInterval();
    }

    loadInterval();

    function loadInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(() => {
            changeSlide(slides.length - 2);
        }, 15000);
    }

    onDestroy(() => {
        clearInterval(sliderInterval);
    });
</script>

<div
    class="page landing"
    style="--accentColor:{activeSlide.primaryColor}; --accentAltColor:{activeSlide.altColor}"
>
    <div class="primary-row">
        <div class="cell info">
            <div class="logo-wrapper">
                <a href="/" class="logo">
                    <img src={logo_svg} width="40" height="50" alt="Presentator logo" />
                    <div class="txt">
                        <span class="version">{import.meta.env.PR_VERSION}</span>
                        Presentator
                    </div>
                </a>
            </div>

            <div class="content">
                <h1 class="title">Free and Open source<br />design feedback and presentation platform</h1>
                <div class="ctrls">
                    <a
                        href={import.meta.env.PR_APP_URL}
                        class="btn btn-lg btn-expanded btn-secondary btn-next"
                    >
                        <span class="txt">Use the free hosted app</span>
                        <i class="iconoir-arrow-right"></i>
                    </a>
                    <a
                        href="{import.meta.env.PR_REPO_URL}#local-setup"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-lg btn-expanded btn-transparent"
                    >
                        <span class="txt">Host on your own</span>
                        <i class="iconoir-download-square"></i>
                    </a>
                </div>
            </div>
        </div>
        <div
            class="cell slider"
            data-credits="Design screens from the free Figma Spectre UI KIT by Rahul Goradia - https://www.figma.com/community/file/958406379814327848"
        >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="slider-screens" class:transitioning={nextActiveSlide !== null}>
                {#each slides as slide, i}
                    <div
                        class="slide slide-{i}"
                        class:next-active={nextActiveSlide === i}
                        on:click={() => changeSlide(i)}
                    >
                        <img src={slide.img} draggable={false} class="screenshot" alt="Slide {i}" />
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="secondary-row">
        <div class="cell">
            <div class="accent-block">
                <h6 class="title">Gather feedback with ease</h6>
                <div class="content">
                    <p>Leave comments directly on your designs</p>
                    <p>Collaborate more efficiently and organized</p>
                </div>
                <div class="preview preview-comments">
                    <div class="comment-wrapper">
                        <img
                            src={comment_popover_png}
                            class="screenshot screenshot1"
                            alt="Comment popover"
                            draggable={false}
                            width="270"
                        />
                        <div class="comment-pin">1</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell">
            <div class="accent-block">
                <h6 class="title">Build clickable prototypes</h6>
                <div class="content">
                    <p>Transform static screens into interactive prototypes</p>
                    <p>via annotations, hotspots, transitions and more</p>
                </div>
                <div class="preview preview-hotspots">
                    <div class="hotspot hotspot1">
                        <span class="hotspot hotspot2" />
                    </div>
                    <img
                        src={hotspot_popover_png}
                        class="screenshot screenshot1"
                        alt="Hotspot popover"
                        draggable={false}
                        width="180"
                    />
                </div>
            </div>
        </div>
        <div class="cell">
            <div class="accent-block">
                <h6 class="title">Power up your design workflow</h6>
                <div class="content">
                    <p>Multiple project owners</p>
                    <p>Public and password protected preview links</p>
                    <p>
                        <a
                            href={import.meta.env.PR_FIGMA_PLUGIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Figma plugin
                        </a>
                        to export your designs
                    </p>
                </div>
                <div class="preview preview-integrations">
                    <img
                        src={figma_plugin_auth_png}
                        class="screenshot screenshot1"
                        alt="Figma plugin screen 1"
                        draggable={false}
                    />
                    <img
                        src={figma_plugin_list_png}
                        class="screenshot screenshot2"
                        alt="Figma plugin screen 1"
                        draggable={false}
                    />
                </div>
            </div>
        </div>
    </div>

    <PageFooter />
</div>
