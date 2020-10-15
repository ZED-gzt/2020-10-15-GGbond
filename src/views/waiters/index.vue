<template>
  <div class="app-container">
    <!-- 头部组件区 -->
    <el-row>
      <el-col :span="12">
        <!-- 按钮 -->
        <div class="btns">
          <el-button type="primary" size="small" @click="toAddWaiter"
            >添加</el-button
          >
          <el-button type="danger" size="small" @click="toBatchDeleteWaiters"
            >批量删除</el-button
          >
        </div>
      </el-col>
      <!-- 搜索框 -->
      <el-col :span="12" style="text-align: right">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item>
            <el-input
              v-model="search1"
              placeholder="请输入状态"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="searchHanlder(search1)"
              size="small"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 表单 -->
    <el-table
      v-loading="listLodaing"
      :data="list.list"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="realname"
        label="真实姓名"
        width="150"
      ></el-table-column>
      <el-table-column label="头像" width="80">
        <template v-slot="slot">
          <img
            :src="slot.row.imgPhoto"
            style="width: 42px; height: 42px; border-radius: 50%"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="联系方式"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="260"
      ></el-table-column>
      <el-table-column label="状态" width="180">
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
          <!-- 删除修改按钮 -->
          <el-button size="mini" @click="toUpdateWaiters(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="toDeleteWaiters(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div>
      <el-pagination
        :total="total.total"
        :page.sync="listQuery.page"
        :page-size.sync="listQuery.pageSize"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog
      title="新增员工信息"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            action="http://121.199.29.84:8001/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imgPhoto" :src="form.imgPhoto" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { mapState, mapActions, mapMutations } from "vuex";
import { commit } from "vuex";
import $ from "jquery";

export default {
  data() {
    return {
      listLodaing: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      formInline: {
        user: "",
        region: "",
      },
      search1: "",
    };
  },
  created() {
    this.fetchData();
  },
  //在仓库中的数据获取时必须写在计算属性中
  computed: {
    ...mapState("waiters", [
      "list",
      "total",
      "listQuery",
      "form",
      "id",
      "ids",
      "search",
    ]),
  },
  methods: {
    ...mapActions("waiters", [
      "fetchData",
      "addData",
      "upData",
      "deleteData",
      "batchDelete",
      "searchWaiters",
    ]),
    ...mapMutations("waiters", ["setId", "setForm", "setBatch", "setSearch"]),
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

    handleCurrentChange(page) {
      this.listQuery.page = page - 1;
      this.fetchData();
    },
    //修改员工信息
    toUpdateWaiters(row) {
      this.dialogFormVisible = true;
      this.setForm(row);
    },
    closeDialog() {
      this.dialogFormVisible = false;
    },
    //点击确定保存信息
    submitHandler() {
      this.dialogFormVisible = false;
      this.addData();
    },
    //添加新员工
    toAddWaiter() {
      this.form = { imgPhoto: "" };
      this.dialogFormVisible = true;
      this.setForm({});
    },
    //删除员工
    toDeleteWaiters(id) {
      this.$confirm("此操作将永久删员工信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.setId(id);
        this.deleteData();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
      this.fetchData();
    },
    //改变员工状态时触发事件
    changeStatus(row) {
      this.setForm(row);
      this.addData();
    },

    //在表单中勾选员工信息时触发事件
    handleSelectionChange(ids) {
      this.setBatch(ids);
    },
    //点击批量删除时触发的时间
    toBatchDeleteWaiters() {
      if (this.ids != "") {
        this.$confirm("此操作将永久删除员工信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.batchDelete();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "您还未选择任何员工",
        });
      }
    },
    searchHanlder(row) {
      this.setSearch(row);
      this.fetchData();
    },
  },
};
</script>
<style>
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

