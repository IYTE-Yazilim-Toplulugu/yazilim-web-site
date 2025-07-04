"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    UserCircleIcon,
} from "@/components/admin/icons";
import {
    GalleryVerticalIcon,
    HomeIcon, MegaphoneIcon,
    MessageCircleQuestionIcon,
    Rss,
    SendIcon,
    SettingsIcon
} from "lucide-react";
import YazilimIcon from "@/components/yazilim_icon";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: "Dashboard",
        path: "/admin"
    },
    {
        icon: <UserCircleIcon />,
        name: "Users",
        path: "/admin/user/all",
    },
    {
        icon: <MessageCircleQuestionIcon />,
        name: "Forms",
        path: "/admin/survey",
    },
    {
        icon: <Rss />,
        name: "Blogs",
        path: "/admin/blog",
    },
    {
        icon: <CalenderIcon />,
        name: "Events",
        path: "/admin/event",
    },
    {
        icon: <MegaphoneIcon />,
        name: "Announcements",
        path: "/admin/announcement",
    },
    {
        icon: <GalleryVerticalIcon />,
        name: "Gallery",
        path: "/admin/gallery",
    },
    {
        icon: <SendIcon />,
        name: "Contact Forms",
        path: "/admin/forms",
    },
    {
        icon: <SettingsIcon />,
        name: "Configuration",
        path: "/admin/configuration",
    },
    {
        icon: <HomeIcon />,
        name: "Home Page",
        path: "/",
    },
    /*{
        name: "Forms",
        icon: <ListIcon />,
        subItems: [{ name: "Form Elements", path: "/form-elements" }],
    },
    {
        name: "Tables",
        icon: <TableIcon />,
        subItems: [{ name: "Basic Tables", path: "/basic-tables" }],
    },
    {
        name: "Pages",
        icon: <PageIcon />,
        subItems: [
            { name: "Blank Page", path: "/blank" },
            { name: "404 Error", path: "/error-404" },
        ],
    },*/
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const pathname = usePathname();

    const renderMenuItems = (
        navItems: NavItem[]
    ) => (
        <ul className={`flex flex-col gap-4 ${isExpanded || isHovered || isMobileOpen ? '' : 'items-center'}`}>
            {navItems.map((nav, index) => {
                const isActive = nav.path ? checkActive(nav.path) : false;
                return (
                    <li key={nav.name}>
                        {nav.subItems ? (
                            <button
                                onClick={() => handleSubmenuToggle(index)}
                                className={`menu-item flex flex-row gap-4 justify-center ${openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                                    } cursor-pointer ${!isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "lg:justify-start"
                                    }`}
                            >
                                <span
                                    className={` ${openSubmenu?.index === index
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                        }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className={`menu-item-text`}>{nav.name}</span>
                                )}
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <ChevronDownIcon
                                        className={`ml-auto w-5 h-5 transition-transform duration-200  ${openSubmenu?.index === index
                                            ? "rotate-180 text-brand-500"
                                            : ""
                                            }`}
                                    />
                                )}
                            </button>
                        ) : (
                            nav.path && (
                                <Link
                                    href={nav.path}
                                    className={`${isActive ? 'bg-bite-tongue text-white' : 'text-gray-600 dark:text-gray-300'} p-3 rounded-xl hover:opacity-70 flex flex-row gap-4 ${isActive ? "menu-item-active" : "menu-item-inactive"
                                        }`}
                                >
                                    <span
                                        className={`${isActive
                                            ? "text-white"
                                            : ""
                                            }`}
                                    >
                                        {nav.icon}
                                    </span>
                                    {(isExpanded || isHovered || isMobileOpen) && (
                                        <span className={`menu-item-text`}>{nav.name}</span>
                                    )}
                                </Link>
                            )
                        )}
                        {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[`nav-${index}`] = el;
                                }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    height:
                                        openSubmenu?.index === index
                                            ? `${subMenuHeight[`nav-${index}`]}px`
                                            : "0px",
                                }}
                            >
                                <ul className="mt-2 space-y-1 ml-9">
                                    {nav.subItems.map((subItem) => {
                                        const isActive = checkActive(subItem.path);
                                        return (
                                            <li key={subItem.name}>
                                                <Link
                                                    href={subItem.path}
                                                    className={`menu-dropdown-item ${isActive
                                                        ? "menu-dropdown-item-active"
                                                        : "menu-dropdown-item-inactive"
                                                        }`}
                                                >
                                                    {subItem.name}
                                                    <span className="flex items-center gap-1 ml-auto">
                                                        {subItem.new && (
                                                            <span
                                                                className={`ml-auto ${isActive
                                                                    ? "menu-dropdown-badge-active"
                                                                    : "menu-dropdown-badge-inactive"
                                                                    } menu-dropdown-badge `}
                                                            >
                                                                new
                                                            </span>
                                                        )}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    const [openSubmenu, setOpenSubmenu] = useState<{
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const checkActive = (path: string) => path === pathname;
    const checkActive = useCallback((path: string) => path === pathname, [pathname]);

    useEffect(() => {
        // Check if the current path matches any submenu item
        let submenuMatched = false;
        navItems.forEach((nav, index) => {
            if (nav.subItems) {
                nav.subItems.forEach((subItem) => {
                    if (checkActive(subItem.path)) {
                        setOpenSubmenu({ index: index });
                        submenuMatched = true;
                    }
                });
            }
        });

        // If no submenu item matches, close the open submenu
        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, checkActive]);

    useEffect(() => {
        // Set the height of the submenu items when the submenu is opened
        if (openSubmenu !== null) {
            const key = `nav-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { index };
        });
    };

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : isHovered
                        ? "w-[290px]"
                        : "w-[90px]"
                }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex cursor-default ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
                    }`}
            >
                {isExpanded || isHovered || isMobileOpen ? (
                    <div className={"flex items-center gap-4 overflow-hidden"}>
                        <YazilimIcon
                            className={" dark:fill-white"}
                            width={48}
                        />
                        <span className={"text-gray-800 dark:text-gray-200 text-xl text-nowrap"}>
                            Software Society
                        </span>
                    </div>
                ) : (
                    <YazilimIcon
                        className={" dark:fill-white"}
                        width={36}
                    />
                )}
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 dark:text-white ${!isExpanded && !isHovered
                                    ? "lg:justify-center"
                                    : "justify-start"
                                    }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    "Menu"
                                ) : (
                                    <HorizontaLDots />
                                )}
                            </h2>
                            <div className="overflow-y-auto">{renderMenuItems(navItems)}</div>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
