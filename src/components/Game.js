import React, { useState, useEffect, useMemo } from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { enqueueSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyBlock } from 'react-code-blocks';
import { TrophyFilled, LoadingOutlined } from '@ant-design/icons';
import AppPagination from './AppPagination';
import { JsonToTable } from "react-json-to-table";
import { context, fetchResponse, getResponseStatus } from '../utils';
import { Input, Alert, Avatar, Spin } from 'antd';
const { TextArea } = Input;

const Game = ({updateUser}) => {
    const [userLevel, setUserLevel] = useState(0);
    const [displayLevel, setDisplayLevel] = useState(0);
    const [formValues, setFormValues] = useState({
        system_message: '',
        prompt: []
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [displayResult, setDisplayResult] = useState(null);
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
            setDisplayResult(savedResults[displayLevel-1]);
        } else {
            localStorage.setItem('llm_craft_results', JSON.stringify(results));
        }
    }, []);

    useEffect(()=>{
        setDisplayResult(results[displayLevel-1]);
    }, [displayLevel]);

    const updateUserLevel = (lv) => {
        setUserLevel(lv);
        localStorage.setItem('llm_craft_level', lv);
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        localStorage.setItem('llm_craft_form_values', JSON.stringify(formValues));
        const res = await fetchResponse({
            system_message: formValues.system_message,
            prompt: formValues.prompt[displayLevel - 1]
        });
        console.log(res);
        const levelResult = {
            status: getResponseStatus(res.result, context.clues[displayLevel - 1].answer) ? 'success' : 'error',
            sql: res.sql_query,
            response: res.result,
            isExecutable: res.isExecutable
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
        setDisplayResult(levelResult);
        localStorage.setItem('llm_craft_results', JSON.stringify(newResults));
        if (levelResult.status === 'success') {
            updateUserLevel(userLevel + 1);
            // Update Score  
            const solvedAt = Date.now()
            const prevSolvedAt = Number(localStorage.getItem('llm_craft_last_time_stamp'));
            localStorage.setItem('llm_craft_last_time_stamp', solvedAt);
            const score = Math.floor(10000000/(solvedAt - prevSolvedAt));
            await updateUser(score);
        }
        setLoading(false)
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
                    if (userLevel === 0) {
                        setDisplayLevel(1);
                        updateUserLevel(1);
                    } else {
                        setDisplayLevel(userLevel);
                    }
                }}
                style={{ width: '100%' }}
            >{userLevel === 0 ? 'Start' : 'Continue'}</Button>
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
            {/* <TrophyFilled style={{
                fontSize: '100px',
                color: '#198855'
            }} /> */}
            <div>
            <Avatar size={200} src={require(`../assets/prisoner.png`)} />
                <h3>Woohoo!!! <br/> You found the culprit</h3>
                <p style={{ textAlign: 'center' }}>All evidence points to this player being behind the kidnapping. The motive seems clear—revenge for being let go by the team. The cops confirmed your suspicions and found our star player before the start of the match.</p>
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

        <CopyToClipboard text={context.schemas}
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
            <Button type='submit' disabled={(displayLevel < userLevel) || loading}
                style={{ width: '100%' }}>Submit</Button>
        </Form>

        <Spin size="large" spinning={loading} fullscreen/>

        {
            (displayResult) && (!displayResult.isExecutable ? <>
            <Alert type='warning' showIcon message='The generated query could not be executed'/>
            <h6>Generated Query</h6>
                <CopyBlock
                    text={displayResult.sql}
                    language={'SQL'}
                    showLineNumbers={true}
                    wrapLines={true}
                    codeBlock
                />
            </> : <>
                <Alert message={
                    displayResult.status === 'success' ? 'Correct Answer' : 'Wrong Answer'
                } 
                // description={
                //     displayResult.status === 'success' ? 'You found the culprit' : 'You could not find the culprit'
                // } 
                type={displayResult.status} showIcon />
                <h6>Generated Query</h6>
                <CopyBlock
                    text={displayResult.sql}
                    language={'SQL'}
                    showLineNumbers={true}
                    wrapLines={true}
                    codeBlock
                />
                <h6>Generated Response</h6>
                <JsonToTable json={displayResult.response} />
                {
                    (displayLevel + 1 === userLevel) && <Button onClick={() => setDisplayLevel(userLevel)}>Continue</Button>
                }
            </>)
        }

        <AppPagination
            userLevel={userLevel}
            maxLevel={maxLevel}
            handleDisplayLevelChange={(idx) => setDisplayLevel(idx)} />
    </div>
};

export default Game;