<template>
  <div>
    <div style="margin: 0.5em">
      <!-- 头部组件区 -->
      <el-row>
        <el-col :span="12">
          <!-- 按钮 -->
          <div class="btns">
            <!-- 点击打开模态框 -->
            <el-button type="primary" size="small" @click="openDialog"
              >添加</el-button
            >
            <el-button type="danger" size="small" @click="batchDeleteCustomer"
              >批量删除</el-button
            >
          </div>
        </el-col>
        <!-- 搜索框 -->
        <el-col :span="12" style="text-align: right"> </el-col>
      </el-row>
    </div>

    <!-- 数据表格 -->
    <el-table
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="realname" label="姓名"></el-table-column>
      <el-table-column prop="telephone" label="联系方式"></el-table-column>
      <el-table-column label="图标">
        <template v-slot="slot">
          <img
            :src="slot.row.imgPhoto"
            style="width: 50px; height: 50px"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="启用"
            inactive-value="禁用"
            @change="changeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="small"
            @click="updateCustomer(scope.row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="deleteCustomer(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div>
      <!-- 分页组件 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="listQuery.pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <el-dialog title="新增顾客信息" :visible="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          placeholder="请输入顾客用户名"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          placeholder="请输入顾客姓名"
        >
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          placeholder="请输入顾客联系方式"
        >
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 设置顾客状态信息 -->
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status">
            <el-radio label="禁用"></el-radio>
            <el-radio label="启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 模态框中为顾客设置图标 -->
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://121.199.29.84:8001/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="form.imgPhoto" :src="form.imgPhoto" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" size="small" @click="addCustomer"
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
      formLabelWidth: "100px",
    };
  },
  created() {
    this.setListQuery(0);
    this.queryCustomer();
  },
  computed: {
    ...mapState("customer", ["list", "listQuery", "total", "id", "form"]),
  },
  methods: {
    ...mapActions("customer", [
      "queryCustomer",
      "deleteCustomerById",
      "addOrUpdateCustomer",
      "tobatchDeleteCustomer",
    ]),
    ...mapMutations("customer", ["setId", "setListQuery", "setForm", "setIds"]),

    // 页码改变时触发事件
    handleCurrentChange(page) {
      this.setListQuery(page - 1);
      this.queryCustomer();
    },

    // 点击删除按钮时触发
    deleteCustomer(id) {
      //使状态机state.id突变
      this.setId(id);
      //根据id删除当前行
      this.deleteCustomerById();
    },

    // 点击添加触发事件
    openDialog() {
      //打开模态框
      this.dialogFormVisible = true;
      this.setForm({});
    },
    // 状态改变时触发事件
    changeStatus(row) {
      this.setForm(row);
      this.addOrUpdateCustomer();
    },
    // 点击模态框中确定是触发事件
    addCustomer() {
      this.dialogFormVisible = false;
      this.addOrUpdateCustomer();
    },
    // 点击修改时触发的时间
    updateCustomer(row) {
      this.dialogFormVisible = true;
      this.setForm(row);
    },

    handleAvatarSuccess(res, file) {
      this.form.imgPhoto = "http://121.199.29.84:8888/group1/" + res.data.id;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 勾选表单数据时触发的事件
    handleSelectionChange(ids) {
      this.setIds(ids);
    },
    // 点击批量删除时触发的事件
    batchDeleteCustomer() {
      this.tobatchDeleteCustomer();
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