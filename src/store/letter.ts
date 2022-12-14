import { defineStore } from 'pinia'
import API from '@/common/api'
import { get } from '../common/apiService';
export const useStore = defineStore('letter', {
    state: () => ({
        login:false,
        one:false,
        two:false,
    }),
    getters: {},
    actions: {
    }
})
