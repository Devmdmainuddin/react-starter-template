import PropTypes from 'prop-types'
import { createContext, useState } from "react";
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const authInfo = {
        user,
        loading,
        setUser,
        setLoading,
    };

    return (
        <div>
            <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
        </div>
    );
}
AuthProvider.propTypes = {
    children: PropTypes.object,
}
export default AuthProvider;