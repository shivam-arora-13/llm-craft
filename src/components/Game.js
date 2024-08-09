import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { enqueueSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyBlock } from 'react-code-blocks';
import { TrophyFilled, TrophyTwoTone } from '@ant-design/icons';
import AppPagination from './AppPagination';
import { JsonToTable } from "react-json-to-table";
import { schemas } from '../mocks';
import { context, fetchResponse } from '../utils';
import { Input, Alert } from 'antd';
const { TextArea } = Input;

const Game = () => {
    const [userLevel, setUserLevel] = useState(0);
    const [displayLevel, setDisplayLevel] = useState(0);
    const [formValues, setFormValues] = useState({
        system_message: '',
        prompt: []
    });
    const [results, setResults] = useState([]);
    const maxLevel = context.clues.length;

    // SETS LEVEL VALUES
    useEffect(() => {
        let savedLevel = localStorage.getItem('llm_craft_level');
        if (savedLevel) {
            savedLevel = parseInt(savedLevel);
            setUserLevel(savedLevel);
            setDisplayLevel(savedLevel);
        } else {
            localStorage.setItem('llm_craft_level', userLevel);
        }
    }, []);

    // SETS FORM FIELDS
    useEffect(() => {
        const savedFormValues = localStorage.getItem('llm_craft_form_values');
        if (savedFormValues) {
            setFormValues(JSON.parse(savedFormValues));
        } else {
            localStorage.setItem('llm_craft_form_values', JSON.stringify(formValues));
        }
    }, []);

    // SETS RESULT VALUES
    useEffect(() => {
        const savedResults = localStorage.getItem('llm_craft_results');
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        } else {
            localStorage.setItem('llm_craft_results', JSON.stringify(results));
        }
    }, []);

    const updateUserLevel = (lv) => {
        setUserLevel(lv);
        localStorage.setItem('llm_craft_level', lv);
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        localStorage.setItem('llm_craft_form_values', JSON.stringify(formValues));
        // Get result
        // 'error' | 'success'
        await fetchResponse({
            system_message: formValues.system_message,
            prompt: formValues.prompt[displayLevel-1]
        });
        const levelResult = {
            status: 'success',
            sql: 'SELECT name FROM Actors where actorID = 234;',
            response: { name: 'Leonardo DiCaprio' }
        };
        // Show some alert
        enqueueSnackbar(
            levelResult.status === 'success' ? 'Woohoo!!! Correct Answer' : 'Oops!!! Wrong Answer',
            { variant: levelResult.status, autoHideDuration: 2000 }
        );
        // Add result to result array
        let newResults = results;
        if (newResults.length < displayLevel) {
            newResults = [...newResults, levelResult];
        } else {
            newResults[displayLevel - 1] = levelResult;
        }
        setResults(newResults);
        localStorage.setItem('llm_craft_results', JSON.stringify(newResults));
        // Change level values
        // MAKE IT CONDITIONAL
        updateUserLevel(userLevel + 1);
        // Update Score        
    };

    if (displayLevel === 0) return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        rowGap: '1.5rem',
        padding: '2rem',
        marginInline: 'auto',
        height: '90vh'
    }}>
        <div style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            rowGap: '2rem',
            textAlign: 'center'
        }}>
            <div style={{
                height: '60vh',
                textAlign: 'justify',
                overflowY: 'scroll',
                whiteSpace: 'pre-line'
            }}>{context.context}</div>
            <Button 
                color="primary"
                onClick={() => {
                    if(userLevel === 0){
                        setDisplayLevel(1);
                        updateUserLevel(1);
                    }else {
                        setDisplayLevel(userLevel);
                    }
                }}
                style={{ width: '100%' }}
                >{ userLevel === 0 ? 'Start' : 'Continue'}</Button>
        </div>
        <AppPagination
            userLevel={userLevel}
            maxLevel={maxLevel}
            handleDisplayLevelChange={(idx) => setDisplayLevel(idx)} />
    </div>


    if (displayLevel > maxLevel) return <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        rowGap: '1.5rem',
        padding: '2rem',
        marginInline: 'auto',
        height: '90vh'
    }}>
        <div style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '2rem',
            textAlign: 'center'
        }}>
            <TrophyFilled style={{
                fontSize: '100px',
                color: '#198855'
            }} />
            <div>
                <h3>Woohoo!!!</h3>
                <p>Congratulations for solving the mystery</p>
            </div>
        </div>
        <AppPagination
            userLevel={userLevel}
            maxLevel={maxLevel}
            handleDisplayLevelChange={(idx) => setDisplayLevel(idx)} />
    </div>

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.5rem',
        padding: '2rem',
        marginInline: 'auto'
    }}>
        <div>
            <h6>CLUE : {displayLevel}</h6>
            <p>{context.clues[displayLevel - 1].clue}</p>
        </div>

        <CopyToClipboard text={schemas}
            onCopy={(_) => {
                enqueueSnackbar('Copied to clipboard', { variant: 'info', autoHideDuration: 2000 })
            }}>
            <Button>Copy schemas to clipboard</Button>
        </CopyToClipboard>

        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Label>System Message</Label>
                <TextArea
                    placeholder="Enter system message"
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    value={formValues.system_message}
                    onChange={e => {
                        const msg = e.target.value;
                        setFormValues(prev => ({ ...prev, system_message: msg }));
                    }}
                />
            </FormGroup>
            <FormGroup>
                <Label>Prompt</Label>
                <TextArea
                    placeholder="Enter prompt"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                    disabled={displayLevel < userLevel}
                    key={displayLevel}
                    defaultValue={formValues.prompt[displayLevel - 1]}
                    onChange={e => {
                        const msg = e.target.value;
                        if (formValues.prompt.length < displayLevel) {
                            setFormValues(prev => ({
                                ...prev,
                                prompt: [...prev.prompt, msg]
                            }));
                        } else {
                            setFormValues(prev => {
                                prev.prompt[displayLevel - 1] = msg;
                                return prev;
                            });
                        }
                    }}
                />
            </FormGroup>
            <Button type='submit' disabled={displayLevel < userLevel} style={{ width: '100%' }}>Submit</Button>
        </Form>

        {
            (results.length >= displayLevel) && <>
                <Alert message={
                    results[displayLevel - 1].status === 'success' ? 'Correct Answer' : 'Wrong Answer'
                } description={
                    results[displayLevel - 1].status === 'success' ? 'You found the culprit' : 'You could not find the culprit'
                } type={results[displayLevel - 1].status} showIcon />
                <h6>Generated Query</h6>
                <CopyBlock
                    text={results[displayLevel - 1].sql}
                    language={'SQL'}
                    showLineNumbers={true}
                    wrapLines={true}
                    codeBlock
                />
                <h6>Generated Response</h6>
                <JsonToTable json={results[displayLevel - 1].response} />
                {
                    (displayLevel + 1 === userLevel) && <Button onClick={() => setDisplayLevel(userLevel)}>Continue</Button>
                }
            </>
        }

        <AppPagination
            userLevel={userLevel}
            maxLevel={maxLevel}
            handleDisplayLevelChange={(idx) => setDisplayLevel(idx)} />
    </div>
};

export default Game;