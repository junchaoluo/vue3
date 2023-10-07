import { getProducts } from '@/api/project'
import { getDeptTree } from '@/api/user'

// 下拉框类型
type Options = {
    label?: string,
    value: string,
    [propName: string]: unknown
}

// 部门类型
type Department = {
    name: string,
    id: string,
    [propName: string]: unknown
}
type DepartmentOptions = Department & {
    childNode: Department
}

export default function() {
    // 获取产品数据
    const product = reactive<{
        list: Options[],
        total: number
    }>({
        list: [],
        total: 0
    })
    const productRemoteMethod = async (query:string) => {
        let params = {
            pageNum: 1,
            pageSize: 10,
            pdNo: query
        }
       const result = await getProducts(params)
       product.list = result.result.rows.map(item => {
        return {
            label: item.pdNo,
            value: item.id
        }
       })
       product.total = result.result.total
    }

    // 获取项目类型
    const projectTypeList = reactive<Options[]>([
        { value: 'B类' },
        { value: 'A类' },
        { value: '自主立项' },
        { value: 'FTE类' },
        { value: 'C类' }
    ])
    // 获取所属部门
    const departmentData = reactive<DepartmentOptions[]>([])
    const getDeptTreeData = async () => {
        const { result } = await getDeptTree()
        departmentData.push(...result)
    }

    return {
        product,
        productRemoteMethod,
        projectTypeList,
        departmentData,
        getDeptTreeData
    }
}