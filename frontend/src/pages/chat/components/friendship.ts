// types/friendship.ts
export interface Friend {
    id: number
    user: {
        id: number
        username: string
        details: {
            profile_picture?: string
            is_online: boolean
            current_role?: string
        }
    }
}

export interface FriendRequest {
    id: number
    from_user: {
        id: number
        username: string
        details: {
            profile_picture?: string
        }
    }
    created: string
}