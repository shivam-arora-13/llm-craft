import { Button } from "reactstrap";
import { useState } from "react";

const Register = (props) => {

    const [value, setValue] = useState('');

    return <div>
     <h1>Register</h1>
     <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter username"/>
     <Button onClick={() => props.handleSubmit(value)}>Submit</Button>
     </div>
};

export default Register;