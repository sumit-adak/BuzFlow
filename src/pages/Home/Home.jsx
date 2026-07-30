import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import bizflowVisual from "../../assets/bizflow_visual.png";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navigate = useNavigate();

  // GSAP Refs
  const mainRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroTrustRef = useRef(null);
  const heroVisualRef = useRef(null);

  const brandsRef = useRef(null);

  const featuresHeaderRef = useRef(null);
  const bentoGridRef = useRef(null);

  const showcaseHeaderRef = useRef(null);
  const showcaseVisualRef = useRef(null);
  const showcaseFloatRef = useRef(null);

  const aiHeaderRef = useRef(null);
  const aiChatCardRef = useRef(null);

  const pricingHeaderRef = useRef(null);
  const pricingCardsRef = useRef(null);

  const ctaBannerRef = useRef(null);

  // AI Interactive Demo state inside landing page
  const [aiDemoChats, setAiDemoChats] = useState([
    { sender: "user", text: "How much did I sell today?", time: "10:42 AM" },
    {
      sender: "ai",
      text: "You've sold **₹4,250.20** so far today. This is **15% higher** than yesterday at this same time. Your top performer is the *Organic Espresso Blend*.",
      time: "10:42 AM",
    },
  ]);
  const [demoInput, setDemoInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleDemoSend = (e) => {
    e?.preventDefault();
    if (!demoInput.trim()) return;

    const userMsg = {
      sender: "user",
      text: demoInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setAiDemoChats((prev) => [...prev, userMsg]);
    const promptText = demoInput;
    setDemoInput("");
    setIsAiTyping(true);

    setTimeout(() => {
      setIsAiTyping(false);
      let reply = "Your store telemetry shows healthy growth. Monthly recurring revenue is up **+18.4%** across 528 active client accounts.";
      const lower = promptText.toLowerCase();

      if (lower.includes("inventory") || lower.includes("stock")) {
        reply = "Butter Croissant Box and Organic Honey Jar are approaching safety threshold. Reordering 20 units will prevent Q3 stockouts.";
      } else if (lower.includes("customer") || lower.includes("crm") || lower.includes("due")) {
        reply = "You have 2 client accounts with pending dues (₹14,600.00 total). Automated payment reminders have been queued.";
      }

      setAiDemoChats((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 800);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- 1. HERO REVEAL ANIMATIONS ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      if (heroBadgeRef.current) {
        tl.fromTo(
          heroBadgeRef.current,
          { opacity: 0, y: -25, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, clearProps: "transform,opacity" }
        );
      }

      if (heroTitleRef.current) {
        const titleWords = heroTitleRef.current.querySelectorAll(".reveal-word");
        if (titleWords.length > 0) {
          tl.fromTo(
            titleWords,
            { opacity: 0, y: 50, rotateX: -15 },
            { opacity: 1, y: 0, rotateX: 0, stagger: 0.07, duration: 1, ease: "power4.out", clearProps: "transform,opacity" },
            "-=0.4"
          );
        } else {
          tl.fromTo(
            heroTitleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, clearProps: "transform,opacity" },
            "-=0.4"
          );
        }
      }

      if (heroDescRef.current) {
        tl.fromTo(
          heroDescRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "transform,opacity" },
          "-=0.7"
        );
      }

      if (heroCtaRef.current) {
        tl.fromTo(
          heroCtaRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, clearProps: "transform,opacity" },
          "-=0.6"
        );
      }

      if (heroTrustRef.current) {
        tl.fromTo(
          heroTrustRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, clearProps: "transform,opacity" },
          "-=0.5"
        );
      }

      if (heroVisualRef.current) {
        tl.fromTo(
          heroVisualRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" },
          "-=1.1"
        );
      }

      // --- 2. TRUSTED BRANDS SCROLL ANIMATION ---
      if (brandsRef.current) {
        const brandLogos = brandsRef.current.querySelectorAll("img");
        gsap.fromTo(
          brandLogos,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: brandsRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // --- 3. FEATURES BENTO GRID SCROLL ANIMATIONS ---
      if (featuresHeaderRef.current) {
        gsap.fromTo(
          featuresHeaderRef.current.children,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: featuresHeaderRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      if (bentoGridRef.current) {
        const cards = bentoGridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // --- 4. SHOWCASE SECTION SCROLL ANIMATIONS ---
      if (showcaseHeaderRef.current) {
        gsap.fromTo(
          showcaseHeaderRef.current.children,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: showcaseHeaderRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      if (showcaseVisualRef.current) {
        gsap.fromTo(
          showcaseVisualRef.current,
          { scale: 0.94, opacity: 0.8, y: 30 },
          {
            scrollTrigger: {
              trigger: showcaseVisualRef.current,
              start: "top 92%",
              end: "bottom 30%",
              scrub: 0.5,
            },
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "none",
          }
        );
      }

      if (showcaseFloatRef.current) {
        gsap.fromTo(
          showcaseFloatRef.current,
          { opacity: 0, x: 50, scale: 0.9 },
          {
            scrollTrigger: {
              trigger: showcaseVisualRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // --- 5. AI DEMO SCROLL ANIMATION ---
      if (aiHeaderRef.current) {
        gsap.fromTo(
          aiHeaderRef.current.children,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: aiHeaderRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      if (aiChatCardRef.current) {
        gsap.fromTo(
          aiChatCardRef.current,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            scrollTrigger: {
              trigger: aiChatCardRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // --- 6. PRICING SCROLL ANIMATION ---
      if (pricingHeaderRef.current) {
        gsap.fromTo(
          pricingHeaderRef.current.children,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: pricingHeaderRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      if (pricingCardsRef.current) {
        const pCards = pricingCardsRef.current.children;
        gsap.fromTo(
          pCards,
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: pricingCardsRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // --- 7. FINAL CTA BANNER SCROLL ANIMATION ---
      if (ctaBannerRef.current) {
        gsap.fromTo(
          ctaBannerRef.current,
          { opacity: 0, scale: 0.93, y: 40 },
          {
            scrollTrigger: {
              trigger: ctaBannerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }

      // Refresh ScrollTrigger after initial mount layout rendering
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-[#f8f9ff] dark:bg-slate-950 text-[#0d1c2e] dark:text-white font-sans antialiased overflow-x-hidden transition-colors"
    >
      <Navbar />

      <main className="pt-8 sm:pt-14">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 lg:py-28 overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-9 z-10">
              <div
                ref={heroBadgeRef}
                className="inline-flex items-center gap-2.5 bg-blue-600/10 dark:bg-blue-950/70 border border-blue-500/20 text-blue-600 dark:text-blue-400 px-5 py-2.5 rounded-full text-sm sm:text-base font-bold shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <span>Now with AI-Powered Store Intelligence</span>
              </div>

              <h1
                ref={heroTitleRef}
                className="text-5xl sm:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-[#0d1c2e] dark:text-white leading-[1.06]"
              >
                <span className="inline-block reveal-word">Run</span>{" "}
                <span className="inline-block reveal-word">Your</span>{" "}
                <span className="inline-block reveal-word">Business.</span>{" "}
                <br className="hidden sm:inline" />
                <span className="text-blue-600 dark:text-blue-400 inline-block reveal-word">
                  Without
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400 inline-block reveal-word">
                  the
                </span>{" "}
                <span className="text-blue-600 dark:text-blue-400 inline-block reveal-word">
                  Complexity.
                </span>
              </h1>

              <p
                ref={heroDescRef}
                className="text-lg sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal"
              >
                The all-in-one operating system designed for modern Indian retail and service businesses. Manage POS billing (₹ INR), CRM, tasks, and analytics in one unified dashboard.
              </p>

              <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-5 pt-3">
                <button
                  onClick={() => navigate("/register")}
                  className="bg-blue-600 text-white font-extrabold text-lg sm:text-xl px-10 py-4.5 rounded-2xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all cursor-pointer hover:shadow-blue-500/25"
                >
                  Start Free Trial →
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl px-10 py-4.5 rounded-2xl shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
                >
                  Explore Live Demo
                </button>
              </div>

              <div ref={heroTrustRef} className="flex flex-wrap gap-7 text-slate-600 dark:text-slate-400 text-sm sm:text-base font-semibold pt-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl font-bold">check_circle</span> No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl font-bold">bolt</span> Instant 2-min setup
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl font-bold">cancel</span> Cancel anytime
                </div>
              </div>
            </div>

            {/* Hero Mockup Graphic */}
            <div ref={heroVisualRef} className="lg:col-span-5 relative flex items-center justify-center">
              <div className="floating z-10 w-full">
                <img
                  className="w-full max-w-[720px] drop-shadow-2xl rounded-3xl border-2 border-slate-200 dark:border-slate-800"
                  alt="BizFlow UI Dashboard Showcase"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2vYCjItLyplvd7mK_IBl-ecXNn9TBUlMaXcLTKkoDKXGfscpytyL1Xwjue1srC3f7cMlhjHMw2UBj_fs3aOPx8rgwt5KAOsrgr1xyCWzXZ8HaUW7a4GVCP4pP7VF431iqaSoedVkJ-qFmhNmNopOZXn0HytpZwlqHqyjuj05whZBZHvx4kcaB1x7SNc-IXZyczePvdYhfN4mg2KiprOmKV76iSmG2g1jGTZ89zxqG2tHmvqmd0ccB"
                />
              </div>
              <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
            </div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section ref={brandsRef} className="py-14 sm:py-18 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
          <div className="max-w-[1360px] mx-auto px-6 text-center">
            <p className="text-sm font-extrabold text-slate-400 dark:text-slate-500 mb-10 uppercase tracking-widest">
              Trusted by 10,000+ growing retail & service businesses worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-60 dark:opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
              <img
                className="h-9 sm:h-10 object-contain dark:invert"
                alt="Urban Brew"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApkFmYS3ndjoZM11hqnCNl1p3EUnvYb0Vn6-6R5gqbZQ6eDRdbmJOC2MrZK3dv11gQIfmOH_D5F8FHjx7jKhjupSOcCZymZZ8vNWqXu4fa-L6yIFxv1Q9T85_lEPy_0SOtf9eRHz2Fjiv-IzKvrrXS2UQ1Y4rhIEwpYYDQHMOA6PFyPTiArwCLJEKFGqRGOKeM5UsoRfGol3mYont3X1cU0U04YPHp6BhwOZ55PzmhKqyCC96Yad62"
              />
              <img
                className="h-9 sm:h-10 object-contain dark:invert"
                alt="Luxe Lane"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-GeIBoEBuauAZgPvQl_fpgfJ-Hu2fbaYrlmbu8NGSGraxL7eTN6yVxDchCabu_YeJSr1N_qm3yWIYrYT6CQW_Hv3L3WNuDnYW5J6eL88PCdripnk-AkF23PIjt5hETltAeKLRrib46zzeztNFpwM5IRMLOsEqhU3HEt5NdHv_fngeTc8iaxAkciQnKlGYvFpH5JV7QF9fW-8VGf1S_SeKM_Xih7ge1dUzTiZ3ZVIghhfuUp1wBzW0"
              />
              <img
                className="h-9 sm:h-10 object-contain dark:invert"
                alt="SwiftLink"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDipGCZXqbNJQjHZFowe93rUXyzFjuzeVvRu3J-wZSCMuo5BYN0wFyqB868M35TfNPpNPt62E-OQAWV2-SkxI3EqT2q3aUjCtYnXhoHx5XQEHRNqaqfLSTb5U5kP_f3BNK5E_r5yeQwMq4TIsyV3BkhqRTHU6io1bDdc2pS1Ul_In6aFqUWd3T_JnaJlT678R-0RR9RiHPJpSLmlDeDYfr4LpEtzQpMy8W9ykSRMmamUsZ3UvilO6oA"
              />
              <img
                className="h-9 sm:h-10 object-contain dark:invert"
                alt="Zenith Fitness"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYRteo6wFkfLp18f6nezRD_thIj1ZG3UPxu16jtEFEaeXZYtBCoqwJPE1bEz7iq4yikDH-2nw1lqnw_e5F7g0ADBoet_GM1m8OL6pdCsd44IA267JAUaZPjyoBcX0fq7EjJBqgDcSRALlAv8O1knKcoJrMvUx8htQvO1h1fgQ7t1Ft_dpV8A7ZrDeEX-FxbAj5vvKZ2yZvI2B6K3wRlUCu7PZbxJcK2hU4r3emjzJSPrjVfEfjLVNV"
              />
              <img
                className="h-9 sm:h-10 object-contain dark:invert"
                alt="Artisan Goods"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhpRsePK0zgdxdK2bTUSZ0NzTHdYzJRKvjj2hGKPJQgxjIKHtkRGEe9Snvg7N_hG3r5nFtT1snaQ0SbsbiEpBZfDQVkBwtn7DSKrpp2V-mt3iBBZkDKcv1bDmM8rPwb2SP3lIp4iLIJwO0prmP7Qb162nOkPTyUwVmTPPtmErBMPGRCzKn4D9jrDPhiDpvTVF5julzSm3iXtnxE-IjNWZFFTA-ENYhjFKCv4i90J8r3XHkOm5MwQWZ"
              />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 sm:py-32 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div ref={featuresHeaderRef} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0d1c2e] dark:text-white tracking-tight">
              Everything you need to scale
            </h2>
            <p className="text-lg sm:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-normal">
              Powerful tools built for speed and clarity. No bloat, just pure business performance.
            </p>
          </div>

          <div ref={bentoGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Feature 1 */}
            <div className="glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-600/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-7 shadow-xs">
                  <span className="material-symbols-outlined text-4xl">point_of_sale</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-3">POS Billing</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Fast, reliable checkout with integrated UPI/QR payments and real-time inventory syncing.
                </p>
              </div>
              <div className="h-36 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 overflow-hidden border border-slate-200/80 dark:border-slate-700 relative">
                <div className="flex justify-between text-xs text-blue-600 dark:text-blue-400 font-extrabold mb-2">
                  <span>NEW TRANSACTION</span> <span>#4421</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-2.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-9 w-3/5 bg-blue-600/20 rounded-xl mt-3 flex items-center px-3 font-black text-sm text-blue-600 dark:text-blue-400">
                    ₹499.00 PAID ✓
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-600/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-7 shadow-xs">
                  <span className="material-symbols-outlined text-4xl">groups</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-3">Customer CRM</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Turn one-time visitors into loyal regulars with automated credit ledger and purchase tracking.
                </p>
              </div>
              <div className="flex gap-4 h-36 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  alt="Customer"
                  className="w-12 h-12 rounded-full object-cover shrink-0 ring-4 ring-blue-500/20"
                />
                <div className="space-y-2 w-full">
                  <div className="h-4 w-3/5 bg-slate-800 dark:bg-slate-200 rounded-md font-bold text-xs text-white dark:text-slate-900 px-2 flex items-center">
                    Eleanor Vance (VIP)
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-2.5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-600/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-7 shadow-xs">
                  <span className="material-symbols-outlined text-4xl">query_stats</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-3">Business Analytics</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Real-time revenue dashboards that tell you exactly what’s selling and where to optimize.
                </p>
              </div>
              <div className="h-36 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 flex items-end gap-3">
                <div className="w-full bg-blue-600/40 h-[45%] rounded-t-lg" />
                <div className="w-full bg-blue-600/65 h-[65%] rounded-t-lg" />
                <div className="w-full bg-blue-600 h-[95%] rounded-t-lg shadow-sm" />
                <div className="w-full bg-blue-600/80 h-[80%] rounded-t-lg" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-600/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-7 shadow-xs">
                  <span className="material-symbols-outlined text-4xl">smart_toy</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-3">AI Assistant</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Your smart business co-pilot. Ask natural questions and get instant data insights in ₹ INR.
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/70 rounded-2xl p-3.5 h-36 flex flex-col justify-end gap-2 text-xs sm:text-sm">
                <div className="bg-blue-600 text-white p-2.5 rounded-xl self-end max-w-[85%] font-medium shadow-xs">
                  How's my daily growth?
                </div>
                <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2.5 rounded-xl self-start max-w-[85%] shadow-xs font-bold border border-slate-200 dark:border-slate-700">
                  Up +18.4% compared to yesterday!
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-600/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-7 shadow-xs">
                  <span className="material-symbols-outlined text-4xl">task_alt</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-3">Task Management</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Keep staff and store operations synchronized with automated task assignments.
                </p>
              </div>
              <div className="space-y-2.5 pt-1 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 h-36">
                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm shadow-2xs">
                  <div className="w-4 h-4 border-2 border-blue-600 rounded-sm shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 font-bold truncate">Restock Coffee Beans</span>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm shadow-2xs">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-white text-[10px] shrink-0 font-bold">✓</div>
                  <span className="text-slate-400 dark:text-slate-500 line-through truncate font-medium">Send GST invoice</span>
                </div>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-9 rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all border border-slate-200/90 dark:border-slate-800 dark:bg-slate-900/80 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-600/15 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-7 shadow-xs">
                  <span className="material-symbols-outlined text-4xl">description</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-3">GST Reports</h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  One-click P&L statements, tax summaries, and downloadable invoices.
                </p>
              </div>
              <div className="h-36 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center">
                <div className="w-28 h-28 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs p-3 space-y-2">
                  <div className="h-2.5 w-full bg-blue-600/40 rounded-full" />
                  <div className="h-2.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full" />
                  <div className="h-2.5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Large Dashboard Showcase Section */}
        <section className="py-24 sm:py-32 bg-slate-100/70 dark:bg-slate-900/50 relative overflow-hidden border-y border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div className="relative rounded-[36px] border-2 border-slate-200/90 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 p-8 sm:p-14 lg:p-16">
              <div ref={showcaseHeaderRef} className="flex flex-col md:flex-row gap-10 items-center mb-14">
                <div className="md:w-1/2 space-y-4">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0d1c2e] dark:text-white tracking-tight leading-tight">
                    Visualize success in real-time
                  </h2>
                  <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Switch between thousands of telemetry data points effortlessly. Engineered to keep you focused on increasing daily store revenue.
                  </p>
                </div>
                <div className="md:w-1/2 flex justify-end">
                  <div className="p-6 bg-blue-50/90 dark:bg-blue-950/60 rounded-3xl border border-blue-200 dark:border-blue-800 flex flex-col gap-3 min-w-[280px] shadow-sm">
                    <span className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                      Monthly Revenue Target
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">₹4,28,500 / ₹5,00,000</span>
                    <div className="w-full h-3.5 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-blue-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div ref={showcaseVisualRef}>
                  <img
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl"
                    alt="High fidelity SaaS Dashboard UI"
                    src={bizflowVisual}
                  />
                </div>

                {/* Floating Invoice Card */}
                <div
                  ref={showcaseFloatRef}
                  className="absolute -bottom-10 -right-8 hidden lg:block w-80 glass-card dark:bg-slate-900/95 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-bounce duration-[3500ms]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">New POS Invoice</span>
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">more_horiz</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Client:</span> <strong className="text-slate-900 dark:text-white">Artisan Cafe</strong>
                    </div>
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Amount:</span> <strong className="text-blue-600 dark:text-blue-400 text-base font-extrabold">₹4,800.00</strong>
                    </div>
                    <button
                      onClick={() => navigate("/sales")}
                      className="w-full py-3 bg-blue-600 text-white font-extrabold rounded-xl text-sm mt-2 hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
                    >
                      Process Sale →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Copilot Demonstration */}
        <section className="py-24 sm:py-32 max-w-5xl mx-auto px-6">
          <div ref={aiHeaderRef} className="text-center mb-14 space-y-4">
            <div className="inline-block p-4 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-3xl mb-2">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0d1c2e] dark:text-white tracking-tight">
              Ask your business anything
            </h2>
            <p className="text-lg sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal">
              Stop digging through spreadsheets. BizFlow AI parses your store telemetry in natural language (₹ INR).
            </p>
          </div>

          {/* Interactive Chat Card */}
          <div
            ref={aiChatCardRef}
            className="glass-card dark:bg-slate-900/90 rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800"
          >
            <div className="bg-slate-100 dark:bg-slate-800 px-8 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-300">
                BizFlow AI Copilot (Live Interactive Demo)
              </span>
              <div className="w-8" />
            </div>

            <div className="p-8 space-y-5 bg-white/80 dark:bg-slate-900/80 min-h-[360px]">
              {aiDemoChats.map((msg, idx) => {
                const isUser = msg.sender === "user";
                return (
                  <div key={idx} className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1.5`}>
                    <div className="flex items-start gap-3 max-w-[85%]">
                      {!isUser && (
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            insights
                          </span>
                        </div>
                      )}
                      <div
                        className={`p-4 rounded-3xl text-sm sm:text-base leading-relaxed ${
                          isUser
                            ? "bg-blue-600 text-white rounded-tr-none shadow-md font-medium"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 px-3 font-medium">{msg.time}</span>
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex gap-2.5 items-center pl-12 text-sm text-slate-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  <span>BizFlow AI is parsing store telemetry...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleDemoSend} className="p-5 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex gap-4">
              <input
                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 rounded-2xl px-5 py-3.5 text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400 font-medium"
                placeholder="Ask about daily sales, customer dues, stock reorders..."
                type="text"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-7 py-3.5 rounded-2xl font-extrabold flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg cursor-pointer text-base"
              >
                <span className="material-symbols-outlined text-2xl">send</span>
              </button>
            </form>
          </div>
        </section>

        {/* Indian Rupee Pricing Section */}
        <section className="py-24 sm:py-32 max-w-[1360px] mx-auto px-6 lg:px-10" id="pricing">
          <div ref={pricingHeaderRef} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0d1c2e] dark:text-white tracking-tight">
              Simple, transparent pricing (₹ INR)
            </h2>
            <p className="text-lg sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the plan built to accelerate your store’s scale.
            </p>
          </div>

          <div ref={pricingCardsRef} className="grid md:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="glass-card dark:bg-slate-900/80 p-9 sm:p-10 rounded-3xl flex flex-col border border-slate-200 dark:border-slate-800 justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 my-5">
                  <span className="text-5xl sm:text-6xl font-black text-[#0d1c2e] dark:text-white">₹999</span>
                  <span className="text-sm text-slate-500 font-bold">/mo</span>
                </div>
                <p className="text-sm sm:text-base text-slate-500 mb-8">Perfect for single retail outlets and kiosks.</p>
                <ul className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-10">
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> 1 Location Outlet</li>
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> 3 Staff Accounts</li>
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> Basic POS & GST Billing</li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-4 rounded-2xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-extrabold hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all text-base cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="relative glass-card dark:bg-slate-900 p-9 sm:p-10 rounded-3xl flex flex-col border-3 border-blue-600 shadow-2xl scale-105 z-10 justify-between">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-2">Professional</h3>
                <div className="flex items-baseline gap-1 my-5">
                  <span className="text-5xl sm:text-6xl font-black text-blue-600 dark:text-blue-400">₹2,499</span>
                  <span className="text-sm text-slate-500 font-bold">/mo</span>
                </div>
                <p className="text-sm sm:text-base text-slate-500 mb-8">For growing retail & multi-service brands.</p>
                <ul className="space-y-4 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-semibold mb-10">
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> Unlimited Locations</li>
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> Unlimited Staff Roles</li>
                  <li className="flex gap-3 items-center font-extrabold text-blue-600 dark:text-blue-400"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> BizFlow AI Copilot Included</li>
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> Priority WhatsApp Support</li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-4 rounded-2xl bg-blue-600 text-white font-extrabold shadow-xl hover:bg-blue-700 active:scale-95 transition-all text-base cursor-pointer"
              >
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card dark:bg-slate-900/80 p-9 sm:p-10 rounded-3xl flex flex-col border border-slate-200 dark:border-slate-800 justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0d1c2e] dark:text-white mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1 my-5">
                  <span className="text-5xl sm:text-6xl font-black text-[#0d1c2e] dark:text-white">Custom</span>
                </div>
                <p className="text-sm sm:text-base text-slate-500 mb-8">Solutions for multi-chain store networks.</p>
                <ul className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-10">
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> API & Webhook Integrations</li>
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> Custom GST Audit Reports</li>
                  <li className="flex gap-3 items-center"><span className="material-symbols-outlined text-emerald-600 text-xl font-bold">check</span> Dedicated Account Manager</li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/register")}
                className="w-full py-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-extrabold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-base cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-24 sm:py-32">
          <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
            <div
              ref={ctaBannerRef}
              className="bg-blue-600 rounded-[40px] p-12 sm:p-20 text-center text-white relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-tight">
                  Ready to grow your business?
                </h2>
                <p className="text-lg sm:text-2xl text-blue-100 max-w-3xl mx-auto font-normal leading-relaxed">
                  Join 10,000+ businesses running on BizFlow. Start your 14-day free trial today. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-white text-blue-600 font-black text-lg sm:text-xl px-10 py-4.5 rounded-2xl shadow-xl hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
                  >
                    Start your free trial →
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-transparent border-2 border-white text-white font-black text-lg sm:text-xl px-10 py-4.5 rounded-2xl hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                  >
                    Explore Dashboard
                  </button>
                </div>
              </div>
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/25 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

