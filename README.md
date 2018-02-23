- vuex理解  
将状态提取出来童统一配置（单独一个js文件），只能通过特定的方法修改。  
在组件中引入配置文件，通过直接调用或方法调用修改状态。
- 引入   
	

```
npm install vuex --save
```
将vuex引入，可以在package.json中看到

```
 "dependencies": {
    "vue": "^2.3.3",
    "vue-router": "^2.3.1",
    "vuex": "^2.3.1"
  },
```
因为是生产依赖所以命令用--save   
如果只是调试依赖，就需加--save -dev  
然后我们最好把vuex单独拿出来，就直接在src文件夹中新建vuex文件夹，下面新建store.js 文件，store.js加入

```
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
```
其中

```
Vue.use(Vuex);
```
是作为模块引入是需要加入，如果直接CDN引入则不需要。
- 简单配置
在store.js中加入

```
const state = {
    count:8888
}
const mutations={
    add(state){
        state.count++;
    },
    reduce(state){
        state.count--;
    }
}
export default new Vuex.Store({
    state,
    mutations
}) 
```
所有状态都放在state对象中，修改状态的方法放在mutations，然后export给外部使用。
- 在组件中使用
在组件中引入，并注册到组件中。

```
<script>
import store from '@/vuex/store'
export default {
  name: 'count',
  data () { 
    return {
      msg: 'this is count page'
    }
  },
  store
}
</script>
```
这样就可以在组件中引用，这里修改状态需要触发事件。

```
 <p>{{$store.state.count}}</p>
<button @click="$store.commit('add')">+</button>
<button @click="$store.commit('reduce')">-</button>
```
以上是最简单的例子，接下来了解各个细节
- 状态在组件中引用的几种方式  

1.直接引用

```
 <p>{{$store.state.count}}</p>
```
但缺点是：需要写比较长的代码，出于代码简洁考虑，理想是直接用count代替$store.state.count。  
2.通过computed方法应用。

```
computed:{
    count(){
       return this.$store.state.count;
    }
  },
```
这种方法可以将$store.state.count表示为count，而且在模板中直接使用count。

```
<p>{{count}}</p>

```
但缺点是：多状态时，需要为每个状态写一个函数。  
3.使用vuex 的mapState辅助函数  
引入

```
import {mapState} from 'vuex';

```
然后

```
  computed:mapState({
        count:state=>state.count,
        num:state=>state.num,
 }),
```
这样引用就可以直接使用count，并且可以将多个状态集中在一起。缺点是：编写代码量还是太多。  
4.还是使用mapState辅助函数，但是有更加简洁的表示方法。  
引入
```
import {mapState} from 'vuex';

```
然后

```
  computed:mapState(['count','num']),

```
这样引用就可以直接使用count，并且可以将多个状态集中在一起。  
注意：计算属性的名称必须与 state 的子节点名称相同。
- 怎样修改state（Mutations）方法 （同步 使用） 
1.使用$store.commit('')方法

```
<button @click="$store.commit('add')">+</button>
```
还可以传值  

```
const mutations={
    add(state){
        state.count++;
    },
    reduce(state,n){
        state.count -= n;
    }
}
```
调用

```
    <button @click="$store.commit('reduce',5)">-</button>

```
以上代码不够简洁。
2.使用vuex 的mapMutations辅助函数   
引入

```
import {mapState,mapMutations} from 'vuex';

```
调用

```
  methods:mapMutations(['add']),

```
在模板中可以直接引用add

```
  <button @click="add">+</button>

```
- getters  
作用：在状态被获取之前进行再次编辑。可以对数据进行过滤、加工 。可以认为是store的计算属性，接受 state 作为其第一个参数     
在配置文价中声明  

```
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
```
引入属性

```
export default new Vuex.Store({
    state,
    mutations,
    getters
}) 
```
在组件中引用

```
 computed:{
    ...mapState(['count','num']),
     count(){
        return this.$store.getters.count;
    }
  },
```
之后在组件中引$store.state.count的地方都会起作用。
2.使用mapGetters辅助函数简化  
在组件中引入

```
 import { mapState,mapMutations,mapGetters } from 'vuex';
```
然后

```
 computed:{
    ...mapState(['count','num']),
    // getters第一种方式
    //  count(){
    //     return this.$store.getters.count;
    // }
    // getters第二种方式
    ...mapGetters(["count"])
  },
```
这里使用es6展开扩展符号
- actions（异步）
actions同样可以改变状态的值，但是==通过调用mutations里面的方法==，不可以直接修改。引入的目的是action可以通过异步使用，mutations只能同步使用。  
在配置文件中声明 

```
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

const actions = {
    addAction(context){
        context.commit('numAdd');
    },
    reduceAction({commit}){
        commit('numReduce');
    }
}
```
其中actions里面方法参数有两种表达方式  
1.context：上下文对象store;
2.{commit}:直接把commit对象传递过来  
在组件中使用：

1.引入

```
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex';
```

```
methods:{
    ...mapActions(['addAction']),
    ...mapMutations(['add']),
  },
```
在模板中直接使用addAction、reduceAction

```
<button @click="addAction">+</button>
```
2.直接$store.dispatch('reduceAction')调用

```
    <button @click="$store.dispatch('reduceAction')">-</button>
 
```
- Modules
当大型项目的状态非常多时，如果全部集中在store中，会变得很臃肿，可以将不同模块的状态分离出来。
形式如下：

```
const moduleA = {
  state: { count：1 },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { num:1 },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

```
在组件中可以直接调用

```
store.state.a.count // -> moduleA 的状态
store.state.b.num // -> moduleB 的状态
```
以上就是vuex的主要内容  
[vuexc传送门](https://vuex.vuejs.org/zh-cn/)   


























