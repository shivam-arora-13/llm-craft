import { useEffect, useState } from "react";
import Register from "./components/Register";
import { v4 as uuidv4 } from 'uuid';
import Router from "./components/Router";
import { addUserToDB, updateScore } from "./utils";

const App = () => {
    const [user, setUser] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('llm_craft_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setScore(JSON.parse(storedUser).score);
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
        localStorage.setItem('llm_craft_last_time_stamp', Date.now());
        setUser(newUser);
        await addUserToDB(newUser);
    };

    const updateUser = async (score) => {
        const updatedUser = user;
        updatedUser.score += score;
        await updateScore(updatedUser);
        setUser(updatedUser);
        setScore(updatedUser.score);
        localStorage.setItem('llm_craft_user',JSON.stringify(updatedUser));
    };

    if(!user)return <Register handleSubmit={handleSubmit} />;
    return <Router avatarSrc={user.avatarSrc} updateUser={updateUser} score={score}/>
};

export default App;