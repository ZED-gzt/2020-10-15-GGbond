import { get, post, post_array } from '../../utils/axios'
import { commit } from 'vuex'

const category = {
    //开启命名空间
    namespaced: true,
    state() {
        return {
            list: null,
            listQuery: {
                page: 0,
                pageSize: 5
            },
            total: null,

        }
    },
    actions: {
        findQueryCategory(context) {
            //查询所有栏目信息
            // get('/category/findAll').then((resp) => {
            //     context.commit('setList', resp.data)
            //     console.log(resp.data);
            // })
            post('/category/query', context.state.listQuery).then((resp) => {
                // console.log(resp.page, resp.pageSize);
                context.commit('setList', resp.data.list);
                context.commit('setListQuery', resp.data);
                context.commit('setTotal', resp.data.total)
            })

        },
        saveOrUpdateCategory(context) {

        },
        findCategoryTree() {

        }
    },
    mutations: {
        setList(state, list) {
            state.list = list
        },
        setListQuery(state, page) {
            state.page = page;
        }, setTotal(state, total) {
            state.total = total
        }
    }
}
export default category;