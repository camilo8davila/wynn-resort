import { create } from 'zustand';

import { FormInputsBasic } from '@/app/auth/register/ui/RegisterForm';
import { FormInputsWayToSend } from '@/app/auth/register/ui/OtpForm';

export interface UserRegisterForm extends FormInputsBasic, FormInputsWayToSend { }

interface State {
  firstPage: UserRegisterForm;

  updateRegisterCache: (data: Partial<UserRegisterForm>) => void;
  resetStore: () => void;
}

const initialState = {
  firstName: '',
  lastName: '',
  gender: '',
  country: '',
  email: '',
  phone: {
    country: '',
    number: '',
    indicator: ''
  },
  terms: false,
  sendTo: null
}

export const useRegisterStore = create<State>((set, get) => ({
  firstPage: initialState,

  updateRegisterCache: (data: Partial<UserRegisterForm>) => {
    const { firstPage } = get();

    const newState = {
      ...firstPage,
      ...data
    }
    set({ firstPage: newState })
  },
  resetStore: () => set({ firstPage: initialState })
}))