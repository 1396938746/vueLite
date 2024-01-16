<template>
    <div class="menu-edit">
        <el-form :rules="rules" ref="editMenu" :model="form" label-width="58px">
            <el-form-item prop="parent_id" label="父级">
                <el-select v-model="form.parent_id" placeholder="请选择父级菜单" style="width: 100%">
                    <el-option key="0" label="顶级菜单" :value="parent_id"></el-option>
                    <el-option v-for="item in menus" style="white-space: pre-wrap;" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="name" label="名称">
                <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item prop="alias" label="别名">
                <el-input v-model="form.alias" placeholder="请输入菜单别名"></el-input>
            </el-form-item>
			<el-form-item prop="action" label="路由">
			    <el-input v-model="form.action" placeholder="请输入后台路由"></el-input>
			</el-form-item>
            <el-form-item prop="icon" label="图标">
                <el-input v-model="form.icon" placeholder="请输入图标类名，例：el-icon-lx-home（顶级菜单必填）"></el-input>
            </el-form-item>
            <el-form-item prop="sort" label="排序">
                <el-input v-model="form.sort" type="number" placeholder="请输入数字0~100"></el-input>
            </el-form-item>
            <el-form-item prop="status" label="状态">
                <el-switch
                    class="tablescope"
                    v-model="form.status"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
					:active-value="1"
					:inactive-value="0"
                    active-text="开启"
                    inactive-text="关闭"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveEdit" :loading="loading">确定编辑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { editMenu,menuPre } from '../../api/auth/menu';
export default {
    name: 'edtiMenu',
    props: {
        menuInfo: {}
    },
    data() {
        return {
            loading: false,
            parent_id: 0,
            menus: [],
            form: {
                id: '',
                parent_id: '',
                name: '',
                alias: '',
				action: '',
                icon: '',
                sort: '',
                status: '',
                status_name: true
            },
            rules: {
                parent_id: [{ required: true, message: '请选择父级菜单', trigger: 'blur' }],
                name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                alias: [{ required: true, message: '请输入菜单别名', trigger: 'blur' }],
				action: [{ required: true, message: '请输入后台接口路由', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取菜单列表
        getData() {
			menuPre({ parent_id: 0 }).then((res) => {
			    this.menus = res.data;
				this.form.id = this.menuInfo.id;
				this.form.parent_id = this.menuInfo.parent_id;
				this.form.name = this.menuInfo.name;
				this.form.alias = this.menuInfo.alias;
				this.form.action = this.menuInfo.action;
				this.form.icon = this.menuInfo.icon;
				this.form.sort = this.menuInfo.sort;
				this.form.status = this.menuInfo.status;
			});
        },
        // 保存编辑
        saveEdit() {
            this.loading = true;
            editMenu(this.form).then((res) => {
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
.el-scrollbar__wrap{
	max-height: 450px;
}
</style>