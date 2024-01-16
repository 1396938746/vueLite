<template>
    <div class="menu-create">
        <el-form :model="form" :rules="rules" ref="createForm" label-width="80px">
            <el-form-item prop="mobile" label="手机号">
                <el-input v-model="form.mobile" placeholder="请输入登录名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="状态">
                <el-switch
                    class="tablescope"
                    v-model="form.status"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
					:active-value="1"
					:inactive-value="0"
                    active-text="启用"
                    inactive-text="禁用"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveCreate" :loading="loading">确定添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import * as api from '../../api/base';
export default {
    name: 'createAdmin',
    data() {
        return {
            loading: false,
            menus: [],
            form: {
                mobile: '',
                nickname: '',
                password: '',
                status: 1,
            },
            rules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 保存添加
        saveCreate() {
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    api.reqCreate(this.form).then((res) => {
                        this.loading = false;
                        if (res.code == 200) {
                            this.$message.success('添加成功');
                            this.$emit('on-success', true);
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
.tablescope {
    .el-switch__label--left {
        position: relative;
        left: 55px;
        color: #fff;
        z-index: -100;
    }
    .el-switch__core {
        width: 55px !important;
    }
    .el-switch__label--right {
        position: relative;
        right: 55px;
        color: #fff;
        z-index: -100;
    }
    .el-switch__label--right.is-active {
        z-index: 100;
        color: #fff !important;
    }
    .el-switch__label--left.is-active {
        z-index: 100;
        color: #777777 !important;
    }
    .el-switch__label * {
        font-size: 12px;
    }
}
.menu-create .el-switch {
    margin-left: -30px;
}
</style>