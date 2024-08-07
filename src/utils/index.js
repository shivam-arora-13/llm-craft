import { generateClient } from 'aws-amplify/api';
import { createLeaderboard, updateLeaderboard } from '../graphql/mutations';
import { listLeaderboards } from '../graphql/queries';

export const client = generateClient();

export const addUserToDB = async (user) => {
    await client.graphql({
        query: createLeaderboard,
        variables: {
            input: user
        }
    })
};

export const fetchUsers = async () => {
    return await client.graphql({
        query: listLeaderboards
    });
};

export const submitHandler = async () => {

};

export const LevelInfo = [
    {"text": "The famous actor 'Leonardo DiCaprio' was last seen at a party hosted by a director known for a blockbuster movie released in 1997. Identify the director.",
     "expected_sql_query": "SELECT director FROM Movies WHERE release_year = 1997 AND title = 'Titanic';",
     "expected_result": ['James Cameron']
    },
    {"text": "The director, James Cameron, mentioned that Leonardo was with an actress who played a lead role in a 2009 movie directed by him. Find the actress.",
     "expected_sql_query": "SELECT name FROM Actors WHERE actor_id IN (SELECT actor_id FROM Cast WHERE movie_id = (SELECT movie_id FROM Movies WHERE title = 'Avatar'));",
     "expected_result": ['Zoe Saldana']
    },
    {"text": "This actress, Zoe Saldana, was seen talking to an actor known for playing 'Sherlock Holmes' in a 2009 movie. Find this actor.",
     "expected_sql_query": "SELECT name FROM Actors WHERE actor_id IN (SELECT actor_id FROM Cast WHERE movie_id = (SELECT movie_id FROM Movies WHERE title = 'Sherlock Holmes'));",
     "expected_result": ['Robert Downey Jr.']
    },
    {"text": "Robert Downey Jr. was seen leaving the party with an actor who won an Oscar for a lead role in a movie directed by Martin Scorsese. Find this actor.",
     "expected_sql_query": "SELECT name FROM Actors WHERE actor_id IN (SELECT actor_id FROM Cast WHERE movie_id = (SELECT movie_id FROM Movies WHERE director = 'Martin Scorsese' AND title = 'The Departed'));",
     "expected_result": ['Leonardo DiCaprio']
    },
    {"text": "This actor was last seen with someone known for a famous dialogue: 'I'll be back.' Identify the kidnapper.",
     "expected_sql_query": "SELECT name FROM Actors WHERE name = 'Arnold Schwarzenegger';",
     "expected_result": ['Arnold Schwarzenegger']
    }
]