import { getUserListByFuzzyKw } from '@/api/user'

const useSelectUser = () => {
    const loading = ref(false)
    const userData = reactive({
        list: [],
        total: 0
    })
    const remoteMethod = async (query: string) => {
        loading.value = true
        const {result: {list, total}} = await getUserListByFuzzyKw({
            keywords: query,
            pageIndex: 1,
            pageSize: 10
        })
        userData.list = list
        userData.total = total
        loading.value = false
    }

    return {
        userData,
        loading,
        remoteMethod
    }
}

export default useSelectUser