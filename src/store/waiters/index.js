


import { get, post, post_array } from '../../utils/axios'



const waiters = {
    //在使用子仓库名称时,需要开启命名空间
    namespaced: true,
    state() {
        return {
            list: null,
            total: 0,
            listQuery: {
                page: 0,
                pageSize: 7,
                status: ""
            },
            form: {
                imgPhoto: ""
            },
            id: 0,
            ids: [],
        }
    },
    actions: {
        fetchData(context) {
            // get("/waiter/findAll").then((resp) => {
            //     commit('setList', resp.data)
            //     console.log(resp.data);
            // })
            post('/waiter/query', context.state.listQuery).then((res) => {

                context.commit('setList', res.data)
                context.commit('setTotal', res.data)
                context.commit('setOk', res.data.page)

            })
        },
        addData(context) {
            post('/waiter/saveOrUpdate', context.state.form).then(() => {
                context.dispatch('fetchData')
            })
        },
        deleteData(context) {
            get('/waiter/deleteById', { id: context.state.id }).then(() => {
                context.dispatch('fetchData')
            })

        },
        batchDelete(context) {

            post_array('/waiter/batchDelete', { ids: context.state.ids }).then(() => {
                context.dispatch('fetchData')
            })
        },
        searchWaiters(context) {
            console.log(context.state.search);
        }

    }
    , mutations: {
        setList(state, list) {
            state.list = list;
        },
        setTotal(state, total) {
            state.total = total
        },
        setOk(state, page) {
            state.listQuery.page = page;
        },
        setId(state, id) {
            state.id = id;
        },
        setForm(state, form) {
            state.form = form
        },
        setBatch(state, ids) {
            state.ids = ids.map(item => item.id)
        },
        setSearch(state, status) {
            state.listQuery.status = status
        }


    }
}
export default waiters;