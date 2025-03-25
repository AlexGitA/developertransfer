// @ts-ignore
import { Post } from "@/types/post-types"

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with ShadcnUI: A Comprehensive Guide",
    content: "ShadcnUI has been a game-changer for my React projects. Here are some tips I've learned...",
    author: {
      id: "user1",
      username: "techmaster",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    createdAt: new Date("2024-02-10T10:00:00"),
    updatedAt: new Date("2024-02-10T10:00:00"),
    closed: false,
    likes: 156,
    comments_count: 23,
    topic: [{
      id: "1",
      name: "react",
    }
    ],
    type: "text",
    comments: [
      {
        id: "c1",
        content: "This is super helpful! I've been looking for something like this.",
        author: {
          id: "user2",
          username: "reactfan",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        createdAt: new Date("2024-02-10T11:00:00"),
        likes: 12,
        replies: [
          {
            id: "c1r1",
            content: "Glad you found it useful!",
            author: {
              id: "user1",
              username: "techmaster",
              avatar: "/placeholder.svg?height=32&width=32",
            },
            createdAt: new Date("2024-02-10T11:30:00"),
            likes: 5,
          },
        ],
      },
    ],
  },
  // Add more mock posts here...
]

