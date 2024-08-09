import { Card } from 'antd';
import { useState } from "react";
import { Input, Button } from 'reactstrap';
import AvatarPicker from "../AvatarPicker";
import avatarList from "../avatarList";

const Register = (props) => {

    const [name, setName] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('avatar1.png');

    return <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Card>
            <AvatarPicker onChange={(src) => setAvatarSrc(src)} avatarList={avatarList} />
            <Input value={name} style={{ margin: '1rem 0' }} onChange={e => setName(e.target.value)} placeholder="Enter username" />
            <Button style={{ width: '100%' }} onClick={() => props.handleSubmit(name, avatarSrc)}>Submit</Button>
        </Card>
    </div>
};

export default Register;