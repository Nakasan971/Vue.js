//ローカルストレージ周り
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


//コンストラクタ
new Vue({
    el:'#app',
    data:{
        todos:[],
        current:-1,      // 初期値は『全て』
        options:[
            {value:-1,label:'全て'},
            {value:0,label:'作業中'},
            {value:1,label:'完了'}
        ],
    },
    methods:{
        //Todo追加の処理
        doAdd:function(event,value){
            var comment = this.$refs.comment　//refで名前を付けた要素の参照
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
})