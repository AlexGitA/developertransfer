// post-types.ts --> Represents Django Model Post + Comment
export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  closed: boolean;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  tags: string[];
  type: 'text' | 'image' | 'link';
}
