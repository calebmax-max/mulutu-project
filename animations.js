document.addEventListener("DOMContentLoaded", function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    var motionReduced = prefersReducedMotion.matches;

    document.body.classList.add("site-ready");

    // Auto-mark common sections for reveal and decorative divider.
    var autoRevealTargets = document.querySelectorAll("section.container, .card");
    autoRevealTargets.forEach(function (item, index) {
        if (!item.classList.contains("reveal-on-scroll")) {
            item.classList.add("reveal-on-scroll");
            item.classList.add("reveal-delay-" + ((index % 3) + 1));
        }
        if (item.tagName.toLowerCase() === "section") {
            item.classList.add("section-divider");
        }
    });

    // Add animated backgrounds to key content blocks.
    var driftTargets = document.querySelectorAll(
        ".about-card, .mvb-card, .history-card, .cdi-card, .pastor-card, .contact-card, .stats-card, #card2, #card3, #div2"
    );
    driftTargets.forEach(function (item) {
        item.classList.add("animated-bg");
    });

    // Add cinematic depth class to key sections/cards for scroll-reactive parallax.
    var depthTargets = document.querySelectorAll(
        ".hero-video, #welcome-section, #church-stats, #pastor-section, #about-who, #mission-vision-belief, #church-history, #core-different-impact, #contact-page, section.container.py-5, section.container.pb-5"
    );
    depthTargets.forEach(function (item) {
        item.classList.add("cinematic-depth");
    });

    // Stagger nav-link entrance and highlight key headings.
    var navLinks = document.querySelectorAll(".navbar .nav-link");
    navLinks.forEach(function (link, index) {
        link.style.setProperty("--nav-delay", (index * 90) + "ms");
    });

    function updateNavbarState() {
        document.body.classList.toggle("nav-scrolled", window.scrollY > 24);
    }
    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });

    var keyHeadings = document.querySelectorAll(
        "#welcome-title, .about-title, .pastor-title, .history-title, .contact-title, #h2, .mvb-title, .cdi-title"
    );
    keyHeadings.forEach(function (heading) {
        heading.classList.add("headline-breathe");
        heading.classList.add("glory-text");
    });

    var microTargets = document.querySelectorAll(".contact-item i, .stat-label, .mvb-title, .cdi-title, .history-title");
    microTargets.forEach(function (el, index) {
        el.classList.add("micro-pop");
        el.style.setProperty("--micro-delay", ((index % 8) * 70) + "ms");
    });

    // Prepare heading word reveals.
    var headings = document.querySelectorAll("h2, h3, h4, h5");
    headings.forEach(function (heading) {
        if (heading.classList.contains("heading-reveal")) {
            return;
        }

        var text = heading.textContent.trim();
        if (!text) {
            return;
        }

        heading.classList.add("heading-reveal");
        heading.textContent = "";

        text.split(/\s+/).forEach(function (word, wordIndex) {
            var span = document.createElement("span");
            span.className = "word-reveal";
            span.style.setProperty("--word-delay", (wordIndex * 90) + "ms");
            span.textContent = word;
            heading.appendChild(span);
            heading.appendChild(document.createTextNode(" "));
        });
    });

    var revealItems = document.querySelectorAll(".reveal-on-scroll");
    var revealDirections = ["reveal-from-up", "reveal-from-left", "reveal-from-right"];
    var semanticDirectionRules = [
        { selector: "#welcome-section", direction: "reveal-from-up" },
        { selector: "#church-stats", direction: "reveal-from-up" },
        { selector: "#pastor-section", direction: "reveal-from-left" },
        { selector: "#card2", direction: "reveal-from-left" },
        { selector: "#card3", direction: "reveal-from-right" },
        { selector: "#about-who", direction: "reveal-from-up" },
        { selector: "#mission-vision-belief", direction: "reveal-from-left" },
        { selector: "#church-history", direction: "reveal-from-right" },
        { selector: "#core-different-impact", direction: "reveal-from-left" },
        { selector: "#contact-page", direction: "reveal-from-up" },
        { selector: "#div2", direction: "reveal-from-right" },
        { selector: "section.container.py-5", direction: "reveal-from-up" },
        { selector: "section.container.pb-5 .col-md-4:nth-child(1)", direction: "reveal-from-left" },
        { selector: "section.container.pb-5 .col-md-4:nth-child(2)", direction: "reveal-from-up" },
        { selector: "section.container.pb-5 .col-md-4:nth-child(3)", direction: "reveal-from-right" }
    ];

    function setRevealDirection(el, direction) {
        el.classList.remove("reveal-from-up", "reveal-from-left", "reveal-from-right");
        el.classList.add(direction);
        el.dataset.revealSemantic = "true";
    }

    semanticDirectionRules.forEach(function (rule) {
        document.querySelectorAll(rule.selector).forEach(function (el) {
            if (el.classList.contains("reveal-on-scroll")) {
                setRevealDirection(el, rule.direction);
            }
        });
    });

    revealItems.forEach(function (item, index) {
        if (item.dataset.revealSemantic === "true") {
            return;
        }

        var hasDirection =
            item.classList.contains("reveal-from-up") ||
            item.classList.contains("reveal-from-left") ||
            item.classList.contains("reveal-from-right");

        if (!hasDirection) {
            item.classList.add(revealDirections[index % revealDirections.length]);
        }
    });

    // Prepare staggered list animations for ministry/belief sections.
    var staggerLists = document.querySelectorAll(".mvb-list, .cdi-list");
    staggerLists.forEach(function (list) {
        list.classList.add("stagger-list");
        var items = list.querySelectorAll("li");
        items.forEach(function (item, index) {
            item.style.setProperty("--item-delay", (index * 95) + "ms");
        });
    });

    // Media reveal accents.
    var mediaTargets = document.querySelectorAll(".welcome-photo, .about-photo, .pastor-photo, #churchCarousel .carousel-item img");
    if (motionReduced || !("IntersectionObserver" in window)) {
        mediaTargets.forEach(function (item) {
            item.classList.add("media-reveal-live");
        });
    } else {
        var mediaObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("media-reveal-live");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
        );

        mediaTargets.forEach(function (item) {
            mediaObserver.observe(item);
        });
    }

    // Prepare staggered paragraph glide-ins.
    var glideParagraphs = document.querySelectorAll(".reveal-on-scroll p");
    glideParagraphs.forEach(function (paragraph, index) {
        paragraph.classList.add("text-glide");
        paragraph.style.setProperty("--text-delay", ((index % 6) * 90) + "ms");
    });

    function showEverythingImmediately() {
        revealItems.forEach(function (item) {
            item.classList.add("is-visible");
            item.classList.add("section-live");

            var liveCards = item.querySelectorAll(".card");
            liveCards.forEach(function (card, idx) {
                card.classList.add("ambient-float");
                card.style.setProperty("--float-delay", (idx * 240) + "ms");
            });

            item.querySelectorAll(".text-glide").forEach(function (paragraph) {
                paragraph.classList.add("is-glide-visible");
            });

            item.querySelectorAll(".micro-pop").forEach(function (el) {
                el.classList.add("is-popped");
            });
        });

        document.querySelectorAll(".heading-reveal").forEach(function (heading) {
            heading.classList.add("is-revealed");
        });

        document.querySelectorAll(".count-up").forEach(function (counter) {
            var target = Number(counter.getAttribute("data-target")) || 0;
            var suffix = counter.getAttribute("data-suffix") || "";
            counter.textContent = target + suffix;
            counter.classList.add("is-counted");
        });
    }

    if (motionReduced || !("IntersectionObserver" in window)) {
        showEverythingImmediately();
        staggerLists.forEach(function (list) {
            list.classList.add("is-visible");
        });
    } else {
        var revealObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        entry.target.classList.add("section-live");

                        entry.target.querySelectorAll(".heading-reveal").forEach(function (heading) {
                            heading.classList.add("is-revealed");
                        });

                        entry.target.querySelectorAll(".card").forEach(function (card, idx) {
                            card.classList.add("ambient-float");
                            card.style.setProperty("--float-delay", (idx * 240) + "ms");
                        });

                        entry.target.querySelectorAll(".text-glide").forEach(function (paragraph) {
                            paragraph.classList.add("is-glide-visible");
                        });

                        entry.target.querySelectorAll(".micro-pop").forEach(function (el) {
                            el.classList.add("is-popped");
                        });

                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });

        var freeHeadings = document.querySelectorAll(".heading-reveal");
        var headingObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-revealed");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.35, rootMargin: "0px 0px -20px 0px" }
        );

        freeHeadings.forEach(function (heading) {
            headingObserver.observe(heading);
        });

        var listObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25, rootMargin: "0px 0px -15px 0px" }
        );

        staggerLists.forEach(function (list) {
            listObserver.observe(list);
        });
    }

    // Animated counters.
    var counters = document.querySelectorAll(".count-up");
    function animateCounter(el) {
        if (el.dataset.counted === "true") {
            return;
        }

        var target = Number(el.getAttribute("data-target")) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = Number(el.getAttribute("data-duration")) || 1800;

        el.dataset.counted = "true";

        if (motionReduced) {
            el.textContent = target + suffix;
            el.classList.add("is-counted");
            return;
        }

        var start = null;

        function frame(ts) {
            if (!start) {
                start = ts;
            }

            var elapsed = ts - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(target * eased);

            el.textContent = current + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(frame);
            } else {
                el.textContent = target + suffix;
                el.classList.add("is-counted");
            }
        }

        window.requestAnimationFrame(frame);
    }

    if (motionReduced || !("IntersectionObserver" in window)) {
        counters.forEach(function (counter) {
            animateCounter(counter);
        });
    } else {
        var counterObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.35 }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    // Animate carousel captions on every slide.
    var churchCarousel = document.getElementById("churchCarousel");
    function playCarouselImageMotion(item) {
        if (!item) {
            return;
        }

        var image = item.querySelector("img");
        if (!image) {
            return;
        }

        image.classList.remove("ken-burns-active");
        void image.offsetWidth;
        image.classList.add("ken-burns-active");
    }

    function playCaptionAnimation(item) {
        if (!item) {
            return;
        }

        var textNodes = item.querySelectorAll(".carousel-caption h5, .carousel-caption p");
        textNodes.forEach(function (node, i) {
            node.classList.remove("caption-pop");
            void node.offsetWidth;
            node.style.setProperty("--cap-delay", (i * 160) + "ms");
            node.classList.add("caption-pop");
        });
    }

    if (churchCarousel) {
        var firstActiveItem = churchCarousel.querySelector(".carousel-item.active");
        playCaptionAnimation(firstActiveItem);
        playCarouselImageMotion(firstActiveItem);
        churchCarousel.addEventListener("slid.bs.carousel", function (event) {
            playCaptionAnimation(event.relatedTarget);
            playCarouselImageMotion(event.relatedTarget);
        });
    }

    // Floating icon accents for small contact/info icons.
    var iconTargets = document.querySelectorAll("img[width='50px'], img[width='50']");
    iconTargets.forEach(function (icon, index) {
        icon.classList.add("float-icon");
        icon.style.setProperty("--icon-delay", (index * 140) + "ms");
    });

    if (motionReduced) {
        return;
    }

    // Slow theme accent drift for richer page mood.
    var accentOn = false;
    window.setInterval(function () {
        accentOn = !accentOn;
        document.body.classList.toggle("theme-shift-b", accentOn);
    }, 18000);

    var sparkleOn = false;
    window.setInterval(function () {
        sparkleOn = !sparkleOn;
        document.body.classList.toggle("spark-phase", sparkleOn);
    }, 7000);

    var twinkleOn = false;
    window.setInterval(function () {
        twinkleOn = !twinkleOn;
        document.body.classList.toggle("twinkle-phase", twinkleOn);
    }, 5200);

    var beatOn = false;
    window.setInterval(function () {
        beatOn = !beatOn;
        document.body.classList.toggle("beat-phase", beatOn);
    }, 6000);

    var waveOn = false;
    window.setInterval(function () {
        waveOn = !waveOn;
        document.body.classList.toggle("wave-phase", waveOn);
    }, 9500);

    // Hero scroll cue for smoother section discovery.
    var heroSection = document.querySelector(".hero-video");
    if (heroSection && !heroSection.querySelector(".hero-scroll-cue")) {
        var cue = document.createElement("button");
        cue.type = "button";
        cue.className = "hero-scroll-cue";
        cue.setAttribute("aria-label", "Scroll to next section");
        cue.innerHTML = "<span></span>";
        heroSection.appendChild(cue);

        cue.addEventListener("click", function () {
            var next = heroSection.nextElementSibling;
            if (next) {
                next.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    if (heroSection && !heroSection.querySelector(".hero-spark-layer")) {
        var sparkLayer = document.createElement("div");
        sparkLayer.className = "hero-spark-layer";
        for (var i = 0; i < 8; i += 1) {
            var spark = document.createElement("span");
            spark.className = "hero-spark";
            spark.style.setProperty("--spark-x", (8 + (i * 11)) + "%");
            spark.style.setProperty("--spark-delay", (i * 480) + "ms");
            spark.style.setProperty("--spark-dur", (3600 + (i * 220)) + "ms");
            sparkLayer.appendChild(spark);
        }
        heroSection.appendChild(sparkLayer);
    }

    // Desktop cursor halo for cinematic depth.
    if (window.matchMedia("(pointer: fine)").matches) {
        var cursorHalo = document.createElement("div");
        cursorHalo.id = "cursor-halo";
        document.body.appendChild(cursorHalo);

        var haloX = window.innerWidth / 2;
        var haloY = window.innerHeight / 2;
        var targetX = haloX;
        var targetY = haloY;

        document.addEventListener("mousemove", function (event) {
            targetX = event.clientX;
            targetY = event.clientY;
        });

        function animateHalo() {
            haloX += (targetX - haloX) * 0.12;
            haloY += (targetY - haloY) * 0.12;
            cursorHalo.style.transform = "translate(" + haloX.toFixed(2) + "px, " + haloY.toFixed(2) + "px)";
            window.requestAnimationFrame(animateHalo);
        }
        animateHalo();
    }

    // One-time pulse accent when key elements enter viewport.
    var pulseTargets = document.querySelectorAll(".card, .contact-item, .stat-box");
    if ("IntersectionObserver" in window) {
        var pulseObserver = new IntersectionObserver(
            function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("pulse-once");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "0px 0px -25px 0px" }
        );

        pulseTargets.forEach(function (target) {
            pulseObserver.observe(target);
        });
    }

    // Smooth page-leave transition for internal links.
    document.querySelectorAll("a[href$='.html']").forEach(function (link) {
        link.addEventListener("click", function (event) {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            var href = link.getAttribute("href");
            if (!href || href.indexOf("http") === 0 || href.indexOf("#") === 0) {
                return;
            }

            event.preventDefault();
            document.body.classList.add("page-leaving");
            window.setTimeout(function () {
                window.location.href = href;
            }, 230);
        });
    });

    // Hero subtitle typewriter effect.
    var heroSubtitle = document.querySelector(".hero-video__overlay p");
    if (heroSubtitle) {
        var fullText = heroSubtitle.textContent.trim();
        heroSubtitle.textContent = "";
        heroSubtitle.classList.add("hero-typing");

        var charIndex = 0;
        var typeInterval = window.setInterval(function () {
            charIndex += 1;
            heroSubtitle.textContent = fullText.slice(0, charIndex);
            if (charIndex >= fullText.length) {
                window.clearInterval(typeInterval);
                heroSubtitle.classList.remove("hero-typing");
            }
        }, 45);
    }

    // Button click ripple feedback.
    var rippleTargets = document.querySelectorAll(".hero-video__btn, #i5, #btn1");
    rippleTargets.forEach(function (target) {
        target.classList.add("ripple-host");
        target.addEventListener("click", function (event) {
            var rect = target.getBoundingClientRect();
            var ripple = document.createElement("span");
            ripple.className = "click-ripple";
            ripple.style.left = (event.clientX - rect.left) + "px";
            ripple.style.top = (event.clientY - rect.top) + "px";
            target.appendChild(ripple);
            window.setTimeout(function () {
                ripple.remove();
            }, 550);
        });
    });

    // Pointer-driven interaction layer.
    var finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer) {
        var magneticButtons = document.querySelectorAll(".hero-video__btn, #i5, #btn1");
        magneticButtons.forEach(function (button) {
            button.classList.add("magnetic-btn");

            button.addEventListener("mousemove", function (event) {
                var rect = button.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;
                var moveX = ((x / rect.width) - 0.5) * 10;
                var moveY = ((y / rect.height) - 0.5) * 10;
                button.style.transform = "translate(" + moveX.toFixed(2) + "px, " + moveY.toFixed(2) + "px)";
            });

            button.addEventListener("mouseleave", function () {
                button.style.transform = "";
            });
        });

        var tiltTargets = document.querySelectorAll(".card, .contact-item, .stat-box");
        tiltTargets.forEach(function (target) {
            target.classList.add("interactive-tilt");

            target.addEventListener("mousemove", function (event) {
                var rect = target.getBoundingClientRect();
                var px = (event.clientX - rect.left) / rect.width;
                var py = (event.clientY - rect.top) / rect.height;
                var rotateY = (px - 0.5) * 6;
                var rotateX = (0.5 - py) * 6;
                target.style.transform =
                    "perspective(900px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) translateY(-2px)";
            });

            target.addEventListener("mouseleave", function () {
                target.style.transform = "";
            });
        });
    }

    var progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    document.body.prepend(progressBar);
    var progressLabel = document.createElement("div");
    progressLabel.id = "scroll-progress-label";
    progressLabel.textContent = "0%";
    document.body.prepend(progressLabel);

    var bodyEl = document.body;
    var ticking = false;
    var heroMedia = document.querySelector(".hero-video__media");

    function renderScrollEffects() {
        var scrollTop = window.scrollY || window.pageYOffset;
        var maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        var progress = Math.min((scrollTop / maxScroll) * 100, 100);
        progressBar.style.width = progress + "%";
        progressLabel.textContent = Math.round(progress) + "%";

        if (heroMedia) {
            var parallaxY = Math.min(scrollTop * 0.12, 60);
            heroMedia.style.transform = "scale(1.06) translateY(" + parallaxY + "px)";
        }

        var waveA = Math.sin(scrollTop / 360);
        var waveB = Math.cos(scrollTop / 430);
        bodyEl.style.setProperty("--orb1-x", (12 + (waveA * 5)).toFixed(2) + "%");
        bodyEl.style.setProperty("--orb1-y", Math.min(22 + (scrollTop * 0.012), 62).toFixed(2) + "%");
        bodyEl.style.setProperty("--orb2-x", (86 + (waveB * 4)).toFixed(2) + "%");
        bodyEl.style.setProperty("--orb2-y", Math.min(28 + (scrollTop * 0.01), 74).toFixed(2) + "%");
        bodyEl.style.setProperty("--orb3-x", (52 + (waveA * 3.5)).toFixed(2) + "%");
        bodyEl.style.setProperty("--orb3-y", Math.min(74 + (scrollTop * 0.007), 92).toFixed(2) + "%");

        depthTargets.forEach(function (section) {
            var rect = section.getBoundingClientRect();
            var viewportCenter = window.innerHeight / 2;
            var sectionCenter = rect.top + (rect.height / 2);
            var distanceRatio = (sectionCenter - viewportCenter) / window.innerHeight;
            var depthY = Math.max(Math.min(-distanceRatio * 6, 5), -5);
            var depthRotate = Math.max(Math.min(distanceRatio * 0.35, 0.35), -0.35);
            section.style.setProperty("--depth-y", depthY.toFixed(2) + "px");
            section.style.setProperty("--depth-r", depthRotate.toFixed(2) + "deg");
        });

        ticking = false;
    }

    function queueScrollEffects() {
        if (!ticking) {
            window.requestAnimationFrame(renderScrollEffects);
            ticking = true;
        }
    }

    renderScrollEffects();
    window.addEventListener("scroll", queueScrollEffects, { passive: true });
    window.addEventListener("resize", queueScrollEffects);
});
