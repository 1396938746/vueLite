<template>
    <div class="menu-edit">
        <el-form :rules="rules" ref="editAdmin" :model="form" label-width="58px">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username" disabled placeholder="请输入用户名"></el-input>
            </el-form-item>
			<el-form-item prop="role_id" label="角色组">
			    <el-select v-model="form.role_id" placeholder="请选择角色权限组" style="width: 100%;" >
			        <el-option v-for="item in roles" style="white-space: pre-wrap;" :key="item.id" :label="item.name" :value="item.id"></el-option>
			    </el-select>
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
import { editAdmin,roleGroup } from '../../api/auth/admin';
export default {
    name: 'edtiMenu',
    props: {
        menuInfo: {}
    },
    data() {
        return {
            loading: false,
            form: {
				id:'',
                username: '',
                nickname: '',
                role_id: '',
                password: '',
                status: 0,
            },
			roles:{},
            rules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
				role_id: [{ required: true, message: '请选择角色组', trigger: 'blur' }],
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
			roleGroup().then((res) => {
			    if (res.code == 200) {
					this.roles = res.data;
			    }
			});
            this.form.id = this.menuInfo.id;
            this.form.username = this.menuInfo.username;
            this.form.nickname = this.menuInfo.nickname;
            this.form.role_id = this.menuInfo.role_id;
            this.form.status = this.menuInfo.status;
        },
        // 保存编辑
        saveEdit() {
            this.loading = true;
            editAdmin(this.form).then((res) => {
                if (res.code == 200) {
                    this.$message.success('修改成功');
                    this.$emit('on-success', true);
                } else {
                    this.$message.error(res.msg);
                    this.loading = false;
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