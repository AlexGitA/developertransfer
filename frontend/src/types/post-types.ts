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

export interface Posts {
  id: string;
  title: string;
  content: string;
  url: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };

  topic: Topic[];
  createdAt: Date;
  updatedAt: Date;
  closed: boolean;
  likes: number;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  is_archived: boolean;
  comments: Comment[];
  type: 'text' | 'image' | 'link';
}

export interface Topic {
    id: string;
    name: string;
    description: string | null;
    created: string;
    followers: string[];
}