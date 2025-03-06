<template>
    <div class="wrapper">
        <div class="wrapper-btn">
            <a
                v-if="props.data?.rules_video"
                class="flex gap-4 items-center"
                :href="getUrl(props.data?.rules_video?.path)"
                target="_blank"
            >
                <button class="active-btn shrink-0"></button>
                <p class="font-bold text-2xl leading-[150%] text-[#e05704] text-center shrink-0">
                    Посмотрите правила
                </p>
                <div>
                    <span class="font-normal text-xl leading-[150%] text-black text-center">{{
                        props.data?.rules_video_description
                    }}</span>
                </div>
            </a>
        </div>
        <template v-if="props.data?.levels">
            <div v-for="level in props.data?.levels" :key="level.id" class="wrapper-btn">
                <a
                    v-if="props.data?.rules_video"
                    class="flex gap-4 items-center w-full"
                    :href="getUrl(level.file?.path)"
                    target="_blank"
                >
                    <button class="active-btn shrink-0"></button>
                    <p
                        class="font-bold text-2xl leading-[150%] text-[#e05704] shrink-0 max-w-[262px] w-full"
                    >
                        {{ level.title }}
                    </p>
                    <div>
                        <span class="font-normal text-xl leading-[150%] text-black text-center">{{
                            level.description
                        }}</span>
                    </div>
                </a>
            </div>
        </template>
    </div>
</template>
<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    }
})

function getUrl(path) {
    if (!path) {
        return false
    }
    let url = import.meta.env.VITE_S3_URL + path
    try {
        new URL(url)
        return url
    } catch (e) {
        return false
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    background: #e6eaed;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.wrapper-btn {
    border: 2px solid #e05704;
    border-radius: 16px;
    padding: 16px;
    background: #fff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    &:hover {
        background-color: #fff7ac;
    }
}

.active-btn {
    width: 64px;
    height: 64px;
    background-image: url('/icons/cabinet/start-activities/start.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 64px;
    height: 64px;

    &:hover {
        background-image: url('/icons/cabinet/start-activities/start-active.svg');
    }
}
</style>
