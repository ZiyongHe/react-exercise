import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'
import { Alert } from '@mui/material'
import { useAuth } from '../utils/AuthContext'


const Wrapper = styled.div`
    display: block;
    width: 500px;
    height: 450px;
    margin-top:100px;
    outline:1px solid white;
    line-height:3em;

    h3 {
        line-height:3em;
    }
`

const StyledAlert = styled(Alert)`
    width:60%;
    margin-top:20px;
    margin-left:auto;
    margin-right:auto;
`

export default function Login() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, error, setError, loading, setLoading } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ( emailRef.current.value === '' || passwordRef.current.value === '' ) {
            return setError('Invalid input, please try again')
        }
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
        } catch {
            setError('Failed to sign in')
            setLoading(false)
        }
    }
    return (
        <div>
            <Wrapper>
                <h3>Login</h3>
                <TextField label="Email" variant="outlined" inputRef={emailRef} />
                <br></br>
                <TextField label="Password" variant="outlined" type="password" inputRef={passwordRef} />
                <br></br>
                <Button variant="contained" disabled={loading} onClick={(e)=>handleSubmit(e)}>Log in</Button>
                <h6>Don't have an account yet? <Link to="/signup">Sign up</Link> here.</h6>
                {error && <StyledAlert severity="error" className='d-flex justify-content-center'>{error}</StyledAlert> }
            </Wrapper>
        </div>
    )
}
