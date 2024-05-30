import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserInfo = (userEmail, authToken) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userEmail && authToken) {
            setLoading(true);
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get(`https://api-gateway-xwjwz3lfdq-ez.a.run.app/api/user/email/${userEmail}`, {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                    setUserInfo(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    setError(error);
                    setLoading(false);
                }
            };

            fetchUserInfo();
        }
    }, [userEmail, authToken]);

    return { userInfo, loading, error };
};

export default useUserInfo;