<template>
    <div class="flex justify-center items-center h-screen bg-indigo-600">
        <form class="w-96 p-6 shadow-lg bg-white rounded-md" autocomplete="off"
            @submit.prevent="handleLogin(); isPasswordEmpty(); isUsernameEmpty()">
            <h1 class="text-3xl block text-center font-semibold">
                <font-awesome-icon :icon="['fas', 'user']" /> Login
            </h1>
            <div class="mt-2 text-center">
                <span class="text-red-500">
                    {{ errorMessage }}
                </span>
            </div>
            <hr class="mt-3">
            <div class="mt-3">
                <label for="username" class="block text-base mb-2">Username</label>
                <input v-model="username" @blur="isUsernameEmpty" name="username" type="text" id="username"
                    placeholder="Enter your username..."
                    class="border-2 focus:outline-none focus:ring-0 focus:border-gray-600 w-full text-base px-2 py-1" />
                <div class="mt-2">
                    <span class="text-red-500">
                        {{ usernameEmpty }}
                    </span>
                </div>
            </div>
            <div class="mt-3">
                <label for="password" class="block text-base mb-2">Password</label>
                <input v-model="password" @blur="isPasswordEmpty" name="password" type="password" id="password"
                    placeholder="Enter your password..."
                    class="border-2 focus:outline-none focus:ring-0 focus:border-gray-600 w-full text-base px-2 py-1" />
                <div class="mt-2">
                    <span class="text-red-500">
                        {{ passwordEmpty }}
                    </span>
                </div>
            </div>
            <div class="mt-6">
                <button type="submit" class="bg-indigo-600 w-full text-white py-2">Sign in</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, watch } from "vue";
import * as yup from "yup";
import { useRoute, useRouter } from "vue-router";

import jwt_decode from "jwt-decode";
import authService from "@/services/auth.service";
import { useStore } from "vuex";

export default {
    name: 'Login',
    setup() {
        const store = useStore();
        const router = useRouter();

        const username = ref();
        const password = ref();

        const errorMessage = ref();

        const usernameEmpty = ref();
        const passwordEmpty = ref();

        watch(username, () => {
            usernameEmpty.value = '';
            errorMessage.value = '';
        })

        watch(password, () => {
            passwordEmpty.value = '';
            errorMessage.value = '';
        })

        const isUsernameEmpty = () => {
            if (!username.value) usernameEmpty.value = 'Xin nhập username';
        }

        const isPasswordEmpty = () => {
            if (!password.value) passwordEmpty.value = 'Xin nhập password';
        }

        const handleLogin = async () => {
            try {
                const data = {
                    username: username.value,
                    password: password.value,
                }

                const response = await authService.login(data);
                if (response.status == 200) {
                    localStorage.setItem('access_token', response.data.accessToken);
                    const decodedHeader = jwt_decode(response.data.accessToken);
                    isAdmin(decodedHeader[0]._id);
                }
            } catch (err) {
                errorMessage.value = err.response.data.message;
            }
        }

        const isAdmin = async (userId) => {
            try {
                const response = await authService.getUser(userId);
                if(response.status == 200) {
                    router.push({
                        name: 'Home',
                    })
                }
            } catch (err) {
                errorMessage.value = err.response.data;
            }
        }

        // const registerAdmin = async () => {
        //     try {
        //         const data = {
        //             fullname: 'Nguyễn Văn Hậu',
        //             username: 'vanhau123',
        //             password: 'hau123',
        //         }

        //         const response = await authService.register(data);
        //         if(response.status == 201) {
        //             console.log(response.data);
        //         }

        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

        // registerAdmin();

        return {
            handleLogin,
            isUsernameEmpty,
            isPasswordEmpty,
            username,
            password,
            errorMessage,
            usernameEmpty,
            passwordEmpty,
        }
    }

}
</script>