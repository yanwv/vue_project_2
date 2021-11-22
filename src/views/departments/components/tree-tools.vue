<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 -->
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item
                command="add"
                :disabled="!checkPermission('add-dept')"
                >添加子部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="edit">
                编辑部门
              </el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">
                删除部门
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/departments";
export default {
  props: {
    // 定义传入属性
    treeNode: {
      required: true,
      type: Object,
    },
    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 点击 添加 编辑 删除 时触发
    operateDepts(type) {
      if (type === "add") {
        // 添加
        this.$emit("addDepts", this.treeNode); // 触发自定义事件
      } else if (type === "edit") {
        // 编辑
        this.$emit("editDepts", this.treeNode);
      } else {
        // 删除
        this.$confirm("确定删除？")
          .then(() => {
            return delDepartments(this.treeNode.id);
          })
          .then(() => {
            // 成功时调用接口删除 后端数据变化了 前端没变
            this.$emit("delDepts"); // 触发自定义事件
            this.$message.success("删除部门成功");
          });
      }
    },
  },
};
</script>

<style scoped>
</style>