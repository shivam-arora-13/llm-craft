import React, { useState, useEffect } from 'react';
import { fetchUsers, client } from '../utils';
import { onCreateLeaderboard, onUpdateLeaderboard } from '../graphql/subscriptions';
import { Table } from 'reactstrap';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await fetchUsers();
            users.data.listLeaderboards.items.sort((a, b) => b.score - a.score)
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
                    updated.sort((a, b) => b.score - a.score);
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

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
        padding: '2rem'
    }}>
        <h1>Leaderboard</h1>
        <Table striped>
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Username
                    </th>
                    <th>
                        Score
                    </th>
                </tr>
            </thead>
            <tbody>
                {leaders.map((user, idx) => (
                    <tr key={user.id}>
                        <th scope="row">
                            {idx + 1}
                        </th>
                        <td>
                            {user.username}
                        </td>
                        <td>
                            {user.score}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
};

export default Leaderboard;
