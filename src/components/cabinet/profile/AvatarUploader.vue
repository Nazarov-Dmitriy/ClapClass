<template>
    <div>
        <h2 class="lk__main-personal-img-title">Личные данные</h2>
        <div
            class="profile__photo-img-wrapper"
            :class="{
                'profile__photo-img-empty': !getUrl,
                'profile__photo-img-loaded': getUrl
            }"
            @click="triggerFileInput"
        >
            <img
                v-if="getUser?.avatar"
                :src="getUrl"
                alt="profile photo"
                class="profile__photo-img"
            />
            <img
                v-else
                src="/images/cabinet/profile/profile-empty.png"
                alt="empty profile photo"
                class="profile__photo-img"
            />
            <div class="profile__photo-hover">
                <p class="profile__photo-hover-text z-10">
                    {{ getUrl ? 'Сменить фото' : 'Добавить фото' }}
                </p>
                <img
                    v-if="getUrl"
                    src="/images/cabinet/profile/bucket.png"
                    alt="delete icon"
                    class="profile__photo-hover-delete"
                    @click.stop="removeImage"
                />
            </div>
            <input
                ref="fileInput"
                type="file"
                class="profile__photo-input"
                accept="image/*"
                @change="onFileChange"
            />
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed, ref } from 'vue'

const userStore = useUserStore()

const getUser = computed(() => {
    return userStore.getUser
})

const fileInput = ref(null)

function triggerFileInput() {
    fileInput.value.click()
}

function onFileChange(event) {
    const file = event.target.files[0]
    let formData = new FormData()
    if (file) {
        formData.append('email', getUser?.value?.email)
        formData.append('avatar', file)
        userStore.userAddAvatar(formData)
    }
}

function removeImage() {
    userStore.userRemoveAvatar()
}

const getUrl = computed(() => {
    return getUser.value?.avatar ? import.meta.env.VITE_S3_URL + getUser.value?.avatar : null
})

</script>
<style lang="scss" scoped>
.lk__main-personal-img-title {
    font-family: 'CenturyGothic';
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    color: $orange;
    text-align: center;
    margin-bottom: 16px;
}

.profile__photo-img-wrapper {
    width: 240px;
    height: 240px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.4s;
    background-color: $white;

    &.profile__photo-img-empty:hover {
        background-color: $white;
    }

    &.profile__photo-img-loaded {
        background-color: transparent;
    }
}

.profile__photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile__photo-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s;
}

.profile__photo-img-wrapper:hover .profile__photo-hover {
    opacity: 1;
    background: linear-gradient(rgba(230, 234, 237, 0.75), rgba(230, 234, 237, 0.75));
    z-index: 1;
}

.profile__photo-hover-text {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: $orange;
    z-index: 2;
}

.profile__photo-hover-delete {
    position: absolute;
    bottom: 24px;
}

.profile__photo-input {
    display: none;
}
</style>
