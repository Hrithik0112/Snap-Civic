export interface CardData {
  id: string;
  userName: string;
  avatarUrl: string;
  postedDate: string;
  imageUrl: string;
  location: string;
  title: string;
  description: string;
  upvotes: number;
  comments: number;
}

export const feedData: CardData[] = [
  {
    id: "1",
    userName: "Emma Watson",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1015/400/200",
    location: "Paris, France",
    title: "Beautiful Eiffel Tower at Sunset",
    description:
      "Captured this amazing view of the Eiffel Tower during golden hour. The way the light hits the structure creates a magical atmosphere that's simply breathtaking.",
    upvotes: 234,
    comments: 45,
  },
  {
    id: "2",
    userName: "James Smith",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    postedDate: "5 hours ago",
    imageUrl: "https://picsum.photos/id/1018/400/200",
    location: "New York, USA",
    title: "Central Park in Fall",
    description:
      "The autumn colors in Central Park are absolutely stunning this time of year. Perfect weather for a morning jog or afternoon picnic.",
    upvotes: 189,
    comments: 23,
  },
  // Add 10 more items with different IDs and content...
  {
    id: "3",
    userName: "Sofia Rodriguez",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    postedDate: "1 day ago",
    imageUrl: "https://picsum.photos/id/1019/400/200",
    location: "Barcelona, Spain",
    title: "Sagrada Familia Architecture",
    description:
      "Gaudi's masterpiece continues to amaze visitors. The intricate details and symbolic elements make this basilica truly unique.",
    upvotes: 567,
    comments: 89,
  },
  {
    id: "4",
    userName: "Alex Chen",
    avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    postedDate: "2 days ago",
    imageUrl: "https://picsum.photos/id/1022/400/200",
    location: "Tokyo, Japan",
    title: "Shibuya Crossing at Night",
    description:
      "The world's busiest pedestrian crossing looks even more impressive when lit up at night. The energy here is unmatched!",
    upvotes: 892,
    comments: 156,
  },
  {
    id: "5",
    userName: "Maria Costa",
    avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    postedDate: "3 days ago",
    imageUrl: "https://picsum.photos/id/1024/400/200",
    location: "Rio de Janeiro, Brazil",
    title: "Sunset at Copacabana",
    description:
      "Nothing beats a Brazilian sunset at Copacabana beach. The mix of mountains, ocean, and urban landscape creates a perfect scene.",
    upvotes: 445,
    comments: 67,
  },
  {
    id: "6",
    userName: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1029/400/200",
    location: "New York, USA",
    title: "Amazing Place to Visit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    upvotes: 123,
    comments: 45,
  },
  {
    id: "7",
    userName: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1028/400/200",
    location: "New York, USA",
    title: "Amazing Place to Visit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    upvotes: 123,
    comments: 45,
  },
  //add 3 more unique items
  {
    id: "8",
    userName: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1027/400/200",
    location: "New York, USA",
    title: "Amazing Place to Visit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    upvotes: 123,
    comments: 45,
  },
  {
    id: "9",
    userName: "Johny Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1026/400/200",
    location: "New York, USA",
    title: "Amazing Place to Visit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    upvotes: 123,
    comments: 45,
  },
  {
    id: "10",
    userName: "Hannah Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    postedDate: "2 hours ago",
    imageUrl: "https://picsum.photos/id/1025/400/200",
    location: "New York, USA",
    title: "Amazing Place to Visit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    upvotes: 123,
    comments: 45,
  },
];

export const savedData: CardData[] = [
  {
    id: "s1",
    userName: "David Miller",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    postedDate: "1 week ago",
    imageUrl: "https://picsum.photos/id/1036/400/200",
    location: "Santorini, Greece",
    title: "Magical Sunset in Santorini",
    description:
      "The white buildings against the deep blue sea create a perfect contrast. Santorini's sunsets are truly one of a kind.",
    upvotes: 1234,
    comments: 89,
  },
  {
    id: "s2",
    userName: "Lisa Chen",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    postedDate: "5 days ago",
    imageUrl: "https://picsum.photos/id/1040/400/200",
    location: "Kyoto, Japan",
    title: "Ancient Temple Gardens",
    description:
      "Walking through these serene gardens feels like stepping back in time. The careful arrangement of every stone and plant is truly remarkable.",
    upvotes: 892,
    comments: 67,
  },
  {
    id: "s3",
    userName: "Marco Rossi",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    postedDate: "3 days ago",
    imageUrl: "https://picsum.photos/id/1047/400/200",
    location: "Venice, Italy",
    title: "Morning in Venice",
    description:
      "Early morning gondola ride through the quiet canals. The city has a different charm before the tourists wake up.",
    upvotes: 756,
    comments: 45,
  },
  // Add more saved items...
];

export const trendingData: CardData[] = [
  {
    id: "t1",
    userName: "Sarah Johnson",
    avatarUrl: "https://randomuser.me/api/portraits/women/67.jpg",
    postedDate: "6 hours ago",
    imageUrl: "https://picsum.photos/id/1051/400/200",
    location: "Machu Picchu, Peru",
    title: "Sunrise at Machu Picchu",
    description:
      "After a challenging hike, witnessing the first rays of sun hitting these ancient ruins was absolutely worth it. A bucket list moment!",
    upvotes: 2445,
    comments: 167,
  },
  {
    id: "t2",
    userName: "Michael Zhang",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    postedDate: "12 hours ago",
    imageUrl: "https://picsum.photos/id/1052/400/200",
    location: "Northern Iceland",
    title: "Dancing Northern Lights",
    description:
      "Finally caught the aurora borealis in all its glory. The entire sky was dancing with green and purple lights.",
    upvotes: 3892,
    comments: 234,
  },
  {
    id: "t3",
    userName: "Isabella Silva",
    avatarUrl: "https://randomuser.me/api/portraits/women/89.jpg",
    postedDate: "1 day ago",
    imageUrl: "https://picsum.photos/id/1053/400/200",
    location: "Amazon Rainforest, Brazil",
    title: "Heart of the Amazon",
    description:
      "Deep in the rainforest, where nature rules supreme. The biodiversity here is simply incredible.",
    upvotes: 1567,
    comments: 145,
  },
  {
    id: "t4",
    userName: "Ahmed Hassan",
    avatarUrl: "https://randomuser.me/api/portraits/men/77.jpg",
    postedDate: "2 days ago",
    imageUrl: "https://picsum.photos/id/1054/400/200",
    location: "Petra, Jordan",
    title: "The Ancient City of Petra",
    description:
      "Walking through the narrow canyon to see the Treasury appear is a moment I'll never forget. The scale is breathtaking.",
    upvotes: 4231,
    comments: 289,
  },
  // Add more trending items...
];
