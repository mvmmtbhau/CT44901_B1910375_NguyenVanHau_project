<template>
    <div class="pb-10">
        <h1 class="text-[#5a5c69] text-[28px] leading-[34px] font-normal text-center">
            Thêm phòng mới
        </h1>
        <Form :validation-schema="addForm" @submit="addNewRoom" autocomplete="off"
            class="mt-[22px] bg-white w-[50%] px-10 py-6 flex flex-col gap-4 items-center ml-[25%] shadow-lg border">
            <div class="flex gap-10 w-full">
                <label for="roomname" class="basis-[30%] text-end">Tên phòng:</label>
                <div class="basis-[70%]">
                    <Field type="text" name="roomname" id="roomname" v-model="roomname"
                        class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm" />
                    <ErrorMessage name="roomname" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="price" class="basis-[30%] text-end">Giá:</label>
                <div class="basis-[70%]">
                    <Field type="text" name="price" id="price" v-model="price"
                        class="bg-transparent border-2 w-full  outline-none px-2 py-1 text-sm" />
                    <ErrorMessage name="price" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="quantity" class="basis-[30%] text-end">Số lượng:</label>
                <div class="basis-[70%]">
                    <Field type="text" name="quantity" id="quantity" v-model="quantity"
                        class="bg-transparent border-2 w-full outline-none px-2 py-1 text-sm" />
                    <ErrorMessage name="quantity" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="description" class="basis-[30%] text-end">Giới thiệu:</label>
                <div class=" basis-[70%]">
                    <Field as="textarea" name="description" id="description" v-model="description"
                        class="bg-transparent h-[5rem] border-2 w-full outline-none px-2 py-1 text-sm resize-none" />
                    <ErrorMessage name="description" class="error-message" />
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="image" class="basis-[30%] text-end">Ảnh:</label>
                <div class=" basis-[70%]">
                    <Field v-model="image" name="image" type="file" class="text-xs mb-2" id="image"
                        @change="showImage($event)" />
                    <ErrorMessage name="image" class="error-message" />
                    <div id="showImage"></div>
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <label for="" class="basis-[30%] text-end"></label>
                <div class="flex gap-2 basis-[70%]">
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-700 px-2 py-1 text-white font-bold rounded-md">Thêm</button>
                    <span @click="handleExitForm()"
                        class="bg-gray-400 px-2 py-1 font-bold rounded-md hover:bg-gray-500 cursor-pointer">Hủy</span>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { ref, watch } from "vue";

import roomService from "@/services/room.service";
import { useRouter } from "vue-router";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const router = useRouter();

        const roomname = ref();
        const price = ref();
        const quantity = ref();
        const description = ref();
        const image = ref();

        const addForm = yup.object().shape({
            roomname: yup
                .string()
                .required("Xin nhập vào trường này"),
            price: yup
                .number()
                .required("Xin nhập vào trường này"),
            quantity: yup
                .number()
                .required("Xin nhập vào trường này"),
            description: yup
                .string()
                .required("Xin nhập vào trường này")
                .max(150, "Tối đa 150 ký tự"),
            image: yup
                .string()
                .required("Xin chọn ảnh")
        });

        const addNewRoom = async () => {
            try {
                const formData = new FormData();

                formData.append('roomname', roomname.value);
                formData.append('price', price.value);
                formData.append('quantity', quantity.value);
                formData.append('description', description.value);
                formData.append('image', image.value);

                const response = await roomService.addNew(formData);
                if (response.status == 201) {
                    alert(response.data.message);
                    router.push({
                        name: 'ListRoom'
                    })
                }
            } catch (err) {
                if(err.response.status == 303) {
                    alert(err.response.data.message);
                }
            }
        }

        const showImage = (e) => {
            const imgEle = document.getElementById('show_image');
            if (imgEle) imgEle.remove();

            const divWrap = document.getElementById('showImage');

            let img = document.createElement('img');
            img.id = 'show_image';
            img.className = 'h-full w-full object-cover';
            img.src = URL.createObjectURL(e.target.files[0]);

            divWrap.append(img);
        }

        const handleExitForm = () => {
            if ((roomname.value || price.value || quantity.value || description.value) && confirm('Có dữ liệu đang nhập, bạn không muốn tiếp tục?')) {

            }

            router.push({
                name: 'ListRoom',
            })
        }

        return {
            addNewRoom,
            showImage,
            handleExitForm,
            addForm,
            roomname,
            price,
            quantity,
            description,
            image,
        }
    }
}
</script>