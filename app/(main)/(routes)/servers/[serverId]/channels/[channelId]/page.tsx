import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { api } from "@/convex/_generated/api";
import { currentProfile } from "@/lib/current-profile"
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string,
        channelId: string
    }
}
const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfile();
    if(!profile) {
        return auth().redirectToSignIn();
    }

    const channel = await fetchQuery(api.channels.getChannelById, { channelId: params.channelId})

    const member = await fetchQuery(api.members.getMemberByServerIdAndProfileId, { serverId: params.serverId, profileId: profile._id})

    if(!channel.data || !member.data){
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={channel.data.name}
                serverId={channel.data.serverId}
                type="channel"
            />
            <div className="flex-1">Future messages</div>
            <ChatInput
                name={channel.data.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.data._id,
                    serverId: channel.data.serverId
                }}    
            />
        </div>
    )
}

export default ChannelIdPage;