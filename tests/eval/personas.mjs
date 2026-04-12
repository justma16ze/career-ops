/**
 * tests/eval/personas.mjs — Realistic candidate personas for product quality evaluation.
 *
 * Each persona has full resume data, expected candidate type, and expected strengths.
 * These simulate real users going through the portfolio generation pipeline.
 */

export const personas = [
  {
    name: "Senior Engineer",
    slug: "senior-engineer",
    email: "alex.chen@gmail.com",
    resume: `# Alex Chen

## Summary

Senior Software Engineer with 5 years of experience building high-scale payment systems and distributed infrastructure. Led a 14-service microservices migration at Stripe and shipped real-time collaboration features at Notion. Three patents filed. Passionate about latency optimization and system reliability.

## Experience

### Stripe -- Senior Engineer
**2021 - Present**
- Built payment processing pipeline handling $2B/month in transaction volume
- Led migration from monolith to microservices architecture (14 services)
- Reduced P99 latency from 800ms to 120ms through query optimization and caching
- Mentored 4 junior engineers, 2 promoted within 18 months

### Notion -- Software Engineer
**2018 - 2021**
- Built real-time collaboration engine supporting 10K concurrent editors
- Filed 3 patents for conflict resolution algorithms
- Optimized page load time by 40% through lazy rendering pipeline

## Education

- BS Computer Science, Stanford University (2018)

## Skills

- Go, TypeScript, Python, PostgreSQL, Kafka, Kubernetes, Redis, gRPC, Terraform`,
    profileOverrides: {
      candidate: { type: "experienced" },
      narrative: {
        headline: "Senior engineer who builds payment systems that handle billions.",
        home_bio: '<p>I build the infrastructure behind payments at <a href="https://stripe.com">Stripe</a>, where my team processes over $2B/month. Before that, I built the real-time collaboration engine at <a href="https://notion.so">Notion</a>.</p><p>I care about latency, reliability, and making distributed systems feel simple. Three patents filed, 14 microservices shipped, P99 latency cut from 800ms to 120ms.</p>',
        superpowers: ["Payment processing at scale", "Microservices architecture", "Latency optimization"],
      },
    },
    expectedType: "experienced",
    expectedStrengths: ["payment processing", "microservices", "latency optimization"],
  },
  {
    name: "Graduating Senior",
    slug: "graduating-senior",
    email: "sarah.kim@mit.edu",
    resume: `# Sarah Kim

## Summary

MIT Computer Science senior graduating May 2026. Interned at Google (ML pipeline for Search) and Meta (React Native performance). Built a distributed key-value store with Raft consensus (2.1K GitHub stars). HackMIT 2024 Winner.

## Experience

### Google -- SWE Intern
**Summer 2025**
- Built ML pipeline for Search ranking team, improving relevance by 3.2%
- Processed 50TB of training data using MapReduce and TensorFlow

### Meta -- SWE Intern
**Summer 2024**
- Optimized React Native rendering pipeline, reducing frame drops by 35%
- Contributed to open-source React Native core (2 PRs merged)

## Projects

- \`distributed-kv\` -- Key-value store with Raft consensus protocol, 2.1K GitHub stars
- \`mit-schedule\` -- Course planning tool used by 3K MIT students

## Education

### Massachusetts Institute of Technology
- BS Computer Science (Expected May 2026)
- GPA: 3.9

## Skills

- Python, Rust, React, TypeScript, distributed systems, ML, TensorFlow, MapReduce`,
    profileOverrides: {
      candidate: { type: "student" },
      narrative: {
        headline: "MIT CS senior building distributed systems and ML pipelines.",
        home_bio: '<p>I am a senior at <a href="https://mit.edu">MIT</a> studying Computer Science, graduating in May 2026. I have interned at <a href="https://google.com">Google</a> and <a href="https://meta.com">Meta</a>, working on search ranking ML and React Native performance.</p><p>My side project <a href="https://github.com/sarahkim/distributed-kv">distributed-kv</a> implements Raft consensus and has 2.1K GitHub stars. Winner of HackMIT 2024 Best Technical Hack.</p>',
        superpowers: ["Distributed systems", "ML pipelines", "Open source"],
      },
      education_detail: {
        university: "Massachusetts Institute of Technology",
        degree: "BS Computer Science",
        graduation: "May 2026",
        gpa: "3.9",
      },
    },
    expectedType: "student",
    expectedStrengths: ["distributed systems", "ML", "open source"],
  },
  {
    name: "Career Changer",
    slug: "career-changer",
    email: "mike.j@yahoo.com",
    resume: `# Mike Johnson

## Summary

Product Manager turned Software Engineer. 5 years as Senior PM at Stripe owning Checkout (100K+ businesses), then taught myself to code over 18 months. Now freelancing as a web developer building real business tools in Next.js.

## Experience

### Freelance Web Developer
**2025 - Present**
- Built 4 client sites in Next.js with Vercel deployment
- E-commerce site generating $50K/month revenue for a local business
- Implemented Stripe payment integration and inventory management system

### Stripe -- Senior Product Manager
**2019 - 2024**
- Owned Stripe Checkout, used by 100K+ businesses worldwide
- Launched 3 major features that grew checkout conversion by 22%
- Led cross-functional team of 8 engineers and 2 designers
- Drove $15M ARR growth through feature prioritization and user research

## Education

- BA Economics, UCLA (2019)

## Skills

- JavaScript, React, Next.js, Python, SQL, Stripe API, Vercel, Tailwind CSS`,
    profileOverrides: {
      candidate: { type: "early_career" },
      narrative: {
        headline: "PM-turned-engineer who understands both the product and the code.",
        home_bio: '<p>After 5 years as a Senior PM at <a href="https://stripe.com">Stripe</a> where I owned Checkout for 100K+ businesses, I taught myself to code. Now I build full-stack web applications in Next.js.</p><p>I bring product sense to engineering. My freelance e-commerce project generates $50K/month for a local business, and I have shipped Stripe payment integrations, inventory systems, and 4 client sites.</p>',
        superpowers: ["Product sense", "Customer-facing development", "Self-taught engineering"],
      },
    },
    expectedType: "early_career",
    expectedStrengths: ["product sense", "customer-facing", "self-taught"],
  },
  {
    name: "Designer-Engineer",
    slug: "designer-engineer",
    email: "priya.d@design.co",
    resume: `# Priya Desai

## Summary

Design Engineer combining deep visual design skills with production frontend engineering. Built Linear's onboarding flow (4.2% conversion lift) and Figma's component library used by 10M+ users. RISD-trained designer who writes production TypeScript.

## Experience

### Linear -- Design Engineer
**2023 - Present**
- Built the entire onboarding flow from design to production (4.2% conversion lift)
- Designed and shipped the command palette with keyboard navigation
- Created micro-interactions and animation system using Framer Motion

### Figma -- Software Engineer, Design Systems
**2020 - 2023**
- Built Figma's component library used by 10M+ users worldwide
- Created auto-layout engine v2, reducing layout calculation time by 60%
- Designed and implemented the color token system

## Education

- BFA Graphic Design, Rhode Island School of Design (2020)

## Skills

- TypeScript, React, CSS, Figma, Framer Motion, Three.js, SVG animation, Design tokens`,
    profileOverrides: {
      candidate: { type: "experienced" },
      narrative: {
        headline: "Design engineer who ships beautiful, functional interfaces.",
        home_bio: '<p>I am a design engineer at <a href="https://linear.app">Linear</a>, where I built the onboarding flow that lifted conversion by 4.2%. Before that, I built the component library at <a href="https://figma.com">Figma</a> used by 10M+ users.</p><p>I trained as a graphic designer at <a href="https://risd.edu">RISD</a> and taught myself production TypeScript. I believe the best interfaces come from people who can design AND build them.</p>',
        superpowers: ["Design systems", "UI engineering", "Onboarding optimization"],
      },
    },
    expectedType: "experienced",
    expectedStrengths: ["design systems", "UI engineering", "onboarding"],
  },
  {
    name: "Minimal Profile",
    slug: "minimal-profile",
    email: "j@j.com",
    resume: `# Jordan

## Summary

Looking for SWE roles. Know Python and JavaScript.

## Skills

- Python, JavaScript`,
    profileOverrides: {
      candidate: { type: "early_career" },
      narrative: {
        headline: "Software developer.",
        home_bio: "<p>Looking for software engineering roles. I work with Python and JavaScript.</p>",
        superpowers: [],
      },
    },
    expectedType: "early_career",
    expectedStrengths: [],
  },
];
