import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardsState } from './cardsSlice.types';
import { CardModel } from '../types/models';

const initialState: CardsState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardModel>) => {
      state.cards.push(action.payload);
    },
  },
});

export const { addCard } = cardsSlice.actions;

export default cardsSlice.reducer;
