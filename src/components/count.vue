<template>
  <div class="count">
    <h1>{{ msg }}</h1>
    <!-- 第一种引用状态方法 -->
    <p>{{$store.state.count}}</p>
    <p>{{count}}</p>

    <button @click="add">+</button>
    <button @click="$store.commit('reduce',1)">-</button>
    <p>{{$store.state.num}}</p>
    <p>{{num}}</p>
    
    
    <button @click="addAction">+</button>
    <button @click="$store.dispatch('reduceAction')">-</button>
    
  </div>
</template>
  
<script>
import store from '@/vuex/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';
export default {
  name: 'count',
  data () { 
    return {
      msg: 'this is count page'
    }
  },  
  // 第二种方式
  // computed:{
  //   count(){
  //      return this.$store.state.count;
  //   }
  // },
  // 第三种方式
//   computed:mapState({
//         count:state=>state.count,
//         num:state=>state.num,
//  }),
 // 第四种方式
  computed:{
    ...mapState(['count','num']),
    // getters第一种方式
    //  count(){
    //     return this.$store.getters.count;
    // }
    // getters第二种方式
    ...mapGetters(["count"])
  },
  methods:{
    ...mapActions(['addAction']),
    ...mapMutations(['add']),
  },
  store
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>