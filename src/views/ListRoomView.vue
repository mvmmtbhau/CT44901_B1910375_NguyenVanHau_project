<template>
    <div class="pt-[25px] px-[25px] bg-[#F8F9FC] h-[90%]">
        <div v-if="this.$route.path == '/rooms'">
            <div class="flex items-center justify-between">
                <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal">
                    Danh sách phòng
                </h1>
                <div id="actions" class="flex gap-1">
                    <router-link to="/rooms/add"
                        class="bg-green-500 hover:bg-green-700 h-[32px] rounded-md text-white flex gap-1 items-center justify-center px-3 cursor-pointer">
                        <font-awesome-icon :icon="['fas', 'plus']" /> Thêm mới
                    </router-link>
                    <div class="border rounded-md">
                        <select v-model="sortBy" class="px-4 bg-[#4E73DF] text-white h-full outline-none">
                            <option value="0">Ngày thêm cũ nhất</option>
                            <option value="1">Ngày thêm mới nhất</option>
                            <option value="2">Tên phòng A-Z</option>
                            <option value="3">Tên phòng Z-A</option>
                            <option value="4">Giá lớn nhất</option>
                            <option value="5">Giá nhỏ nhất</option>
                        </select>
                    </div>
                </div>
            </div>
            <form class="mt-[25px]" @submit.prevent="search()">
                <input type="text" v-model="searchText" name="search" autocomplete="off" placeholder="Search room..."
                    class="w-[16rem] py-1 outline-none border rounded-tl-md rounded-bl-md bg-white px-2 text-[14px] leading-[24px]" />
                <button class="bg-[#4E73DF] h-[35px] px-2 cursor-pointer text-white rounded-tr-md rounded-br-md">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
            </form>
            <div class="mt-[25px] h-[21rem]">
                <div class="relative overflow-x-auto border-b shadow-lg rounded-md">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr class="bg-[#4E73DF] text-white text-center">
                                <th scope="col" class="w-10 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tên phòng
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Giá (/ngày)
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Số lượng còn lại
                                </th>
                                <th scope="col" class="w-[18rem] py-3">
                                    Quản lý
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(room, index) in rooms" :key="index" class="bg-white border-b text-center">
                                <td scope="row" class="w-10 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {{ (index + 1) + (5 * (page - 1))  }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ room.roomname }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ '$' + room.price }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ room.quantity }}
                                </td>
                                <td id="actions" class="flex gap-2 justify-center items-center py-4">
                                    <span @click="fetchRoomById(room._id)"
                                        class="bg-cyan-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-cyan-700">
                                        <font-awesome-icon :icon="['fas', 'eye']" /> Xem
                                    </span>
                                    <router-link :to="{
                                        name: 'EditRoom',
                                        params: { id: room._id }
                                    }"
                                        class="bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
                                        <font-awesome-icon :icon="['fas', 'pen']" /> Chỉnh sửa
                                    </router-link>
                                    <span @click="deleteRoom(room._id, room.roomname)"
                                        class="bg-red-500 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-red-700">
                                        <font-awesome-icon :icon="['fas', 'trash']" /> Xóa
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-[25px]">
                <v-pagination v-model="page" :length="totalPage"></v-pagination>
            </div>
        </div>
        <router-view />
        <div v-if="isShowDetailModal" class="fixed z-20">
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-black/[0.6] flex items-center justify-center"
                @click="isShowDetailModal = false">
                <div class="bg-white w-[30rem] min-h-[20rem] flex flex-col rounded-[0.6rem]" @click.stop>
                    <div class="flex items-center justify-center border-b py-2 relative">
                        <span class="font-bold">Xem Chi Tiết Phòng</span>
                        <font-awesome-icon :icon="['fas', 'xmark']" class="absolute right-4 text-xl cursor-pointer"
                            @click="isShowDetailModal = false" />
                    </div>
                    <div class="flex flex-col px-10 pt-4 py-6 gap-4">
                        <div class="flex w-full">
                            <span class="basis-[40%] text-end text-sm font-semibold">Tên phòng:</span>
                            <span class="basis-[60%] pl-10 break-all text-sm">
                                {{ room.roomname }}
                            </span>
                        </div>
                        <div class="flex w-full">
                            <span class="basis-[40%] text-end text-sm font-semibold">Giá:</span>
                            <span class="basis-[60%] pl-10 break-keep text-sm">
                                {{ '$' + room.price }}
                            </span>
                        </div>
                        <div class="flex w-full">
                            <span class="basis-[40%] text-end text-sm font-semibold">Số lượng còn lại:</span>
                            <span class="basis-[60%] pl-10 break-keep text-sm">
                                {{ room.quantity }}
                            </span>
                        </div>
                        <div class="flex w-full">
                            <span class="basis-[40%] text-end text-sm font-semibold">Giới thiệu:</span>
                            <span class="basis-[60%] pl-10 break-keep text-sm">
                                {{ room.description }}
                            </span>
                        </div>
                        <div class="max-w-[20rem] max-h-[20rem] flex">
                            <img :src="publicImage + room.image" class="h-full w-full object-cover ml-10">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import roomService from "@/services/room.service";
import { watch, onBeforeMount, ref } from "vue";

import { publicImage } from "@/constants/";

export default {
    setup() {
        const rooms = ref();
        const page = ref(1);
        const per_page = 5;
        const sortBy = ref(0);
        const totalPage = ref();
        const searchText = ref('');

        const isShowDetailModal = ref(false);
        const room = ref();

        watch(page, () => {
            fetchAllRoom(page.value, per_page, sortBy, searchText.value);
        })

        watch(sortBy, () => {
            fetchAllRoom(page.value, per_page, sortBy.value, searchText.value);
        })

        const fetchAllRoom = async (page, per_page, sortBy, searchText) => {
            try {
                const response = await roomService.getAll(
                    page,
                    per_page,
                    sortBy,
                    searchText
                );

                if (response.status == 200) {
                    rooms.value = response.data.rooms;
                    totalPage.value = response.data.totalPage;
                }
            } catch (err) {
                console.log(err);
            }
        }

        const deleteRoom = async (roomId, name) => {
            try {
                if (confirm(`Bạn muốn xóa phòng ${name}?`)) {
                    const response = await roomService.deleteRoom(roomId);
                    if (response.status == 200) {
                        alert(response.data);
                        fetchAllRoom(page.value, per_page, sortBy.value, searchText.value);
                    }
                }
            } catch (err) {
                alert(err.response.data);
            }
        }

        const search = async () => {
            fetchAllRoom(page.value, per_page, sortBy, searchText.value);
        }

        const fetchRoomById = async (roomId) => {
            try {
                const response = await roomService.getById(roomId);
                if (response.status == 200) {
                    room.value = response.data[0];
                    isShowDetailModal.value = true;
                }
            } catch (err) {
                alert(err.response.data);
            }
        }

        onBeforeMount(() => {
            fetchAllRoom(page.value, per_page, sortBy.value, searchText.value);
        })

        return {
            fetchRoomById,
            deleteRoom,
            search,
            rooms,
            page,
            totalPage,
            sortBy,
            searchText,
            room,
            isShowDetailModal,
            publicImage,
        }
    }
}
</script>