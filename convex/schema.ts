import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  profiles: defineTable({
    name: v.string(), // Profile name
    username: v.string(), // Username, must be unique
    password: v.optional(v.string()), // Optional password (consider hashing)
    email: v.string(), // User email
    imageUrl: v.string(), // URL for the profile image
    status: v.string(), // User status
    userId: v.string(), // ID of the associated user

    servers: v.array(v.string()), // Array of server IDs

    createdAt: v.number(), // Creation date
    updatedAt: v.number(), // Last updated date
  }),


  servers: defineTable({
    name: v.string(), // Server name
    imageUrl: v.string(), // URL for the server image
    inviteCode: v.string(), // Unique invite code for the server
    creatorId: v.string(), // ID of the creator profile

    members: v.array(v.string()), // Array of member IDs
    channels: v.array(v.string()), // Array of channel IDs

    createdAt: v.number(), // Creation date
    updatedAt: v.number(), // Last updated date
  }),


  members: defineTable({
    role: v.string(), //.enum(["CREATOR", "ADMIN", "MODERATOR", "GUEST"]), // Member role
    profileId: v.string(), // ID of the associated profile
    serverId: v.string(), // ID of the associated server

    messages: v.array(v.string()), // Array of message IDs

    createdAt: v.number(), // Creation date
    updatedAt: v.number(), // Last updated date
  }),


  channels: defineTable({
    name: v.string(), // Channel name
    type: v.string(), //.enum(["TEXT", "AUDIO", "VIDEO"]), // Channel type
    creatorId: v.string(), // ID of the associated profile
    serverId: v.string(), // ID of the associated server

    messages: v.array(v.string()), // Array of message IDs

    createdAt: v.number(), // Creation date
    updatedAt: v.number(), // Last updated date
  }),


  messages: defineTable({
    content: v.string(), // Message content
    fileUrl: v.optional(v.string()), // Optional file URL
    memberId: v.optional(v.string()), // ID of the member sending the message
    username: v.string(), // Username of the sender
    channelId: v.string(), // ID of the channel
    deleted: v.boolean(), // Deletion status
    createdAt: v.number(), // Creation date
    updatedAt: v.number(), // Last updated date
  }),
});
