import { get, post, post_array } from '../../utils/axios'
import { commit } from 'vuex'

const order = {
    namespaced: true,
    state() {
        return {
            list: [],
            allList: [],
            status: null
        }
    },
    actions: {
        // 分页查询顾客信息
        findAllOrder(context) {
            get("/order/findAll").then((resp) => {
                context.commit('setAllList', resp.data);

            })
        },
        //根据状态查询顾客信息
        findQuery(context) {
            get('/order/query', { status: context.state.status }).then((resp) => {
                context.commit('setList', resp.data);

            })
        }
    },
    mutations: {
        setAllList(state, allList) {
            state.allList = allList
        },
        setList(state, list) {
            state.list = list
        },
        setStatus(state, status) {
            state.status = status
        }
    }


}
export default order;