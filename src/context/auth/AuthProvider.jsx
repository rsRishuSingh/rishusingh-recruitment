import { useState } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from "react-router-dom";
import { setWithExpiry, getWithExpiry } from '../../utils/tokenStorage';

export default function AuthProvider(props) {
    const BASE_URL = 'https://tnp-recruitment-challenge.manitvig.live';
    const MS_PER_MINUTE = 60000;
    const navigate = useNavigate();

    let refreshIntervalId = null;

    const [studentDetails, setStudentDetails] = useState([]);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [link, setLink] = useState("");

    const showAlert = ({ type, message, description }) => {
        setAlert({ type, message, description });
        console.log("Alert Called")
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };

    const check_session_validity = () => {
        const stored = getWithExpiry("accessToken");
        const accessToken = stored?.token;
        return accessToken || null;
    };

    const doRefresh = async () => {
        const stored = getWithExpiry("refreshToken");
        const refreshToken = stored?.token;

        if (!refreshToken) {
            showAlert({ type: "Logging Out", message: "Session Expired", description: "Please Login Again!" });
            logout();
            return;
        }

        try {
            const resp = await fetch(`${BASE_URL}/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken })
            });
            const data = await resp.json();
            if (!resp.ok) throw new Error("Refresh failed");

            setWithExpiry("accessToken", data.accessToken, 15);
            setWithExpiry("refreshToken", data.refreshToken, 60);

            const latestToken = getWithExpiry("refreshToken");
            const expiry = latestToken.expiry;

            if (expiry - Date.now() <= 5 * 60 * 1000) {
                showAlert({ type: "Last Session", message: "Session expiring in 5 minutes", description: "Please Login Again!" });
            }
        } catch {
            showAlert({ type: "Logging Out", message: "Session Refresh Failed", description: "Please Login Again!" });
            logout();
        }
    };

    const logout = () => {
        if (refreshIntervalId) {
            clearInterval(refreshIntervalId);
            refreshIntervalId = null;
        }
        localStorage.clear();
        navigate("/login");
    };

    const loginToAccount = async ({ username, password }) => {
        console.log(username, password)
        setLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            console.log(data)
            if (response.ok ) {
                
                setWithExpiry("accessToken", data.accessToken, 15);
                setWithExpiry("refreshToken", data.refreshToken, 60);
                const user = username.charAt(0).toUpperCase() + username.slice(1); // capitalise first char
                localStorage.setItem(user, username)
                showAlert({ type: "Login", message: "Successfull", description: "Welcome to the Homepage" });

                if (refreshIntervalId) clearInterval(refreshIntervalId);
                refreshIntervalId = setInterval(doRefresh, 13 * MS_PER_MINUTE);

                navigate("/");
            } else {
                showAlert({ type: "Error in Login", message: "Login Failed", description: "Error Occured in Login" });
            }
        } catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    const onClickGenerate = async () => {
        setLoading(true);
        const accessToken = check_session_validity();
        if (!accessToken) {
            showAlert({ type: "Authorization Error", message: "Access Token not found", description: "Please Login Again!" });
            return;
        }

        try {
            const resp = await fetch(`${BASE_URL}/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!resp.ok) {
                showAlert({ type: "Request Failed", message: "Link cannot be generated", description: "Please Try after sometime" });
                throw new Error(await resp.text());
            }

            const { shareToken } = await resp.json();
            const origin = window.location.origin;
            const url = `${origin}/share?shareToken=${encodeURIComponent(shareToken)}`;
            showAlert({ type: "Successfull", message: "Sharable Link generated", description: "Link validity 30 days" });
            setLink(url);
        } catch (e) {
            console.error(e);
            showAlert({ type: "Error Occurred", message: "Link cannot be generated", description: "Please Try after sometime" });
        }
        finally{
            setLoading(false)
        }
    };

    const fetchAndSetStudentDetails = async (shareToken) => {
        if (!shareToken) {
            showAlert({ type: "Authentication Error", message: "Share token not found", description: "Please Share Valid URL" });
            return;
        }

        try {
            const url = `${BASE_URL}/share?shareToken=${encodeURIComponent(shareToken)}`;
            const resp = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!resp.ok) {
                showAlert({ type: "Request Failed", message: "Details cannot be Loaded", description: "Please Try Again" });
                throw new Error(await resp.text());
            }

            const data = await resp.json();
            showAlert({
                type: "Successfull",
                message: "Student Details Loaded",
                description: "Student profile has been fetched."
            });
            setStudentDetails(data);
        } catch (err) {
            console.error(err);
            showAlert({ type: "Error Occurred", message: "Details cannot be Loaded", description: "Please Try Again" });
        }
    };

    // Exporting all functions and states via Context
    return (
        <AuthContext.Provider value={{
            studentDetails,
            setStudentDetails,
            filter,
            setFilter,
            loading,
            setLoading,
            alert,
            setAlert,
            link,
            setLink,
            showAlert,
            loginToAccount,
            logout,
            doRefresh,
            check_session_validity,
            onClickGenerate,
            fetchAndSetStudentDetails,
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
