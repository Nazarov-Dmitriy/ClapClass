<template>
    <div>
        <h2 class="lk__main-personal-img-title">
            Личные данные
        </h2>
        <div
            class="profile__photo-img-wrapper"
            :class="{
                'profile__photo-img-empty': !imageUrl,
                'profile__photo-img-loaded': imageUrl
            }"
            @click="triggerFileInput"
        >
            <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="profile photo"
                class="profile__photo-img"
            >
            <img
                v-else
                src="/images/cabinet/profile/profile-empty.png"
                alt="empty profile photo"
                class="profile__photo-img"
            >
            <div class="profile__photo-hover">
                <p class="profile__photo-hover-text">
                    {{ imageUrl ? 'Сменить фото' : 'Добавить фото' }}
                </p>
                <img
                    v-if="imageUrl"
                    src="/images/cabinet/profile/bucket.png"
                    alt="delete icon"
                    class="profile__photo-hover-delete"
                    @click.stop="removeImage"
                >
            </div>
            <input
                ref="fileInput"
                type="file"
                class="profile__photo-input"
                accept="image/*"
                @change="onFileChange"
            >
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const imageUrl = ref(null)

function triggerFileInput () {
    fileInput.value.click()
}

function onFileChange (event) {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

function removeImage () {
    imageUrl.value = null
    fileInput.value.value = null
}
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
    width: 307px;
    height: 307px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: background 0.4s;
    background-color: #f5f5f5;

    &.profile__photo-img-empty:hover {
        background-color: #ffffff;
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
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s;
}

.profile__photo-img-wrapper:hover .profile__photo-hover {
    opacity: 1;
}

.profile__photo-hover-text {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
    color: $orange;
}

.profile__photo-hover-delete {
    position: absolute;
    bottom: 24px;
}

.profile__photo-input {
    display: none;
}
</style>
