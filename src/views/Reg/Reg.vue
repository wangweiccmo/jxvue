<template>
    <div class="reg_bg fu jx-tc">
        <div class="reg_input">
            <CmpReg></CmpReg>
        </div>
    </div>
</template>

<script>
    import CmpReg from '../../components/CmpReg';

    export default {
        name: "login",
        components: {CmpReg},
        data() {
            return {
                form: {
                    name: '11',
                    pwd: '',
                    age:0
                }
            }
        },
        methods: {
            onSubmit() {
                this.$router.push({
                    path: '/'
                });
            }
        }
    }
</script>

<style scoped>
    .reg_bg{
        background: url("../../assets/img/login_bg.jpg") no-repeat center;
        background-size: cover;
    }
    .reg_input{
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%,0);
        width: 500px;
        height: 80%;
        display: inline-block;
    }
</style>