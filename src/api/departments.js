import request from '@/utils/request'

// 获取组织架构的数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除组织架构的部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
    // 同样的地址不同的方法执行不同的业务
    // delete删除业务
    // get获取业务
    // post新增或添加业务
    // put修改业务
  })
}

// 新增组织架构的部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data // axios的body参数 data
  })
}

// 获取部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 编辑部门
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}