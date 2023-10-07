import { getProjectDetailById, getProjectRoleUserListById } from '@/api/project'

export default function() {
    // 项目信息
    const projectInfo = reactive({
        id: '',
        productId: '',
        code: '',
        projectType: '',
        cycle: '',
        startTime: '',
        endTime: '',
        departmentIds: [],
        departmentId: '',
        departmentName: '',
        description: ''
    })
    // 项目人员配置
    const projectRoleUserList = ref([])
    // 必填的角色
    const requiredIds = ref([])

    // 获取项目信息
    const getProjectInfo = async (id:string) => {
        if(!id) return
        const { result } = await getProjectDetailById(id)
        return result
    }

    // 获取项目人员配置信息
    const getRoleByProjectId = async (id: string) => {
        if(!id) return
        const { result } = await getProjectRoleUserListById(id)
        projectRoleUserList.value = result.map(r => {
            r.isCheck = requiredIds.value.indexOf(r.roleId) > -1 ? 1 : 0
            r.name = r.roleName
            r.user = r.user || []
            r.user.map(u => {
              return (u.realName = u.name)
            })
            return r
        })
    }

    return {
        projectInfo,
        projectRoleUserList,
        requiredIds,
        getProjectInfo,
        getRoleByProjectId
    }
}