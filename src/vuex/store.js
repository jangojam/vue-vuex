import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    count:8888,
    num:1
}
const mutations={
    add(state){
        state.count++;
    },
    reduce(state,n){
        state.count -= n;
    },
    numAdd(state){
        state.num++;
    },
    numReduce(state){
        state.num--;
    }
}
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
const actions = {
    addAction(context){
        context.commit('numAdd');
    },
    reduceAction({commit}){
        commit('numReduce');
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
}) 