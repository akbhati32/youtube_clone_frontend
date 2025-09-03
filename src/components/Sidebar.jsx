import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Home, User, History, PlaySquare, TvMinimalPlay, ListVideo,
  Flame, ShoppingBag, Music, Radio, Gamepad2, Newspaper,
  Trophy, GraduationCap, Shirt, Settings, Flag, HelpCircle,
  MessageSquare, Clock, ThumbsUp, Podcast, Clapperboard,
  Youtube, CirclePlay, Baby, Goal,
} from "lucide-react";    // Icon set

// Sidebar Component -> Dynamically renders sidebar navigation sections
const Sidebar = () => {
  // Access sidebar toggle state from Redux store
  const { isSidebarOpen } = useSelector((state) => state.ui);

  // Full sidebar sections (grouped by categories)
  const sections = [
    {
      title: "Main",
      heading: "",
      links: [
        { icon: <Home />, label: "Home", path: '/' },
        { icon: <PlaySquare />, label: "Shorts" },
        { icon: <TvMinimalPlay />, label: "Subscriptions" },
      ],
    },
    {
      title: "User",
      heading: "You",
      links: [
        { icon: <History />, label: "History" },
        { icon: <ListVideo />, label: "Playlists" },
        { icon: <Clock />, label: "Watch Later" },
        { icon: <ThumbsUp />, label: "Liked Video" },
      ],
    },
    {
      title: "Explore",
      heading: "Explore",
      links: [
        { icon: <Flame />, label: "Trending" },
        { icon: <ShoppingBag />, label: "Shopping" },
        { icon: <Music />, label: "Music" },
        { icon: <Clapperboard />, label: "Films" },
        { icon: <Radio />, label: "Live" },
        { icon: <Gamepad2 />, label: "Gaming" },
        { icon: <Newspaper />, label: "News" },
        { icon: <Trophy />, label: "Sports" },
        { icon: <GraduationCap />, label: "Courses" },
        { icon: <Shirt />, label: "Fashion & Beauty" },
        { icon: <Podcast />, label: "Podcasts" },
      ],
    },
    {
      title: "More from YouTube",
      heading: "More from YouTube",
      links: [
        { icon: <Youtube color="red" />, label: "YouTube Premium" },
        { icon: <Goal color="red" />, label: "YouTube Studio" },
        { icon: <CirclePlay color="red" />, label: "YouTube Music" },
        { icon: <Baby color="red" />, label: "YouTube Kids" },
      ],
    },
    {
      title: "Settings",
      heading: "",
      links: [
        { icon: <Settings />, label: "Settings" },
        { icon: <Flag />, label: "Report History" },
        { icon: <HelpCircle />, label: "Help" },
        { icon: <MessageSquare />, label: "Send Feedback" },
      ],
    },
  ];

  // Compact sidebar links (shown when sidebar is collapsed)
  const collapsedLinks = [
    { icon: <Home />, label: "Home", path: '/' },
    { icon: <PlaySquare />, label: "Shorts" },
    { icon: <TvMinimalPlay />, label: "Subscriptions" },
    { icon: <User />, label: "You" },
  ];

  // --- Collapsed Sidebar (small mode) ---
  if (!isSidebarOpen) {
    return (
      <aside
        className="w-18 flex-shrink-0 p-2 bg-white border-gray-200 hidden md:flex flex-col items-center gap-6 top-16 fixed">
        {collapsedLinks.map((link, i) => (
          <Link
            to={link.path}
            key={i}
            className="flex flex-col items-center text-xs cursor-pointer hover:bg-gray-100 rounded-lg p-2 w-full"
          >
            <div className="w-6 h-6 mb-1">{link.icon}</div>
            <span className="text-[11px]">{link.label}</span>
          </Link>
        ))}
      </aside>
    );
  }

  // --- Expanded Sidebar (full mode) ---
  return (
    <aside
      className="w-60 p-2 top-16 left-0 h-[calc(100vh-4rem)] bg-white overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent absolute z-40 transition-transform duration-300 ease-in-out">
      {/* Optional section heading (e.g., "Explore") */}
      {sections.map((section, index) => (
        <div
          key={index}
          className="mb-4"
        >
          {section.heading && (
            <h3 className="text-md text-left font-semibold mb-2 tracking-wide">
              {section.heading}
            </h3>
          )}

          {/* Render each link */}
          {section.links.map((link, i) => (
            <Link
              to={link.path}
              key={i}
              className="flex items-center gap-6 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <span>{link.icon}</span>
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}

          {/* Divider between sections (except last) */}
          {index !== sections.length - 1 && (
            <hr className="my-4 border-t border-gray-200" />
          )}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;