import { get, post, post_array } from '../../utils/axios'
import { commit } from 'vuex'

const customer = {
    namespaced: true,
    state() {
        return {
            list: [],
            listQuery: {
                page: 0,
                pageSize: 5
            },
            total: null,
            id: null,
            form: {
                imgPhoto: ""
            },
            ids: []
        }
    },
    actions: {
        // 分页查询顾客信息
        queryCustomer(context) {
            post("/customer/query", context.state.listQuery).then((resp) => {
                context.commit('setList', resp.data.list);
                context.commit('setTotal', resp.data.total);
            })
        },
        // 删除顾客信息
        deleteCustomerById(context) {
            get("/customer/deleteById", { id: context.state.id }).then(() => {
                context.dispatch('queryCustomer')
            })
        },
        addOrUpdateCustomer(context) {
            post("/customer/saveOrUpdate", context.state.form).then(() => {
                context.dispatch('queryCustomer')
            })
        },
        tobatchDeleteCustomer(context) {
            post_array("/customer/batchDelete", { ids: context.state.ids }).then(() => {
                context.dispatch("queryCustomer")
            })
        }
    },
    mutations: {
        setList(state, list) {
            state.list = list
        },
        setListQuery(state, page) {
            state.listQuery.page = page;
        }, setTotal(state, total) {
            state.total = total
        },
        setId(state, id) {
            state.id = id
        },
        setForm(state, form) {
            state.form = form
        },
        setIds(state, ids) {
            state.ids = ids.map(item => item.id)
        }
    }

}

export default customer;