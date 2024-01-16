<template>
    <div class="menu-edit">
        <el-form :rules="rules" ref="editForm" :model="form" label-width="80px">
            <el-form-item prop="mobile" label="登录名">
                <el-input v-model="form.mobile" disabled placeholder="请输入登录名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" type="password" placeholder="不改密码请留空"></el-input>
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
                <el-button type="primary" @click="saveEdit" :loading="loading">确定编辑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import * as api from '../../api/base';
export default {
    name: 'edtiMenu',
    props: {
        editInfo: {}
    },
    data() {
        return {
            loading: false,
            parent_id: 0,
            form: {
                id: '',
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
        // 获取用户详情
        getData() {
            this.form.id = this.editInfo.id;
            this.form.mobile = this.editInfo.mobile;
            this.form.nickname = this.editInfo.nickname;
            this.form.status = this.editInfo.status;
        },
        // 保存编辑
        saveEdit() {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    api.reqEdit(this.form).then((res) => {
                        this.loading = false;
                        if (res.code == 200) {
                            this.$message.success('修改成功');
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
.menu-edit .el-switch {
    margin-left: -30px;
}
</style>