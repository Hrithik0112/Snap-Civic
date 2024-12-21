export interface CardData {
  id: string;
  userName: string;
  avatarUrl: string;
  postedDate: string;
  imageUrl: string;
  location: string;
  distance: string;
  title: string;
  description: string;
  upvotes: number;
  comments: number;
  status: "REPORTED" | "IN_PROGRESS" | "RESOLVED";
  category: "ROAD" | "WASTE" | "LIGHTING" | "WATER" | "PARK" | "SAFETY";
}

export const feedData: CardData[] = [
  {
    id: "1",
    userName: "Rajesh Kumar",
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1015/400/200",
    location: "HAL 2nd Stage, Indiranagar",
    distance: "1.2 km away",
    title: "Dangerous Pothole Near Market",
    description:
      "Large pothole on main road causing accidents. Multiple vehicles damaged. Urgent repair needed before monsoon season.",
    upvotes: 234,
    comments: 45,
    status: "REPORTED",
    category: "ROAD",
  },
  {
    id: "2",
    userName: "Priya Sharma",
    avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    postedDate: "5 hours ago",
    imageUrl: "https://picsum.photos/id/1018/400/200",
    location: "100 Feet Road, Indiranagar",
    distance: "0.5 km away",
    title: "Overflowing Garbage Bins",
    description:
      "Garbage bins haven't been cleared for a week. Creating unhygienic conditions and bad odor. Need immediate attention.",
    upvotes: 189,
    comments: 23,
    status: "IN_PROGRESS",
    category: "WASTE",
  },
  {
    id: "3",
    userName: "Amit Patel",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    postedDate: "1 day ago",
    imageUrl: "https://picsum.photos/id/1019/400/200",
    location: "Defence Colony, Indiranagar",
    distance: "2.5 km away",
    title: "Street Lights Not Working",
    description:
      "All street lights in Block C are non-functional for past 3 days. Area becomes very dark and unsafe at night.",
    upvotes: 156,
    comments: 34,
    status: "RESOLVED",
    category: "LIGHTING",
  },
  {
    id: "4",
    userName: "Meera Reddy",
    avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg",
    postedDate: "2 days ago",
    imageUrl: "https://picsum.photos/id/1022/400/200",
    location: "CMH Road, Indiranagar",
    distance: "0.8 km away",
    title: "Water Supply Issues",
    description:
      "Irregular water supply in our area for the past week. Tankers are charging excessive rates. Need municipal intervention.",
    upvotes: 312,
    comments: 56,
    status: "IN_PROGRESS",
    category: "WATER",
  },
  {
    id: "5",
    userName: "Suresh Iyer",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    postedDate: "3 days ago",
    imageUrl: "https://picsum.photos/id/1024/400/200",
    location: "Domlur Layout",
    distance: "3.2 km away",
    title: "Park Maintenance Required",
    description:
      "Children's play equipment is damaged and dangerous. Several swings are broken. Regular maintenance needed.",
    upvotes: 145,
    comments: 28,
    status: "REPORTED",
    category: "PARK",
  },
];

export const savedData: CardData[] = [
  {
    id: "s1",
    userName: "Anita Desai",
    avatarUrl: "https://randomuser.me/api/portraits/women/55.jpg",
    postedDate: "1 week ago",
    imageUrl: "https://picsum.photos/id/1036/400/200",
    location: "Koramangala 5th Block",
    distance: "4.5 km away",
    title: "Broken Traffic Signal",
    description:
      "Traffic signal at main junction not working. Causing chaos during peak hours. Traffic police requested.",
    upvotes: 423,
    comments: 67,
    status: "RESOLVED",
    category: "SAFETY",
  },
  {
    id: "s2",
    userName: "Vikram Singh",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    postedDate: "5 days ago",
    imageUrl: "https://picsum.photos/id/1040/400/200",
    location: "CV Raman Nagar",
    distance: "5.8 km away",
    title: "Sewage Overflow",
    description:
      "Sewage overflowing onto main road. Creating health hazards. Immediate action required.",
    upvotes: 267,
    comments: 45,
    status: "IN_PROGRESS",
    category: "WASTE",
  },
];

export const trendingData: CardData[] = [
  {
    id: "t1",
    userName: "Deepak Verma",
    avatarUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    postedDate: "6 hours ago",
    imageUrl: "https://picsum.photos/id/1051/400/200",
    location: "Old Airport Road",
    distance: "4.2 km away",
    title: "Major Road Cave-in",
    description:
      "Large section of road caved in after heavy rains. Area needs to be cordoned off and repaired urgently.",
    upvotes: 645,
    comments: 89,
    status: "IN_PROGRESS",
    category: "ROAD",
  },
  {
    id: "t2",
    userName: "Lakshmi Krishnan",
    avatarUrl: "https://randomuser.me/api/portraits/women/62.jpg",
    postedDate: "12 hours ago",
    imageUrl: "https://picsum.photos/id/1052/400/200",
    location: "Cambridge Layout",
    distance: "2.8 km away",
    title: "Damaged Power Lines",
    description:
      "Storm has damaged power lines. Several cables hanging dangerously low. Need immediate attention.",
    upvotes: 534,
    comments: 76,
    status: "REPORTED",
    category: "SAFETY",
  },
];

// Helper function to get status color
export const getStatusColor = (status: string) => {
  switch (status) {
    case "REPORTED":
      return "#FF6B6B"; // Red
    case "IN_PROGRESS":
      return "#FFB946"; // Orange
    case "RESOLVED":
      return "#4CAF50"; // Green
    default:
      return "#666666";
  }
};

// Helper function to get category icon
export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "ROAD":
      return "road";
    case "WASTE":
      return "trash";
    case "LIGHTING":
      return "lightbulb";
    case "WATER":
      return "water";
    case "PARK":
      return "tree";
    case "SAFETY":
      return "shield-alt";
    default:
      return "exclamation-circle";
  }
};
