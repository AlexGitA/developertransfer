// PostPage1.tsx
import React, {useEffect, useState} from "react";
import {Post} from "@/pages/post/components/PostComponent.tsx";

import Header from './../../layout/Header/Header'
import LeftSidebar from "@/pages/post/components/LeftSidebar.tsx";
import RightSidebar from "@/pages/profile/components/RightSidebar.tsx";
import {TopicsSidebar} from "@/pages/post/components/TopicsSidebar.tsx";
import {RecentPostsSidebar} from "@/pages/profile/components/RecentPosts.tsx";

import AxiosInstance, {getUserId} from "@/lib/Axios";
import {Posts, Comment, Topic} from '@/types/post-types';

import {MENTInput} from "@/components/input/MENT-input";
import {UserDetails} from "@/types/user";
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const PostPage = () => {
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const currentUserId = getUserId();
    const [refreshTrigger, setRefreshTrigger] = useState(0);  // Neuer State für die Aktualisierung

    const [isPopupOpenMissing, setPopupOpenMissing] = useState(false);
    const [PopupMessageMissing, setPopupMessageMissing] = useState("");

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [content, setContent] = useState<string>();
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [topics, setTopics] = useState<Topic[] | null>(null);
    const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [allPosts, setAllPosts] = useState<Posts[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Posts[]>([]);

    useEffect(() => {
        console.log("ProfilePage mounted, ID:", currentUserId);
        fetchUserData();
        fetchTopics();
        fetchPosts();
    }, [currentUserId]);

    useEffect(() => {
        if (selectedTopicId === null) {
            setFilteredPosts(allPosts);
        } else {
            const filtered = allPosts.filter(post => {
                const postTopics = Array.isArray(post.topic) ? post.topic : [post.topic];
                return postTopics.some(topic => {
                    const topicId = typeof topic === 'number' ? topic : topic.id;
                    return Number(topicId) === selectedTopicId;
                });
            });
            setFilteredPosts(filtered);
        }
    }, [selectedTopicId, allPosts]);

    


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

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await AxiosInstance.get('/posts/?include=author');
            console.log('Raw post data from server:', JSON.stringify(response.data, null, 2));
            
            const postsWithAuthors = await Promise.all(
                response.data.map(async (post: Posts) => {
                    try {
                        const authorResponse = await AxiosInstance.get(`/api/user-details/${post.author}`);
                        
                        // Log the topic data before processing
                        console.log('Topic data for post', post.id, ':', post.topic);
                        
                        // Fetch topic details if we only have IDs
                        let topicData = post.topic;
                        if (!Array.isArray(post.topic)) {
                            // Wenn es ein einzelnes Topic ist, machen wir es zu einem Array
                            topicData = [post.topic];
                        }
                        
                        // Hole die Details für jedes Topic
                        const topicsWithDetails = await Promise.all(
                            topicData.map(async (topic: string | Topic) => {
                                if (typeof topic === 'string' || typeof topic === 'number') {
                                    try {
                                        const topicResponse = await AxiosInstance.get(`/topic/${topic}`);
                                        return topicResponse.data;
                                    } catch (error) {
                                        console.error('Error fetching topic details:', error);
                                        return { id: topic, name: 'Unknown Topic' };
                                    }
                                }
                                return topic;
                            })
                        );

                        return {
                            ...post,
                            author: {
                                id: post.author,
                                ...authorResponse.data,
                                username: authorResponse.data.username || 'Unknown User'
                            },
                            topic: topicsWithDetails
                        };
                    } catch (error) {
                        console.error(`Error fetching author details for post ${post.id}:`, error);
                        return {
                            ...post,
                            author: {
                                id: post.author,
                                username: 'Unknown User'
                            },
                            topic: Array.isArray(post.topic) ? post.topic : [{ id: post.topic, name: 'Unknown Topic' }]
                        };
                    }
                })
            );
            
            console.log('Posts with authors and topics:', postsWithAuthors);
            setAllPosts(postsWithAuthors);
            setFilteredPosts(postsWithAuthors);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Error fetching posts:', err);
                setError(err.response?.data?.message || 'Failed to fetch posts');
            } else {
                setError('An unexpected error occurred');
                console.error('Non-Axios error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const postPost = async (data: {
        title: string;
        content: string;
        topic: Topic[];
    }) => {
        try {
            setLoading(true);
            // Wenn keine Topics ausgewählt wurden, kann der Post nicht erstellt werden
            if (selectedTopics.length === 0) {
                setError("Bitte wählen Sie mindestens ein Thema aus");
                return;
            }
            
            const response = await AxiosInstance.post('/posts/', {
                title: data.title,
                content: data.content,
                author: currentUserId,
                topic: selectedTopics[0].id  // Wir senden nur das erste ausgewählte Thema
            });
            console.log('Response received:', response.data);
            setError(null);
            
            // Aktualisiere die Posts
            await fetchPosts();
            // Trigger die Aktualisierung der TopicsSidebar
            setRefreshTrigger(prev => prev + 1);
            
            return response.data;
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
        if (!title || !content || selectedTopics.length === 0) {
            setPopupOpenMissing(true);
            setPopupMessageMissing('Bitte alle Felder ausfüllen: Titel, Inhalt und Thema.');
            return;
        }
        
        // Send only the necessary data
        postPost({
            title: title,
            content: content,
            topic: selectedTopics
        });
        
        setPopupOpen(false);
        // Optionally reset form
        setTitle('');
        setContent('');
        setSelectedTopics([]);
    };
    const closePopup = () => {
    setPopupOpen(false);
    };

    const handleDeletePost = async (postId: string) => {
        try {
            setLoading(true);
            await AxiosInstance.delete(`/posts/${postId}/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Refresh posts after deletion
            await fetchPosts();
            
            // Trigger die Aktualisierung der TopicsSidebar
            setRefreshTrigger(prev => prev + 1);
            
            // Optional: Show success message
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Error deleting post:', err);
                setError(err.response?.data?.message || 'Failed to delete post');
            } else {
                setError('An unexpected error occurred');
                console.error('Non-Axios error:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white transition-colors dark:bg-gray-900 flex-col">
            <div className="pb-5">
                <Header/>
            </div>

            <div className="flex-1 flex pt-3 gap-6">
                {/* Left Sidebar */}
                <aside className="w-72 hidden lg:block fixed left-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <TopicsSidebar 
                        onTopicClick={setSelectedTopicId}
                        selectedTopicId={selectedTopicId}
                        refreshTrigger={refreshTrigger}
                    />
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
                        <button
                            className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20 hover:from-blue-500 hover:to-blue-600 transition-all duration-200" 
                            onClick={handleAddClick}>
                            Add
                        </button>
                    </div>
                    <div className="lg:px-0 px-0 sm:px-4">
                        {loading ? (
                            <div className="text-center py-4">Loading posts...</div>
                        ) : error ? (
                            <div className="text-center text-red-500 py-4">{error}</div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-4">No posts available</div>
                        ) : (
                            filteredPosts.map((post) => (
                                <Post 
                                    key={post.id} 
                                    post={post}
                                    onDelete={handleDeletePost}
                                />
                            ))
                        )}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-72 hidden lg:block fixed right-0 top-[3.5rem] bottom-0 overflow-y-auto px-6 py-6">
                    <RecentPostsSidebar refreshTrigger={refreshTrigger} />
                </aside>
            </div>
            {isPopupOpenMissing && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{PopupMessageMissing}</p>
                        <button onClick={closePopup}>Schließen</button>
                    </div>
                 </div>
            )}
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
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChangeTitle(e)}
                            />

                            {/* Content Field */}
                            <MENTInput
                                id="content"
                                labelText="Content"
                                type="text"
                                required={true}
                                value={content}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChangeContent(e)}
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
                                <button
                                className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20 hover:from-blue-500 hover:to-blue-600 transition-all duration-200" onClick={handleClosePopup}>
                                Cancel
                                </button>
                                <button
                                className="px-4 py-1.5 rounded-[50px] bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 text-white text-xs sm:text-sm font-medium shadow-sm dark:shadow-gray-900/20 hover:from-blue-500 hover:to-blue-600 transition-all duration-200" onClick={handleSubmit}>
                                Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostPage;