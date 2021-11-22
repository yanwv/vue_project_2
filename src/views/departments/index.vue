<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <el-card class="tree-card">
        <!-- 结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- el-tree -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 作用域插槽 slot-scope="obj" -->
          <!-- 插槽内容 会多次循环 有多多少节点就循环多少次 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 添加弹窗 -->
    <add-dept
      ref="addDept"
      :showDialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    ></add-dept>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils";
import AddDept from "./components/add-dept.vue";
export default {
  components: {
    TreeTools,
    AddDept,
  },
  data() {
    return {
      company: { name: "有限公司", manager: "负责人" },
      departs: [],
      defaultProps: {
        label: "name",
      },
      showDialog: false, // 默认不显示弹窗
      node: null, // 记录点击的node节点
    };
  },
  created() {
    this.getDepartments(); // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments();
      this.company = { name: result.companyName, manager: "负责人", id: "" };
      this.departs = tranListToTreeData(result.depts, ""); // 需要将其转化成树形结构
    },
    // 监听tree-tools中触发的点击添加事件
    addDepts(node) {
      this.showDialog = true;
      this.node = node;
    },
    editDepts(node) {
      this.showDialog = true;
      this.node = node;
      this.$refs.addDept.getDepartDetail(node.id);
    },
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
