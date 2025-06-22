import { Event } from "@/types/types";

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
            "id": 13123123123,
            "title": "User Experience Survey",
            "icon": "user",
            "description": "Help us improve the design and usability of our website.",
            "release_date": "2023-10-01",
            // will be new indicator and answer date
            "questions": [
                {
                    "id": "q1",
                    "type": "rating",
                    "question": "How would you rate your overall experience?",
                    "options": [1, 2, 3, 4, 5]
                },
                {
                    "id": "q2",
                    "type": "multiple_choice",
                    "question": "What device do you use the most to visit our site?",
                    "options": ["Desktop", "Tablet", "Mobile"]
                },
                {
                    "id": "q3",
                    "type": "checkbox",
                    "question": "Which of these features do you find helpful?",
                    "options": ["Events", "Projects", "Blog Posts", "Job Board", "Downloads"]
                },
                {
                    "id": "q4",
                    "type": "text",
                    "question": "Any suggestions for improvement?",
                    "placeholder": "Your feedback is valuable to us."
                }
            ]
        },
        {
            "id": 1312312312312,
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
                    "type": "single_choice",
                    "question": "Which track did you join?",
                    "options": ["AI/ML", "Web Dev", "Cybersecurity", "Game Dev", "Didn't Join"]
                },
                {
                    "id": "q3",
                    "type": "number",
                    "question": "How many hours did you spend on your project?",
                    "placeholder": "Enter a number"
                },
                {
                    "id": "q4",
                    "type": "text",
                    "question": "Share your favorite moment from the event.",
                    "placeholder": "We'd love to hear your story!"
                }
            ]
        },
        {
            "id": 1312323421,
            "title": "Feature Request",
            "icon": "feature",
            "description": "Let us know what new features you'd love to see.",
            "questions": [
                {
                    "id": "q1",
                    "type": "text",
                    "question": "What feature would you like us to build?",
                    "placeholder": "Describe the feature in detail."
                },
                {
                    "id": "q2",
                    "type": "text",
                    "question": "Why is this feature important to you?",
                    "placeholder": "Explain how this feature would benefit you."
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

export const EventsData: Event[] = [
    {
        slug: 'kjashdlkjads',
        title: "Tech Conference 2025",
        description: "A large conference focusing on the latest in tech innovation.",
        event_date: "2025-06-15T10:00:00",
        location: [40.7128, -74.0060], // New York City coords
        capacity_limit: 500,
        is_online: false,
        registration_url: "https://techconf2025.com/register"
    },
    {
        slug: 'alsjdhjadbaj',
        title: "Online Marketing Webinar",
        description: "A free online webinar about digital marketing strategies.",
        event_date: "2025-05-20T18:00:00",
        location: [0, 0], // Online, so dummy coords
        capacity_limit: 1000,
        is_online: true,
        registration_url: "https://marketingwebinar.com/signup"
    },
    {
        slug: 'lajksdgabsd',
        title: "Community Cleanup Day",
        description: "Join us in cleaning up the local park and making a difference.",
        event_date: "2025-06-01T09:00:00",
        location: [34.0522, -118.2437], // Los Angeles coords
        capacity_limit: 200,
        is_online: false,
        registration_url: null
    },
    {
        slug: 'asdflkjhadsasdbasbdf',
        title: "AI & Ethics Panel",
        description: "Discussion on the ethical implications of AI technologies.",
        event_date: "2025-07-10T14:00:00",
        location: [51.5074, -0.1278], // London coords
        capacity_limit: 300,
        is_online: true,
        registration_url: "https://aiethics2025.com"
    },
    {
        slug: 'kasndjlabnajbq',
        title: "Startup Pitch Night",
        description: "Local startups present their ideas to investors.",
        event_date: "2025-08-05T19:00:00",
        location: [37.7749, -122.4194], // San Francisco coords
        capacity_limit: 150,
        is_online: false,
        registration_url: "https://startuppitchnight.com/register"
    }
];

// This is an example for answered survey POST request
const _SurveyRequest = {
    "surveys": [
        {
            "id": 13123123123,
            "title": "User Experience Survey",
            "description": "Help us improve the design and usability of our website.",
            "questions": [
                {
                    "id": "q1",
                    "type": "rating",
                    "question": "How would you rate your overall experience?",
                    "options": [1, 2, 3, 4, 5],
                    "answer": 4
                },
                {
                    "id": "q2",
                    "type": "multiple_choice",
                    "question": "What device do you use the most to visit our site?",
                    "options": ["Desktop", "Tablet", "Mobile"],
                    "answer": "Desktop"
                },
                {
                    "id": "q3",
                    "type": "checkbox",
                    "question": "Which of these features do you find helpful?",
                    "options": ["Events", "Projects", "Blog Posts", "Job Board", "Downloads"],
                    "answer": ["Events", "Blog Posts"]
                },
                {
                    "id": "q4",
                    "type": "text",
                    "question": "Any suggestions for improvement?",
                    "answer": "The site is great, but I would love to see more tutorials."
                }
            ]
        }
    ]
}

export const StatsPOSTData = [
    { id: 1, answer: 'Evet' },
    { id: 2, answer: 'Hayır' },
    { id: 3, answer: 'Evet' },
    { id: 4, answer: 'Evet' },
    { id: 5, answer: 'Belki' },
    { id: 6, answer: 'Hayır' },
    { id: 7, answer: 'Evet' },
];


