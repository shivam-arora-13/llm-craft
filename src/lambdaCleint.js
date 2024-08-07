// src/App.js
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { Button } from 'reactstrap';

// Configure AWS with environment variables
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

const App = () => {
  const [data, setData] = useState('');

  // useEffect(() => {
    const invokeLambda = async () => {
      const lambda = new AWS.Lambda();

      const params = {
        FunctionName: 'LLMCraftSqlConnector', // Replace with your Lambda function name
        Payload: JSON.stringify({ key: 'value' }), // Replace with any payload you need to send
      };

      try {
        const result = await lambda.invoke(params).promise();
        const resultPayload = JSON.parse(result.Payload);
        setData(resultPayload);
      } catch (error) {
        console.error('Error invoking Lambda function:', error);
      }
    };

  //   invokeLambda();
  // }, []);

  return (
    <div>
      <h1>Data from Lambda</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button onClick={invokeLambda}>Get Response</Button>
    </div>
  );
};

export default App;
