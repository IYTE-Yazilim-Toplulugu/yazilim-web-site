import {Configuration} from "@/types/types_config";


const ConfigurationDefaults: Configuration = [
    {
        key: "home_hero",
        value: {
            up_header: {
                title: "Software for everyone",
                color: "#d6665d"
            },
            header: "IYTE Yazilim Society",
            description: "We are a student society at Izmir Institute of Technology, dedicated to software development and technology. Our mission is to foster a community of like-minded individuals who are passionate about software engineering and innovation.",
            workspaces: [
                { content: "Machine Learning", color: "#d6665d" },
                { content: "Generative AI", color: "#0a66c2" },
                { content: "Web Development", color: "#c13584" },
                { content: "Software Solutions", color: "#00875F" },
                { content: "Data Science", color: "#af5fff" },
            ],
            // ====== 1: github, 2: instagram, 3: linkedin, 4: mail ==========
            links: [
                { icon: 1, color: "#8fa781", url: "https://github.com/IYTE-Yazilim-Toplulugu/" },
                { icon: 2, color: "#c13584", url: "https://www.instagram.com/iyte_yazilim/" },
                { icon: 3, color: "#0A66C2", url: "https://www.linkedin.com/company/iyteyazilim/" },
                { icon: 4, color: "#15a5ee", url: "mailto:iyteyazilim@iyte.edu.tr" }

            ]
        }
    },
    {
        key: "home_about_us",
        value: {
            title: "About Us",
            description: "We are a student society at Izmir Institute of Technology, dedicated to software development and technology. Our mission is to foster a community of like-minded individuals who are passionate about software engineering and innovation.",
            // ===== icon: 5: award, 6: broefcase ======
            left_content: [
                {
                    name: "upper_right",
                    title: "Projects",
                    subtitle: "20+",
                    icon: 5,
                },
                {
                    name: "lower_left",
                    title: "Experience",
                    subtitle: "5+ Years",
                    icon: 6,
                },
                {
                    name: "background",
                    image: "/images/yazilim.png",
                },
                {
                    name: "lower_right",
                    title: "Yazilim Toplulugu",
                    subtitle: "Lorem ipsum dolae sti amet",
                }
            ],
            right_content: {
                title: "Software for Everyone",
                description1: "We believe that software should be accessible to everyone. Our society is committed to providing resources, mentorship, and opportunities for all students interested in software development, regardless of their background or experience level.",
                description2: "We believe that software should be accessible to everyone. Our society is committed to providing resources, mentorship, and opportunities for all students interested in software development, regardless of their background or experience level.",
                events: [
                    {
                        content: "Technical Leadership",
                        icon: 6,
                        color: "#5F87FF"
                    },
                    {
                        content: "STEM Education",
                        icon: 10,
                        color: "#AF5FFF"
                    },
                    {
                        content: "Community Building",
                        icon: 11,
                        color: "#00D75F"
                    }
                ],
                link: {
                    title: "View Github",
                    url: "https://github.com/IYTE-Yazilim-Toplulugu/"
                }
            }
        }
    },
    {
        key: "home_footer",
        value: {
            left_content: {
                title: "IYTE Yazilim Toplulugu",
                description: "We are a student society at Izmir Institute of Technology, dedicated to software development and technology. Our mission is to foster a community of like-minded individuals who are passionate about software engineering and innovation.",
                links: [
                    { icon: 1, color: "#8fa781", url: "https://github.com/IYTE-Yazilim-Toplulugu/" },
                    { icon: 2, color: "#c13584", url: "https://www.instagram.com/iyte_yazilim/" },
                    { icon: 3, color: "#0A66C2", url: "https://www.linkedin.com/company/iyteyazilim/" },
                    { icon: 4, color: "#15a5ee", url: "mailto:iyteyazilim@iyte.edu.tr" }
                ]
            },
            quick_links: [
                { title: "Home", url: "/" },
                { title: "Events", url: "/events" },
                { title: "Blogs", url: "/blogs" },
                { title: "Gallery", url: "/gallery" },
                { title: "About Us", url: "/about" },
                { title: "Announcements", url: "/announcements" },
                { title: "Surveys", url: "/surveys" },
                { title: "Contact", url: "/contact" },
            ],
            // ==== icon: 4: mail, 7: phone, 8: location, 9: calendar ====
            contact_info: [
                { title: "iyteyazilim@iyte.edu.te", icon: 4, url: "mailto:iyteyazilim@iyte.edu.tr" },
                { title: "+90 232 123 45 67", icon: 7, url: "tel:+902321234567" },
                { title: "Izmir Institute of Technology", icon: 8, url: "https://maps.app.goo.gl/iaKDw6deFAHEyDho6" },
                { title: "08:00 - 17:00", icon: 9, url: "" }
            ],
            newsletter: {
                description: "Subscribe to our newsletter to stay updated with the latest news and events.",
                placeholder: "Enter your email",
                terms: "By subscribing, you agree to our terms and conditions."
            },
            all_rights_reserved: "© 2025 IYTE Yazilim Toplulugu. All rights reserved."
        }
    }
]

export default ConfigurationDefaults;
