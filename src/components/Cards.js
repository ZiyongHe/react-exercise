import * as React from 'react';
import styled from 'styled-components'

import { TextField, Button, Card } from '@material-ui/core'

import BasicSelect from './BasicSelect.js'
import { useAuth } from '../utils/AuthContext'


const StyledCard = styled(Card)`
    width: 40%;
    padding: 20px;
    height: 200px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: 600px;
    padding-top:100px;
    padding-bottom: 30px;
`

const StyledTitle = styled.p`
    padding-top:50px;
`


function Cards() {


    const [image, setImage] = React.useState(null)
    const { uploadImage, players } = useAuth()

    
    const card1 = React.useRef(null)
    const card2 = React.useRef(null)
    const card3 = React.useRef(null)
    const card4 = React.useRef(null)
    
    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        uploadImage(image)
    }

    return (
        <div>
            <StyledTitle>Change profile picture here</StyledTitle>
            <TextField type='file' onChange={handleChange}></TextField>
            <br></br>
            <Button variant="contained" onClick={handleUpload}>Upload</Button>
            <Wrapper>
                <StyledCard ref={card1} style={{background:players[0]}}>
                    <p>player 1</p>
                    <BasicSelect index={0}/>
                </StyledCard>

                <StyledCard ref={card2} style={{background:players[1]}}>
                    <p>player 2</p>
                    <BasicSelect index={1}/>
                </StyledCard>

                <StyledCard ref={card3} style={{background:players[2]}}>
                    <p>player 3</p>
                    <BasicSelect index={2}/>
                </StyledCard>

                <StyledCard ref={card4} style={{background:players[3]}}>
                    <p>player 4</p>
                    <BasicSelect index={3}/>
                </StyledCard>
            </Wrapper>
        </div>
    )
}

export default Cards
