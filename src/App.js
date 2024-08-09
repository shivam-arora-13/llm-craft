import { useEffect, useState } from "react";
import Register from "./components/Register";
import { v4 as uuidv4 } from 'uuid';
import Router from "./components/Router";
import { addUserToDB } from "./utils";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('llm_craft_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSubmit = async (username, avatarSrc) => {
        const newUser = {
            id : uuidv4(),
            username, 
            score : 0,
            avatarSrc : avatarSrc
        };
        localStorage.setItem('llm_craft_user',JSON.stringify(newUser));
        setUser(newUser);
        await addUserToDB(newUser);
    };

    if(!user)return <Register handleSubmit={handleSubmit} />;
    return <Router avatarSrc={user.avatarSrc}/>
};

export default App;