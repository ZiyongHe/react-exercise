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

export default function Signup() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signup, error, setError, loading, setLoading } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if ( emailRef.current.value === '' || passwordRef.current.value === '') {
            return setError('Invalid input, please try again')
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
        } catch {
            setError('Failed to create an account')
            setLoading(false)
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Sign Up</h3>
                <TextField id="outlined-basic" label="Email" variant="outlined" inputRef={emailRef} />
                <br></br>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" inputRef={passwordRef} />
                <br></br>
                <Button variant="contained" disabled={loading} onClick={(e)=>handleSubmit(e)}>Sign up</Button>
                <h6>Already have an account? <Link to="/login">Login</Link> here.</h6>
                {error && <StyledAlert severity="error" className='d-flex justify-content-center'>{error}</StyledAlert> }
            </Wrapper>
        </div>
    )
}
