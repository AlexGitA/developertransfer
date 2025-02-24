// post-types.ts --> Represents Django Model Post + Comment
export interface CommentAuthor {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  post: number;
  author: CommentAuthor;
  parent?: number | null;
  createdAt: string;
  likes_count: number;
}

export interface CreateCommentData {
  content: string;
  post: number;
  parent?: number;
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