<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="全部订单">
          <!-- 数据表格 -->
          <el-table :data="allList">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column label="下单日期">
              <template v-slot="scope">
                <div>{{ scope.row.orderTime | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="下单总数"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"></el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="已完成" name="已完成">
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column label="下单日期">
              <template v-slot="scope">
                <div>{{ scope.row.orderTime | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="下单总数"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"></el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="待支付" name="待支付">
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column label="下单日期">
              <template v-slot="scope">
                <div>{{ scope.row.orderTime | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="下单总数"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"></el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="待派单" name="待派单">
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column label="下单日期">
              <template v-slot="scope">
                <div>{{ scope.row.orderTime | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="下单总数"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"></el-table-column>
            <el-table-column label="操作">
              <button>派单</button>
            </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="待接单" name="待接单">
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column label="下单日期">
              <template v-slot="scope">
                <div>{{ scope.row.orderTime | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="下单总数"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"></el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
   
<script>
import { getList } from "@/api/table";
import { mapActions, mapState, mapMutations } from "vuex";
import { formatDate } from "../../store/date/index";
export default {
  data() {
    return {
      formLabelWidth: "100px",
      activeName: "全部订单",
    };
  },
  created() {
    this.findAllOrder();
  },
  computed: {
    ...mapState("order", ["list", "allList"]),
  },
  methods: {
    handleClick(tab) {
      this.setStatus(tab.name);
      this.findQuery();
    },
    ...mapActions("order", ["findAllOrder", "findQuery"]),
    ...mapMutations("order", ["setStatus"]),
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>