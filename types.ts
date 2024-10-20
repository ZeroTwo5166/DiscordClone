// interface for the profiles table
export interface Profile {
    name: string; // Profile name
    username: string; // Username, must be unique
    password?: string; // Optional password (consider hashing)
    email: string; // User email
    imageUrl: string; // URL for the profile image
    status: string; // User status
    userId: string; // ID of the associated user
    servers: string[]; // Array of server IDs
    createdAt: number; // Creation date
    updatedAt: number; // Last updated date
}
  
  // interface for the servers table
export interface Server {
    name: string; // Server name
    imageUrl: string; // URL for the server image
    inviteCode: string; // Unique invite code for the server
    creatorId: string; // ID of the creator profile
    members: string[]; // Array of member IDs
    channels: string[]; // Array of channel IDs
    createdAt: number; // Creation date
    updatedAt: number; // Last updated date
}
  
  // interface for the members table
export interface Member {
    role: string; // Member role (CREATOR, ADMIN, etc.)
    profileId: string; // ID of the associated profile
    serverId: string; // ID of the associated server
    messages: string[]; // Array of message IDs
    createdAt: number; // Creation date
    updatedAt: number; // Last updated date
}
  
  // interface for the channels table
export interface Channel {
    name: string; // Channel name
    type: string; // Channel type (TEXT, AUDIO, VIDEO, etc.)
    creatorId: string; // ID of the associated profile
    serverId: string; // ID of the associated server
    messages: string[]; // Array of message IDs
    createdAt: number; // Creation date
    updatedAt: number; // Last updated date
}
  
  // interface for the messages table
export interface Message {
    content: string; // Message content
    fileUrl?: string; // Optional file URL
    memberId?: string; // ID of the member sending the message
    username: string; // Username of the sender
    channelId: string; // ID of the channel
    deleted: boolean; // Deletion status
    createdAt: number; // Creation date
    updatedAt: number; // Last updated date
}
  
  
export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};


export type ServerWithChannelsWithMembers = Server & {
  members: (Member & { profile : Profile})[],
  channels: Channel[]
};

export type MemberWithProfiles = Member & {
  profile: Profile; // Define that each member has a profile
};

