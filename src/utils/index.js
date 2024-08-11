import { generateClient } from 'aws-amplify/api';
import { createLeaderboard, updateLeaderboard } from '../graphql/mutations';
import { listLeaderboards } from '../graphql/queries';
import AWS from 'aws-sdk';

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

export const updateScore = async (user) => {
    return await client.graphql({
        query: updateLeaderboard,
        variables: {
            input: user
        }
    })
}

export const fetchResponse = async (req) => {
    const lambda = new AWS.Lambda();

    const params = {
        FunctionName: 'LLMCraftSqlConnector', // Replace with your Lambda function name
        Payload: JSON.stringify(req), // Replace with any payload you need to send
    };

    try {
        const result = await lambda.invoke(params).promise();
        return JSON.parse(result.Payload);
    } catch (error) {
        console.error('Error invoking Lambda function:', error);
    }
}

export const getResponseStatus = (results, expectedAnswer) => {
    // return 'error' | 'success'
    if(results.length !== 1)return false;
    return Object.values(results[0]).some(v => v === expectedAnswer);
}

export const context = {
    "context": "The stage is set for the IPL season opener, with excitement in the air. The auction was fierce, with teams battling it out for the best players.\n\n But on the eve of the opening match, an ominous silence falls over the cricketing world. The most expensive player of this season's auction has vanished.\n\nWhispers of foul play are spreading, and it's up to you to uncover the truth behind this mysterious disappearance. As you dig deeper, you'll need to navigate through a web of secrets and rivalries.\n\nCan you solve the mystery before the first ball is bowled?",
    "clues": [
        {
            "clue": "The auction was intense, with one player emerging as the most expensive buy of the season. This player was expected to be the star of the opener, but now, he's missing. Start by identifying who this player is.",
            "expected_user_prompt": "Find the name of the most expensive player from this season's auction.",
            "expected_sql_query": "SELECT P.name FROM Player P INNER JOIN Auction A ON P.id = A.player_id ORDER BY A.price DESC LIMIT 1;",
            "answer": "Gaurav Desai"
        },
        {
            "clue": "The player was purchased by a team that had high hopes for him. If we know which team bought him, we might get closer to finding out what happened.",
            "expected_user_prompt": "Identify the team that purchased the most expensive player.",
            "expected_sql_query": "SELECT T.name FROM Team T INNER JOIN Auction A ON T.id = A.team_id INNER JOIN Player P ON P.id = A.player_id ORDER BY A.price DESC LIMIT 1;",
            "answer": "Ahmedabad Avengers"
        },
        {
            "clue": "The coach of this team could have some information about the player's whereabouts. Finding the coach might give us a lead.",
            "expected_user_prompt": "Find the coach of the team that purchased the most expensive player.",
            "expected_sql_query": "SELECT T.coach_name FROM Team T INNER JOIN Auction A ON T.id = A.team_id INNER JOIN Player P ON P.id = A.player_id ORDER BY A.price DESC LIMIT 1;",
            "answer": "Tim Cunha"
        },
        {
            "clue": "The coach mentions that there was a player in the team last year who was their highest run-scorer, but they didn't buy him this season. The coach suspects this player might have a motive for revenge.",
            "expected_user_prompt": "Identify the player who was the highest run-scorer for the team last season but was not bought this season.",
            "expected_sql_query": "SELECT P.name FROM Player P INNER JOIN Auction A ON P.id = A.player_id WHERE P.prev_team_id = (SELECT T.id FROM Team T INNER JOIN Auction A ON T.id = A.team_id ORDER BY A.price DESC LIMIT 1) ORDER BY P.prev_season_runs DESC LIMIT 1;",
            "answer": "Nikhil Kapoor"
        }
        // {
        //     "clue": "All evidence points to this player being behind the kidnapping. The motive seems clear—revenge for being let go by the team. It's time to confirm your suspicions and bring the culprit to light.",
        //     "expected_user_prompt": "Confirm the name of the player who kidnapped the most expensive player for revenge.",
        //     "expected_sql_query": "SELECT P.name FROM Player P WHERE P.name = (SELECT P.name FROM Player P INNER JOIN Auction A ON P.id = A.player_id WHERE P.prev_team_id = (SELECT T.id FROM Team T INNER JOIN Auction A ON T.id = A.team_id ORDER BY A.price DESC LIMIT 1) ORDER BY P.prev_season_runs DESC LIMIT 1);",
        //     "answer": "Kidnapper's Name"
        // }
    ],
    schemas: `#### Player Table:
    Contains information about cricket players, their previous teams, and their performance in the last season.
    
    - **id**: INT - Unique identifier for each player.
    - **name**: VARCHAR(100) - Name of the player.
    - **prev_team_id**: INT - ID of the player's previous team.
    - **prev_season_runs**: INT - Number of runs the player scored in the last season.
    
    #### Team Table:
    Contains details about the cricket teams, their owners, and coaches.
    
    - **id**: INT - Unique identifier for each team.
    - **name**: VARCHAR(100) - Name of the team.
    - **city**: VARCHAR(100) - City the team represents.
    - **owner_name**: VARCHAR(100) - Name of the team owner.
    - **coach_name**: VARCHAR(100) - Name of the team's coach.
    
    #### Auction Table:
    Records which player was purchased by which team during the auction, along with the purchase price.
    
    - **player_id**: INT - ID of the player who was purchased.
    - **team_id**: INT - ID of the team that purchased the player.
    - **price**: DECIMAL(10,2) - Purchase price of the player in the auction.`
}