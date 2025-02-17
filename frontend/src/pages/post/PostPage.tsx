// PostPage1.tsx
import {useEffect, useState} from "react";
import {Post} from "@/pages/post/components/PostComponent.tsx";

import Header from './../../layout/Header/Header'
import LeftSidebar from "@/pages/profile/components/LeftSidebar.tsx";
import RightSidebar from "@/pages/profile/components/RightSidebar.tsx";

import AxiosInstance, {getUserId} from "@/lib/Axios";
import {Posts, Comment, Topic} from '@/types/post-types';
import {mockPosts} from "./mock-data"
import {MENTButton} from "@/components/button/MENT-button";
import {MENTInput} from "@/components/input/MENT-input";
import {UserDetails} from "@/types/user";
import axios from 'axios';


const PostPage = () => {
    const [isPopupOpen, setPopupOpen] = useState(true);
    const currentUserId = getUserId();

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [content, setContent] = useState<string>();
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [topics, setTopics] = useState<Topic[] | null>(null);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("ProfilePage mounted, ID:", currentUserId);
        fetchUserData();
        fetchTopics();
    }, [currentUserId]);

    const [newPost, setNewPost] = useState<Posts>();


    const fetchUserData = async () => {
        try {
            setLoading(true);
            console.log('Fetching user data for ID:', currentUserId);
            const response = await AxiosInstance.get(`/api/user-details/${currentUserId}`);
            console.log('Response received:', response.data);
            setUserData(response.data);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Full error object:', err);
                setError(err.response?.data?.message || 'Failed to fetch user data');
                if (err.response) {
                    console.error('Error response:', {
                        status: err.response.status,
                        headers: err.response.headers,
                        data: err.response.data
                    });
                }
            } else {
                setError('An unexpected error occurred');
                console.error('Non-Axios error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchTopics = async () => {
        try {
            setLoading(true);
            console.log('Fetching user data for ID:', currentUserId);
            const response = await AxiosInstance.get(`/topic`);
            console.log('Response received:', response.data);
            setTopics(response.data);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Full error object:', err);
                setError(err.response?.data?.message || 'Failed to fetch user data');
                if (err.response) {
                    console.error('Error response:', {
                        status: err.response.status,
                        headers: err.response.headers,
                        data: err.response.data
                    });
                }
            } else {
                setError('An unexpected error occurred');
                console.error('Non-Axios error:', err);
            }
        } finally {
            setLoading(false);
        }
    };
    const postPost = async (data) => {
        try {
            setLoading(true);
            console.log('Fetching user data for ID:', currentUserId);
            const response = await AxiosInstance.post(`/topic`, data);
            console.log('Response received:', response.data);
            setTopics(response.data);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Full error object:', err);
                setError(err.response?.data?.message || 'Failed to fetch user data');
                if (err.response) {
                    console.error('Error response:', {
                        status: err.response.status,
                        headers: err.response.headers,
                        data: err.response.data
                    });
                }
            } else {
                setError('An unexpected error occurred');
                console.error('Non-Axios error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setTitle("");
        setContent("");
        setSelectedTopics([])

    };

    const handleInputChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleInputChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };
    const handleTagClick = (topic: Topic) => {
        if (!selectedTopics.some((selected) => selected.id === topic.id)) {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };
    // Handler für das Entfernen eines Tags
    const handleRemoveTag = (topicId: string) => {
        setSelectedTopics(selectedTopics.filter((topic) => topic.id !== topicId));
    };

    // Filtert die Topics, basierend auf der Suche des Benutzers
    const filteredTopics = topics
        ? topics.filter((topic) => topic.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];


    const handleSubmit = () => {
        setNewPost(
            {
                  title: title,
                  content: content,
                  url: "",
                  author: {
                    id: currentUserId ?? "1",
                    username: userData?.username ?? "Anonymus",
                    avatar: userData?.profile_picture ?? "/placeholder.svg?height=32&width=32",
                  },
                  topic: selectedTopics,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  closed: false,
                  likes: 0,
                  likes_count: 0,
                  comments_count: 0,
                  is_pinned: false,
                  is_archived: false,
                  comments: [],
                }
        )
        postPost(newPost)
        console.log(newPost);
        setPopupOpen(false);
    };
    return (
        <div className="min-h-screen flex bg-white transition-colors dark:bg-gray-900 flex-col">
            <div className="pb-5">
                <Header/>
            </div>

            <div className="flex-1 flex pt-3 gap-6">
                {/* Left Sidebar */}
                <aside
                    className="w-72 hidden lg:block fixed left-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <LeftSidebar/>
                </aside>

                {/* Main content */}
                <main className={`
          flex-1 
          px-4 sm:px-6 py-4
          mx-auto
          w-full
          pt-10
          lg:ml-72 lg:mr-72 
          ${window.innerWidth >= 1024 ? 'max-w-5xl' : 'max-w-2xl'}
        `}>
                    <div className="lg:px-0 px-0 sm:px-4">
                        <MENTButton onClick={handleAddClick}>Add</MENTButton>
                    </div>
                    <div className="lg:px-0 px-0 sm:px-4">
                        {mockPosts.map((post) => (
                            <Post key={post.id} post={post}/>
                        ))}
                    </div>

                </main>

                {/* Right Sidebar */}
                <aside
                    className="w-72 hidden lg:block fixed right-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <RightSidebar/>
                </aside>
            </div>
            {/* Popup Form */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Create a New Post</h3>
                        <form>
                            {/* Title Field */}
                            <MENTInput
                                id="title"
                                labelText="Title"
                                type="text"
                                required={true}
                                value={title}
                                onChange={(e) => handleInputChangeTitle(e)}
                            />

                            {/* Content Field */}
                            <MENTInput
                                id="content"
                                labelText="Content"
                                type="text"
                                required={true}
                                value={content}
                                onChange={(e) => handleInputChangeContent(e)}
                            />

                            <h3>Select Topics</h3>
                            {/* Das Input-Feld, das als Tagging-System fungiert */}
                            <div
                                className="relative"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md cursor-pointer">
                                    {/* Angezeigte Tags */}
                                    {selectedTopics.map((topic) => (
                                        <span
                                            key={topic.id}
                                            className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full flex items-center space-x-1"
                                        >
                                            <span>{topic.name}</span>
                                            <button
                                                className="text-sm text-red-600"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Verhindert das Schließen des Dropdowns
                                                    handleRemoveTag(topic.id);
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="flex-1 border-none outline-none"
                                        placeholder="Search or select topics..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Dropdown, das bei Klick angezeigt wird */}
                                {isDropdownOpen && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
                                        {filteredTopics.length > 0 ? (
                                            filteredTopics.map((topic) => (
                                                <div
                                                    key={topic.id}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleTagClick(topic)}
                                                >
                                                    {topic.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-2 text-gray-500">No topics found</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4 flex justify-between">
                                <MENTButton onClick={handleClosePopup}>Cancel</MENTButton>
                                <MENTButton onClick={handleSubmit}>Submit</MENTButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostPage;