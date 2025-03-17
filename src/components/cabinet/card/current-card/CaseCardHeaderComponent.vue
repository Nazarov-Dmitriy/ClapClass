<template>
    <div class="card-page__header">
        <div class="card-page__header-left">
            <CaseCardIcon :type="props.data?.type" class="w-[56px] h-[56px]"></CaseCardIcon>
            <TitleComponent v-if="props.data?.title" class="card-page__header-title">
                {{ props.data.title }}
            </TitleComponent>
        </div>
        <div class="card-page__header-right">
            <RaitingSvg class="card-page__header-right-img"></RaitingSvg>
            <span>{{ !props.data?.rating == 0 ? props.data.rating.toFixed(1) : 0 }}</span>
            <ViewSvg class="card-page__header-right-img"></ViewSvg>
            <span>{{ props.data?.shows || 0 }}</span>
            <TimeSvg class="card-page__header-right-img"></TimeSvg>
            <span>{{ props.data?.duration || '' }}</span>
        </div>
    </div>
</template>

<script setup>
import TitleComponent from '/src/components/ui/TitleComponent.vue'
import RaitingSvg from '@/assets/icons/case/raiting.svg?component'
import ViewSvg from '@/assets/icons/case/view.svg?component'
import TimeSvg from '@/assets/icons/case/time-icon.svg?component'
import CaseCardIcon from '../../case/card/CaseCardIcon.vue'

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    }
})
</script>

<style lang="scss" scoped>
.card-page__header {
    padding: 8px 64px;
    box-sizing: border-box;
    background: $yellowy;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-page__header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}
.card-page__header-img {
    border: 2px solid $orange;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    background: $white;
}

.card-page__header-right {
    display: flex;
    gap: 10px;
}
</style>
