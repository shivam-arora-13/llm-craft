import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { CopyBlock, dracula } from 'react-code-blocks';
import AppPagination from './AppPagination';
import { JsonToTable } from "react-json-to-table";
import { system_prompt, result, clue } from '../mocks';
import { LevelInfo, submitHandler } from '../utils';

const Game = () => {
    const [showResult, setShowResult] = useState(false);
    const [userLevel, setUserLevel] = useState(0);
    const [displayLevel, setDisplayLevel] = useState(0);

    useEffect(() => {
        const savedLevel = localStorage.getItem('llm_craft_level');
        if(savedLevel){
            setUserLevel(0);
            setDisplayLevel(0);
        }else{
            localStorage.setItem('llm_craft_level', 0);
        }
    }, []);

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.5rem',
        padding: '2rem',
        marginInline: 'auto'
    }}>
        {/* { showResult && <Button onClick={() => setShowResult(false)}>Back</Button>} */}
        <div>
            <p>{LevelInfo[displayLevel].text}</p>
        </div>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    setShowResult(true);
                    submitHandler();
                }}>
                    <FormGroup>
                        <Label>System Message</Label>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            defaultValue={system_prompt}
                            rows='5'
                            autoSiz
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Prompt</Label>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            defaultValue={system_prompt}
                            rows='2'
                        />
                    </FormGroup>
                    <Button type='submit' style={{ width: '100%' }}>Submit</Button>
                </Form>
                <Alert style={{
                    padding: '0.6rem'
                }}>
                    <h6 style={{
                        margin: '0'
                    }}>
                        Well done!
                    </h6>
                </Alert>
                <h6>Query</h6>
                <CopyBlock
                    text={'SELECT * FROM movies;'}
                    language={'SQL'}
                    showLineNumbers={true}
                    wrapLines={true}
                    codeBlock
                    // theme={dracula}
                />
                <h6>Result</h6>
                <JsonToTable json={result}/>
                {/* <Button>Next</Button> */}
        <AppPagination/>
    </div>
};

export default Game;