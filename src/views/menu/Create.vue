<template>
    <div class="menu-create">
        <el-form :model="form" :rules="rules" ref="createMenu" label-width="58px">
            <el-form-item prop="parent_id" label="父级">
                <el-select v-model="form.parent_id" placeholder="请选择父级菜单" style="width: 100%;" >
                    <el-option key="0" label="顶级菜单" value="0"></el-option>
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
                    v-model="form.status_name"
                    active-color="#409EFF"
                    inactive-color="#dcdfe6"
                    active-text="开启"
                    inactive-text="关闭"
                ></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveCreate" :loading="loading">确定添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { createMenu,menuPre } from '../../api/auth/menu';
export default {
    name: 'createMenu',
	props: {
		pid: {
		  type: Number, // 字符串
		  default: 0
		}
	},
    data() {
        return {
            loading: false,
            menus: [],
            form: {
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
            },
			
			
			selectedValues: [], // 选中的值
			  options: [
			{
			  value: '1',
			  label: 'Option 1',
			  children: [
				{ value: '1-1', label: 'Option 1-1' },
				{ value: '1-2', label: 'Option 1-2' },
				{ value: '1-3', label: 'Option 1-3' }
			  ]
			},
			{
			  value: '2',
			  label: 'Option 2',
			  children: [
				{ value: '2-1', label: 'Option 2-1' },
				{ value: '2-2', label: 'Option 2-2' },
				{ value: '2-3', label: 'Option 2-3' }
			  ]
			}
			]
        };
    },
    created() {
		if(this.pid > 0){
			this.form.parent_id = this.pid;
		}
        this.getData();
    },
    methods: {
        // 获取菜单列表
        getData() {
            menuPre({ parent_id: 0 }).then((res) => {
                this.menus = res.data;
            });
        },
        // 保存添加
        saveCreate() {
            this.$refs.createMenu.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.form.status_name == true) {
                        this.form.status = 1;
                    } else {
                        this.form.status = 0;
                    }
					if(this.form.parent_id == ''){
						this.$message('请选择父级菜单');
					}
                    createMenu(this.form).then((res) => {
                        if (res.code == 200) {
                            this.$message.success('添加成功');
                            this.$emit('on-success', true);
                        } else {
                            this.$message.error(res.msg);
                            this.loading = false;
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
.el-scrollbar__wrap{
	max-height: 450px;
}
</style>