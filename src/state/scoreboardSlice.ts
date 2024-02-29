import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Game {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: Date;
}

interface ScoreboardState {
    games:Game[];
}

const initialState: ScoreboardState = {
    games: [],
  };

const scoreboardSlice=createSlice({
    name:'scoreboard',
    initialState,
    reducers:{
        beginGame:(state, action:PayloadAction<{homeTeam:string, awayTeam:string}>)=>{
            const{homeTeam, awayTeam}=action.payload;
            state.games.push({ homeTeam, awayTeam, homeScore: 0, awayScore: 0, startTime: new Date() });
        },

        modifyScore:(state, action:PayloadAction<{index:number, homeScore:number, awayScore:number}>)=>{
            const {index, homeScore, awayScore} = action.payload;
            state.games[index].homeScore = homeScore;
            state.games[index].awayScore = awayScore;
        },

        endGame: (state, action: PayloadAction<number>) => {
        const index = action.payload;
        state.games.splice(index, 1);
        },
    }

});

export const { beginGame, modifyScore, endGame } = scoreboardSlice.actions;
export default scoreboardSlice.reducer;