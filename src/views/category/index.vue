<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" size="small" class="btns" @click="openDialog1"
          >新增</el-button
        >
        <el-button type="danger" size="small" class="btns">批量删除</el-button>
      </el-col>
      <el-col></el-col>
    </el-row>
    <el-table
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="编号"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column label="图标">
        <template v-slot="slot">
          <img :src="slot.row.icon" style="width: 50px; height: 50px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="父栏目"> </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" @click="openDialog2" size="small"
          >修改</el-button
        >
        <el-button type="danger" size="small">删除</el-button>
      </el-table-column>
    </el-table>
    <div>
      <!-- 分页组件 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-size="listQuery.pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="名称"
          :label-width="formLabelWidth"
          placeholder="请输入栏目名称"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父栏目" :label-width="formLabelWidth">
          <el-select v-mode="form.parentId" placeholder="请选择父栏目">
            <el-option value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {},
    };
  },
  created() {
    this.findQueryCategory();
  },
  computed: {
    ...mapState("category", ["list", "listQuery", "total"]),
  },
  methods: {
    ...mapActions("category", ["findQueryCategory"]),
    // 当页数发生改变是执行的方法
    handleCurrentChange(page) {
      this.listQuery.page = page;
      this.findQueryCategory(page);
    },
    openDialog1() {
      this.dialogFormVisible = true;
    },
    openDialog2() {
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style>
.btns {
  margin: 0.5em;
}
</style>