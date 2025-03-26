import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Cross2Icon,
    CheckCircledIcon,
    CrossCircledIcon,
    PersonIcon,
    ClockIcon
} from '@radix-ui/react-icons'
import AxiosInstance from '@/lib/Axios'

interface ChatSidebarProps {
    onSelectUser: (userId: number) => void
}

interface Friend {
    friendship_id: number;
    friend: {
        id: number;
        username: string;
        details: {
            profile_picture?: string;
            current_role?: string;
            is_online?: boolean;
        };
    };
    created: string;
}

interface FriendRequest {
    id: number;
    from_user: {
        id: number;
        username: string;
        details: {
            profile_picture?: string;
        };
    };
    created: string;
    message: string;
}

export default function ChatSidebar({ onSelectUser }: ChatSidebarProps) {
    const [activeTab, setActiveTab] = useState('friends')
    const [friends, setFriends] = useState<Friend[]>([])
    const [requests, setRequests] = useState<FriendRequest[]>([])
    const [loading, setLoading] = useState({ friends: true, requests: true })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading({ friends: true, requests: true });

                const friendsResponse = await AxiosInstance.get('/api/friends/');
                const requestsResponse = await AxiosInstance.get('/api/friends/requests/');

                setFriends(friendsResponse.data);
                setRequests(requestsResponse.data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading({ friends: false, requests: false });
            }
        };

        fetchData();
    }, []);

    const handleRequestAction = async (requestId: number, action: 'accept' | 'reject') => {
        try {
            setRequests(prev => prev.filter(req => req.id !== requestId));
            await AxiosInstance.post(`/api/friends/requests/${requestId}/${action}/`);

            const [friendsRes, requestsRes] = await Promise.all([
                AxiosInstance.get('/api/friends/'),
                AxiosInstance.get('/api/friends/requests/')
            ]);

            setFriends(friendsRes.data);
            setRequests(requestsRes.data);

        } catch (error) {
            const originalRequest = requests.find(r => r.id === requestId);
            if (originalRequest) setRequests(prev => [...prev, originalRequest]);
        }
    };

    const handleRemoveFriend = async (friendshipId: number) => {
        try {
            await AxiosInstance.delete(`/api/friends/${friendshipId}/`);
            setFriends(prev => prev.filter(f => f.friendship_id !== friendshipId));
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    const renderFriendItem = (friend: Friend) => (
        <div
            key={friend.friendship_id}
            className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectUser(friend.friend.id)}
        >
            <div className="flex items-center gap-3">
                <Avatar className="relative">
                    <AvatarImage src={friend.friend.details.profile_picture} />
                    <AvatarFallback>
                        {friend.friend.username[0].toUpperCase()}
                    </AvatarFallback>
                    {friend.friend.details.is_online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                </Avatar>
                <div>
                    <p className="font-medium">{friend.friend.username}</p>
                    <p className="text-sm text-gray-500">
                        {friend.friend.details.current_role || 'Developer'}
                    </p>
                </div>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFriend(friend.friendship_id)
                }}
            >
                <Cross2Icon className="h-4 w-4 text-red-500" />
            </Button>
        </div>
    );

    const renderRequestItem = (request: FriendRequest) => (
        <div key={request.id} className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage
                        src={request.from_user.details?.profile_picture || '/default-profile.png'}
                        className="object-cover"
                        alt={request.from_user.username}
                    />
                    <AvatarFallback>
                        {request.from_user.username[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{request.from_user.username}</p>
                    <Badge variant="outline" className="mt-1">
                        {new Date(request.created).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </Badge>
                </div>
            </div>
            <div className="flex gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRequestAction(request.id, 'accept')}
                >
                    <CheckCircledIcon className="h-4 w-4 text-green-500"/>
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRequestAction(request.id, 'reject')}
                >
                    <CrossCircledIcon className="h-4 w-4 text-red-500"/>
                </Button>
            </div>
        </div>
    );

    return (
        <div className="w-80 h-[calc(100vh-160px)] bg-blue-50/50 backdrop-blur-sm rounded-lg border border-gray-200 p-4 shadow-lg overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="friends">
                        <PersonIcon className="mr-2 h-4 w-4"/>
                        Friends
                    </TabsTrigger>
                    <TabsTrigger value="requests">
                        <ClockIcon className="mr-2 h-4 w-4"/>
                        Requests
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="friends">
                    {loading.friends ? (
                        <div className="space-y-4 mt-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-lg" />
                            ))}
                        </div>
                    ) : friends.length === 0 ? (
                        <div className="text-center text-gray-500 mt-4">No friends yet</div>
                    ) : (
                        <div className="space-y-2 mt-4">
                            {friends.map(renderFriendItem)}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="requests">
                    {loading.requests ? (
                        <div className="space-y-4 mt-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full rounded-lg"/>
                            ))}
                        </div>
                    ) : (
                        requests.length === 0 ? (
                            <div className="text-center text-gray-500 mt-4">No pending requests</div>
                        ) : (
                            <div className="space-y-2 mt-4">
                                {requests.map(renderRequestItem)}
                            </div>
                        )
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}