import { useState, useCallback } from 'react';
import {authActions} from '../store/authActions';

const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        switch (id) {
            case 'email':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            console.log("Hello");
            const user = await authActions.signIn({ username, password });

            console.log(user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        }
    }, [username, password]);

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        handleSubmit,
        handleChange
    };
};

export default useLogin;  