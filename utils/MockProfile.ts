export interface UserProfile {
    id: string;
    name: string;
    email: string;
    password: string; // In a real app, never store plain text passwords
    avatar: string;
    role: string;
    location: string;
    joinedDate: string;
    issuesReported: number;
    issuesResolved: number;
    reputation: number;
    badges: string[];
  }
  
  // Mock user credentials for login
  export const VALID_CREDENTIALS = {
    email: "demo@citizen.com",
    password: "demo1234"
  };
  
  export const mockUserProfile: UserProfile = {
    id: "usr_001",
    name: "Arjun Sharma",
    email: VALID_CREDENTIALS.email,
    password: VALID_CREDENTIALS.password,
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "Active Citizen",
    location: "Indranagar, Bangalore, Karnataka",
    joinedDate: "January 2024",
    issuesReported: 15,
    issuesResolved: 8,
    reputation: 456,
    badges: [
      "Problem Solver",
      "Community Leader",
      "Regular Contributor",
      "Verified Resident"
    ]
  };
  
  // Helper function to check login credentials
  export const validateLogin = (email: string, password: string): boolean => {
    return email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password;
  };