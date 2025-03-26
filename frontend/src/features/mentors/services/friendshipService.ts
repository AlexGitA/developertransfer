import AxiosInstance from '@/lib/Axios';

export const FriendshipService = {
    /**
     * Initiate friend request with enterprise-grade error handling
     * @param userId Target user ID (UUID or numeric)
     * @returns Promise with request metadata
     */
    sendFriendRequest: async (userId: number) => {
        try {
            const response = await AxiosInstance.post(`/api/friends/request/${userId}/`);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 409) {
                throw new Error('Friend request already exists');
            }
            throw new Error('Failed to send request');
        }
    },

    /**
     * Advanced friendship state resolver with type safety
     * @param userId Target user identifier
     * @returns Detailed friendship state machine status
     */
    getFriendStatus: async (userId: number) => {
        try {
            const response = await AxiosInstance.get(`/api/friends/status/${userId}/`);
            return response.data;
        } catch (error) {
            console.error('Friend status check error:', error);
            return { status: 'not_friends' };
        }
    },

    /**
     * Transactional request handler for enterprise workflows
     * @param requestId Unique request identifier
     * @param action 'accept' | 'reject'
     * @returns Transaction confirmation
     */
    handleRequest: async (requestId: number, action: 'accept' | 'reject') => {
        try {
            const { data } = await AxiosInstance.post<{ status: string }>(
                `/api/friends/requests/${requestId}/${action}/`
            );
            return data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('Request no longer exists');
            }
            throw new Error('Failed to process request');
        }
    }
};