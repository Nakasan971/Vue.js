<template>
    <div id="form">
        <h2>新しい作業の追加</h2>
            <form class="add-form" v-on:submit.prevent="doAdd">
                <!--入力フォーム-->
                コメント<input type="text" ref="comment">
                <!--追加モック-->
                <button type="submit">追加</button>
            </form>
            <label v-for="label in options" v-bind:key="label.id">
                <input type="radio"
                       v-model="current"
                       v-bind:value="label.value">{{label.label}}
            </label>
            ({{ computedTodos.length }} 件を表示中)
            <table>
                <!--テーブルヘッダ-->
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th class="comment">コメント</th>
                        <th class="state">状態</th>
                        <th class="button">-</th>
                    </tr>
                </thead>
                <tbody>
                    <!--要素表示-->
                    <tr v-for="item in computedTodos" v-bind:key="item.id">
                        <!--要素の情報-->
                        <th>{{item.id}}</th>
                        <td>{{item.comment}}</td>
                        <td class="state">
                            <!--ステートモック-->
                            <button v-on:click="doChangeState(item)">{{labels[item.state]}}</button>
                        </td>
                        <td class="button">
                            <!--削除モック-->
                            <button v-on:click="doRemove(item)">削除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>
<script>
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStrage = {
    //データの取得
    fetch:function(){
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')
        todos.forEach(function(todo,index){
            todo.id = index
        })
        todoStrage.uid = todos.length
        return todos
    },
    //データの保存
    save:function(todos){
        localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
    }
}
export default{
    data(){
        return{
            todos:[],
            current:-1,      // 初期値は『全て』
            options:[
                {value:-1,label:'全て'},
                {value:0,label:'作業中'},
                {value:1,label:'完了'}
            ],
        }
    },
    methods:{
        //Todo追加の処理
        doAdd:function(){
            var comment = this.$refs.comment  //refで名前を付けた要素の参照
            if(!comment.value.length) return  //入力がなければreturn
            this.todos.push({                 //{新しいID,コメント、作業状態}
                id:todoStrage.uid++,
                comment:comment.value,
                state:0
            })
            comment.value = ''                 //フォームを空に
        },
        //状態変更の処理
        doChangeState:function(item){
            item.state = item.state ? 0 : 1
        },
        //削除の処理
        doRemove:function(item){
            var index = this.todos.indexOf(item)
            this.todos.splice(index,1)
        }
    },
    created(){
        //インスタンス作成時に自動的にfetch()する
        this.todos = todoStrage.fetch()
    },
    watch:{
        //オプション使用の場合はオブジェクト形式に
        todos:{
            //引数は監視中のプロパティ変更後の値
            handler:function(todos){
                todoStrage.save(todos)
            },
            //deepオプションでネストしたデータも監視
            deep:true
        }
    },
    computed:{
        computedTodos:function(){
            return this.todos.filter(function(el){
                return this.current < 0 ? true : this.current == el.state
            },this)
        },
        labels(){
            return this.options.reduce(function(a,b){
                return Object.assign(a,{[b.value]:b.label})
            },{})
        }
    }
}
</script>
<style scoped>
.add-form{
    margin-bottom: 30px;
  }
  table {
    width: 100%;
    margin-top: 30px;
    border-collapse: collapse;
  }
  thead th {
    border-bottom: 2px solid #0099e4; /*#d31c4a */
    color: #0099e4;
  }
  th,
  th {
    padding: 0 8px;
    line-height: 40px;
  }
  thead th.id {
    width: 50px;
  }
  thead th.state {
    width: 100px;
  }
  thead th.button {
    width: 60px;
  }
  tbody td.button, tbody td.state {
    text-align: center;
  }
  tbody tr td,
  tbody tr th {
    border-bottom: 1px solid #ccc;
    transition: all 0.4s;
  }
  tbody tr.done td,
  tbody tr.done th {
    background: #f8f8f8;
    color: #bbb;
  }
  tbody tr:hover td,
  tbody tr:hover th {
    background: #f4fbff;
  }
  button {
    border: none;
    border-radius: 20px;
    line-height: 24px;
    padding: 0 8px;
    background: #0099e4;
    color: #fff;
    cursor: pointer;
  }
</style>