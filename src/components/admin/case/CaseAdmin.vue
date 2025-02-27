<template>
    <div class="flex flex-col gap-4 mb-12">
        <BtnComponentOrange
            class="blog__btn-panel w-fit"
            emit-name="action"
            @action="$router.push('/case/create')"
        >
            Добавить кейс
        </BtnComponentOrange>
        <SearchPaneCase
            v-model:search="panel.search"
            v-model:sort="panel.sort"
            v-model:type="panel.type"
            :option="option"
            :option-case-type="optionCaseType"
            @search="search()"
            @reset="resetSearchPanel"
        />
        <ListCaseEmpty v-if="!data"></ListCaseEmpty>

        <CaseList v-else :data="data" :editing="true" />
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useBriefcaseStore } from '@/stores/briefcaseStore'
import ListCaseEmpty from '@/components/cabinet/case/empty/ListCaseEmpty.vue'
import CaseList from '@/components/cabinet/case/list/CaseList.vue'
import SearchPaneCase from '@/components/search/SearchPaneCase.vue'
import { CaseType } from './typy-article/typeArticle'
import BtnComponentOrange from '@/components/ui/btns/BtnComponentOrange.vue'
const briefcaseStore = useBriefcaseStore()

const panel = reactive({
    search: '',
    sort: 'DESC',
    type: null
})

const option = [
    { label: 'Cначала новые', value: 'DESC' },
    { label: 'Сначала ранние', value: 'ASC' }
]

const optionCaseType = Object.entries(CaseType).map(([, val]) => {
    return { label: val.name, value: val.value }
})
const getIsSuccess = computed(() => {
    return briefcaseStore.getIsSuccess
})

const data = ref()

const getListBriefcase = computed(() => {
    return briefcaseStore.getListBriefcase
})

onMounted(() => {
    briefcaseStore.getCaseListDb({ search: panel.search, sort: panel.sort, type: panel.type })
})

function search() {
    briefcaseStore.getCaseListDb({ search: panel.search, sort: panel.sort, type: panel.type })
}

function resetSearchPanel() {
    panel.search = ''
    panel.sort = 'DESC'
    panel.type = null
    briefcaseStore.getCaseListDb({ search: panel.search, sort: panel.sort, type: panel.type })
}

watch(
    () => panel.search,
    (newVal) => {
        if (newVal.trim() == '') {
            briefcaseStore.getCaseListDb({
                search: panel.search,
                sort: panel.sort,
                type: panel.type
            })
        }
    },
    { deep: true }
)

watch(getListBriefcase, () => {
    data.value = getListBriefcase.value
})

watch([() => panel.type, () => panel.sort], () => {
    briefcaseStore.getCaseListDb({ search: panel.search, sort: panel.sort, type: panel.type })
})

watch(getIsSuccess, (val) => {
    if (val === 'remove') {
        briefcaseStore.getCaseListDb({ search: panel.search, sort: panel.sort, type: panel.type })
    }
})
</script>
<style lang="scss" scoped></style>
