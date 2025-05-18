
// an example for test responses
export const Test = {
    "code": 0,
    "message": "OK",
    "data": {
        "name": "Example",
        "age": 18,
    }
}

export const SwiperData =
    [
        {
            "image": "/images/yazilim.png",
            "slug": "131ahduo81",
            "href": "/products/131ahduo81",
            "title": "AI and the Future of Software Engineering",
            "description": "Explore how artificial intelligence is reshaping the landscape of software development, from code generation to predictive debugging. Learn from real-world applications and upcoming trends."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "x82kdla91s",
            "href": "/products/x82kdla91s",
            "title": "Next.js Deep Dive: Building Performant Web Apps",
            "description": "Join us for a hands-on session diving deep into Next.js. We'll cover server-side rendering, static generation, routing, and optimization techniques to help you build fast, scalable apps."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "pqo29fdl20",
            "href": "/products/pqo29fdl20",
            "title": "Secure Coding Practices in Modern Web Development",
            "description": "Understand the core principles of secure development, common vulnerabilities, and how to integrate security into your everyday workflow across JavaScript, Node.js, and frontend codebases."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "u48dnsle99",
            "href": "/products/u48dnsle99",
            "title": "From Monolith to Microservices: A Migration Guide",
            "description": "Discover the architectural shift from monolithic applications to microservices. Learn strategies for breaking down your codebase, choosing the right services, and deploying with Docker and Kubernetes."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "sld92wmd13",
            "href": "/products/sld92wmd13",
            "title": "Intro to TypeScript for JavaScript Developers",
            "description": "Transitioning to TypeScript? This workshop will help you grasp the fundamentals, understand type safety, and confidently refactor your JavaScript code to be more maintainable and robust."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "mvnd02fl48",
            "href": "/products/mvnd02fl48",
            "title": "Design Systems with Tailwind CSS and Radix UI",
            "description": "Learn how to build scalable, reusable design systems using Tailwind CSS and headless UI libraries like Radix. Perfect for teams looking to ship consistent interfaces fast."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "kkd20dfk99",
            "href": "/products/kkd20dfk99",
            "title": "Mastering Git and GitHub for Collaboration",
            "description": "Collaborate effectively with Git and GitHub. This session covers branching strategies, rebasing, pull requests, code reviews, and resolving merge conflicts in real-world projects."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "aopq39sd09",
            "href": "/products/aopq39sd09",
            "title": "Building Scalable APIs with Node.js and Express",
            "description": "Dive into backend API development with Node.js. Topics include RESTful architecture, middleware, JWT authentication, and deploying APIs with Docker and CI/CD pipelines."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "znb83mds10",
            "href": "/products/znb83mds10",
            "title": "Open Source 101: Contribute and Grow",
            "description": "Want to get started with open source? This event teaches how to find beginner-friendly projects, make your first contributions, and become part of a vibrant global developer community."
        },
        {
            "image": "/images/yazilim.png",
            "slug": "weo49dkp45",
            "href": "/products/weo49dkp45",
            "title": "Cloud Fundamentals: Deploying with AWS & Vercel",
            "description": "Understand the basics of cloud deployment. Compare AWS and Vercel use cases, learn how to deploy full-stack apps, and manage environments and scaling strategies effectively."
        }
    ]


export const SurveyData = {
    "code": 0,
    "message": null,
    "surveys": [
        {
            "id": "user-experience",
            "title": "User Experience Survey",
            "icon": "user",
            "description": "Help us improve the design and usability of our website.",
            "questions": [
                {
                    "id": "q1",
                    "type": "rating",
                    "question": "How would you rate your overall experience?",
                    "scale": 10
                },
                {
                    "id": "q2",
                    "type": "multiple_choice",
                    "question": "What device do you use the most to visit our site?",
                    "options": ["Desktop", "Tablet", "Mobile"]
                },
                {
                    "id": "q3",
                    "type": "checkboxes",
                    "question": "Which of these features do you find helpful?",
                    "options": ["Events", "Projects", "Blog Posts", "Job Board", "Downloads"]
                },
                {
                    "id": "q4",
                    "type": "text",
                    "question": "Any suggestions for improvement?"
                }
            ]
        },
        {
            "id": "event-feedback",
            "title": "Hackathon 2025 Feedback",
            "icon": "event",
            "description": "We’d love to hear what you thought of our latest event.",
            "questions": [
                {
                    "id": "q1",
                    "type": "yes_no",
                    "question": "Did you participate in a team?"
                },
                {
                    "id": "q2",
                    "type": "dropdown",
                    "question": "Which track did you join?",
                    "options": ["AI/ML", "Web Dev", "Cybersecurity", "Game Dev", "Didn't Join"]
                },
                {
                    "id": "q3",
                    "type": "number",
                    "question": "How many hours did you spend on your project?"
                },
                {
                    "id": "q4",
                    "type": "text",
                    "question": "Share your favorite moment from the event."
                }
            ]
        },
        {
            "id": "feature-request",
            "title": "Feature Request",
            "icon": "feature",
            "description": "Let us know what new features you'd love to see.",
            "questions": [
                {
                    "id": "q1",
                    "type": "text",
                    "question": "What feature would you like us to build?"
                },
                {
                    "id": "q2",
                    "type": "text",
                    "question": "Why is this feature important to you?"
                },
                {
                    "id": "q3",
                    "type": "date",
                    "question": "When do you need this feature by?"
                }
            ]
        }
    ]
}
