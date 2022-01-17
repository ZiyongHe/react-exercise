import * as React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import BasicSelect from './BasicSelect.js'

import ColorContext from '../utils/ColorContext.js'

const StyledCard = styled(Card)`
    width: 40%;
    padding: 20px;
    height: 140px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    height: 400px;
    padding-bottom: 30px;
`

const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
    line-height:3em;
`


function Cards() {

    const [players, setPlayers] = React.useState(['','','','']);
    const [availability, setAvailability] = React.useState([1,1,1,1])

    const card1 = React.useRef(null)
    const card2 = React.useRef(null)
    const card3 = React.useRef(null)
    const card4 = React.useRef(null)

    

    return (
        <ColorContext.Provider value={{players,setPlayers,availability,setAvailability}}>
            <Wrapper>
                <StyledCard id="p1" ref={card1}>
                    <StyledLink to="/player1">player 1</StyledLink>
                    <BasicSelect index={0} card={card1}/>
                </StyledCard>

                <StyledCard id="p2" ref={card2}>
                    <StyledLink to="/player2">player 2</StyledLink>
                    <BasicSelect index={1} card={card2}/>
                </StyledCard>

                <StyledCard id="p3" ref={card3}>
                    <StyledLink to="/player3">player 3</StyledLink>
                    <BasicSelect index={2} card={card3}/>
                </StyledCard>

                <StyledCard id="p4" ref={card4}>
                    <StyledLink to="/player4">player 4</StyledLink>
                    <BasicSelect index={3} card={card4}/>
                </StyledCard>
            </Wrapper>
        </ColorContext.Provider>
    )
}

export default Cards
