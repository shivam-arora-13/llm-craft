import React, { useState, useEffect } from 'react';
import { fetchUsers, client, updateScore } from '../utils';
import { onCreateLeaderboard, onUpdateLeaderboard } from '../graphql/subscriptions';
import { Leaderboard as AnimatedLeaderboard } from './Leaderboard/Leaderboard';
import { Form, FormGroup, Label, Button } from 'reactstrap';
// ADD QR CODE TO IT
const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await fetchUsers();
            setLeaders(users.data.listLeaderboards.items)
        })()

        const CREATE_SUBSCRIPTION = client.graphql({
            query: onCreateLeaderboard
        }).subscribe({
            next: (eventData) => {
                const newUser = eventData.data.onCreateLeaderboard;
                setLeaders((prev) => [...prev, newUser]);
            }
        });

        const UPDATE_SUBSCRIPTION = client.graphql({
            query: onUpdateLeaderboard
        }).subscribe({
            next: (eventData) => {
                const updatedUser = eventData.data.onUpdateLeaderboard;
                setLeaders((prev) => {
                    const updated = prev.map((user) =>
                        user.id === updatedUser.id ? updatedUser : user
                    )
                    return updated;
                }
                );
            }
        });

        return () => {
            CREATE_SUBSCRIPTION.unsubscribe();
            UPDATE_SUBSCRIPTION.unsubscribe();
        };
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        updateScore(
            {
                "id": "d95e1dff-bde6-494d-8042-01668d0f2eda",
                "username": "Gaurav",
                "score": 90,
                "avatarSrc": "avatar2.png",
            },
    );
    }
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        padding: '2rem'
    }}>
        <AnimatedLeaderboard currentData={leaders} />
        <Form onSubmit={submitHandler}>
            <Button type='submit' style={{ width: '100%' }}>Submit</Button>
        </Form>
    </div>

};

export default Leaderboard;
